import { useState, useEffect } from "react";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import CharacterTable from "./components/CharacterTable";
import SearchFilter from "./components/SearchFilter";
import "./App.css";

const BASE_URL = "https://api.jujutsukaisenapi.site/api/v1";

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/characters?per_page=100&page=1`);
        const json = await res.json();
        const chars = Array.isArray(json) ? json : json.data ?? json;
        setCharacters(chars);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch data.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Stats
  const totalChars = characters.length;
  const specialGrades = characters.filter(c => c.grade?.name === "Special Grade").length;
  const withDomain = characters.filter(c => c.domainExpansion !== null).length;
  const aliveCount = characters.filter(c => c.status?.name === "Alive").length;

  // Unique grades for filter dropdown
  const grades = ["All", ...new Set(characters.map(c => c.grade?.name).filter(Boolean))];

  // Filter + search
  const filtered = characters
    .filter(c => gradeFilter === "All" || c.grade?.name === gradeFilter)
    .filter(c => statusFilter === "All" || c.status?.name === statusFilter)
    .filter(c => c.name?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="app">
      <Header />
      {loading && <p className="loading">Awakening cursed energy...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <>
          <div className="stat-grid">
            <StatCard label="Total Characters" value={totalChars} icon="👥" />
            <StatCard label="Special Grades" value={specialGrades} icon="💀" />
            <StatCard label="Domain Expansions" value={withDomain} icon="🌀" />
            <StatCard label="Still Alive" value={aliveCount} icon="❤️" />
          </div>
          <SearchFilter
            search={search}
            setSearch={setSearch}
            gradeFilter={gradeFilter}
            setGradeFilter={setGradeFilter}
            grades={grades}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
          <CharacterTable characters={filtered} />
        </>
      )}
    </div>
  );
}

export default App;
