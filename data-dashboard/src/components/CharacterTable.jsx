function CharacterTable({ characters }) {
  return (
    <div className="table-wrapper">
      <table className="char-table">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Grade</th>
            <th>Status</th>
            <th>Species</th>
            <th>Domain Expansion</th>
            <th>Cursed Techniques</th>
          </tr>
        </thead>
        <tbody>
          {characters.map(c => (
            <tr key={c.id}>
              <td>
                <img
                  src={c.image}
                  alt={c.name}
                  className="char-img"
                  onError={e => { e.target.style.display = "none"; }}
                />
              </td>
              <td className="char-name">
                {c.name}
                {c.alias?.length > 0 && (
                  <span className="alias"> "{c.alias[0]}"</span>
                )}
              </td>
              <td>
                <span className={`grade-badge grade-${c.grade?.id}`}>
                  {c.grade?.name ?? "Unknown"}
                </span>
              </td>
              <td className={c.status?.name === "Deceased" ? "deceased" : ""}>
                {c.status?.name ?? "—"}
              </td>
              <td>{c.species?.species_name ?? "—"}</td>
              <td className="domain">
                {c.domainExpansion ? `🌀 ${c.domainExpansion.name}` : "—"}
              </td>
              <td>
                {c.cursedTechniques?.length > 0
                  ? c.cursedTechniques.map(t => t.name).join(", ")
                  : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {characters.length === 0 && (
        <p className="no-results">No cursed spirits found.</p>
      )}
    </div>
  );
}

export default CharacterTable;