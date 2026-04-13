import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import StatCard from "./components/StatCard";
import CharacterTable from "./components/CharacterTable";
import SearchFilter from "./components/SearchFilter";
import CharacterDetail from "./components/CharacterDetail";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import "./App.css";

const BASE_URL = "https://api.jujutsukaisenapi.site/api/v1";
const PIE_COLORS = ["#00f5d4", "#ef233c", "#8338ec", "#ffbe0b"];

function Dashboard({ characters, loading, error, search, setSearch, gradeFilter, setGradeFilter, grades, statusFilter, setStatusFilter }) {
  const totalChars = characters.length;
  const specialGrades = characters.filter(c => c.grade?.name === "Special Grade").length;
  const withDomain = characters.filter(c => c.domainExpansion !== null).length;
  const aliveCount = characters.filter(c => c.status?.name === "Alive").length;

  const filtered = characters
    .filter(c => gradeFilter === "All" || c.grade?.name === gradeFilter)
    .filter(c => statusFilter === "All" || c.status?.name === statusFilter)
    .filter(c => c.name?.toLowerCase().includes(search.toLowerCase()));

  const gradeData = Object.entries(
    characters.reduce((acc, c) => {
      const g = c.grade?.name ?? "Unknown";
      acc[g] = (acc[g] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, count]) => ({ name, count }));

  const statusData = Object.entries(
    characters.reduce((acc, c) => {
      const s = c.status?.name ?? "Unknown";
      acc[s] = (acc[s] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  return (
    <>
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

          <div className="charts-grid">
            <div className="chart-card">
              <h3>Characters by Grade</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={gradeData}>
                  <XAxis dataKey="name" tick={{ fill: "#ccc", fontSize: 11 }} />
                  <YAxis tick={{ fill: "#ccc" }} />
                  <Tooltip contentStyle={{ backgroundColor: "#1a1a2e", border: "1px solid #00f5d4" }} />
                  <Bar dataKey="count" fill="#00f5d4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card">
              <h3>Status Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                    {statusData.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend wrapperStyle={{ color: "#ccc" }} />
                  <Tooltip contentStyle={{ backgroundColor: "#1a1a2e", border: "1px solid #00f5d4" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
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
    </>
  );
}

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

  const grades = ["All", ...new Set(characters.map(c => c.grade?.name).filter(Boolean))];

  return (
    <div className="app">
      <Header />
      <div className="app-body">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <Dashboard
                characters={characters}
                loading={loading}
                error={error}
                search={search}
                setSearch={setSearch}
                gradeFilter={gradeFilter}
                setGradeFilter={setGradeFilter}
                grades={grades}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
              />
            } />
            <Route path="/character/:id" element={<CharacterDetail />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
