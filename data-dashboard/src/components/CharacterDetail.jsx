import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const BASE_URL = "https://api.jujutsukaisenapi.site/api/v1";

function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const res = await fetch(`${BASE_URL}/characters/${id}`);
        const data = await res.json();
        setCharacter(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load character.");
        setLoading(false);
      }
    };
    fetchCharacter();
  }, [id]);

  if (loading) return <p className="loading">Awakening cursed energy...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!character) return null;

  return (
    <div className="detail-page">
      <Link to="/" className="back-btn">← Back to Dashboard</Link>
      <div className="detail-card">
        <div className="detail-header">
          <img
            src={character.image}
            alt={character.name}
            className="detail-img"
            onError={e => { e.target.style.display = "none"; }}
          />
          <div className="detail-info">
            <h1>{character.name}</h1>
            {character.alias?.length > 0 && (
              <p className="detail-alias">"{character.alias.join('", "')}"</p>
            )}
            <span className={`grade-badge grade-${character.grade?.id}`}>
              {character.grade?.name ?? "Unknown Grade"}
            </span>
          </div>
        </div>

        <div className="detail-stats">
          <div className="detail-stat">
            <span className="stat-label">Status</span>
            <span className={character.status?.name === "Deceased" ? "deceased" : ""}>
              {character.status?.name ?? "—"}
            </span>
          </div>
          <div className="detail-stat">
            <span className="stat-label">Species</span>
            <span>{character.species?.species_name ?? "—"}</span>
          </div>
          <div className="detail-stat">
            <span className="stat-label">Affiliation</span>
            <span>{character.affiliation ?? "—"}</span>
          </div>
          <div className="detail-stat">
            <span className="stat-label">Domain Expansion</span>
            <span>{character.domainExpansion ? `🌀 ${character.domainExpansion.name}` : "—"}</span>
          </div>
        </div>

        {character.cursedTechniques?.length > 0 && (
          <div className="detail-section">
            <h3>Cursed Techniques</h3>
            <ul>
              {character.cursedTechniques.map(t => (
                <li key={t.id}>{t.technique_name}</li>
              ))}
            </ul>
          </div>
        )}

        {character.description && (
          <div className="detail-section">
            <h3>About</h3>
            <p>{character.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CharacterDetail;