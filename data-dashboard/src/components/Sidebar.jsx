import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();

  const scrollToTable = () => {
    document.querySelector('.table-wrapper')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">⚡ CED</div>
      <nav className="sidebar-nav">
        <Link to="/" className={`sidebar-link ${location.pathname === '/' ? 'active' : ''}`}>
          🏠 Dashboard
        </Link>
        <button onClick={scrollToTable} className="sidebar-link sidebar-btn">
          📊 Characters
        </button>
      </nav>
      <div className="sidebar-footer">
        <p>呪術廻戦</p>
        <p>Jehu Emilcar</p>
      </div>
    </aside>
  );
}

export default Sidebar;
