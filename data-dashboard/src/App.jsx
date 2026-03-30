import { useState, useEffect } from "react";
import Header from "./components/Header";
import "./App.css";

const BASE_URL = "https://api.jujutsukaisenapi.site/api/v1";

// Grade ID → label mapping
const GRADE_MAP = {
  1: "Special Grade",
  2: "Grade 1",
  3: "Semi-Grade 1",
  4: "Grade 2",
  5: "Grade 3",
  6: "Grade 4",
  7: "Ungraded",
};

// Status ID → label
const STATUS_MAP = {
  1: "Alive",
  2: "Deceased",
  3: "Unknown",
};

async function fetchAllCharacters() {
  // First fetch to get total page count
  const firstRes = await fetch(`${BASE_URL}/characters?per_page=100&page=1`);
  const firstJson = await firstRes.json();
  console.log("Last page:", firstJson.last_page, "Total:", firstJson.total);
  const lastPage = firstJson.last_page;

  let allChars = [...firstJson.data];

  // Fetch remaining pages in parallel
  const remainingFetches = [];
  for (let page = 2; page <= lastPage; page++) {
    remainingFetches.push(
      fetch(`${BASE_URL}/characters?per_page=100&page=${page}`).then(r => r.json())
    );
  }

  const remainingResults = await Promise.all(remainingFetches);
  remainingResults.forEach(json => {
    allChars = [...allChars, ...json.data];
  });

  return allChars;
}

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chars = await fetchAllCharacters();
        console.log("TOTAL CHARACTERS:", chars.length);
        console.log("SAMPLE:", chars[0]);
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

  return (
    <div>
      <Header />
      {loading && <p>Loading cursed data...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <p>✅ Fetched {characters.length} characters</p>
      )}
    </div>
  );
}

export default App;
