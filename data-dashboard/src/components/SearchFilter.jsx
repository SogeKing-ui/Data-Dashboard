function SearchFilter({ search, setSearch, gradeFilter, setGradeFilter, grades }) {
  return (
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
  );
}

export default SearchFilter;