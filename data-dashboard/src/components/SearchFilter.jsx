function SearchFilter({ search, setSearch, gradeFilter, setGradeFilter, grades, statusFilter, setStatusFilter }) {
  const statuses = ["All", "Alive", "Dead", "Unknown"];

  return (
    <div className="search-filter-wrapper">
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-input"
        />
        <select
          value={gradeFilter}
          onChange={e => setGradeFilter(e.target.value)}
          className="grade-select"
        >
          {grades.map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>

      <div className="radio-filter">
        <span className="radio-label">Status:</span>
        {statuses.map(s => (
          <label key={s} className="radio-option">
            <input
              type="radio"
              name="status"
              value={s}
              checked={statusFilter === s}
              onChange={() => setStatusFilter(s)}
            />
            {s}
          </label>
        ))}
      </div>
    </div>
  );
}

export default SearchFilter;