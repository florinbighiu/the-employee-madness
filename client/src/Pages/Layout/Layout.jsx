import { Outlet, NavLink } from "react-router-dom";

import "./Layout.css";

const navClass = ({ isActive }) =>
  isActive ? "nav-link active" : "nav-link";

const Layout = () => (
  <div className="Layout">
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="brand" end>
          <span className="brand-mark">EM</span>
          <span className="brand-text">Employee Madness</span>
        </NavLink>

        <nav className="nav-links">
          <NavLink to="/" className={navClass} end>
            Employees
          </NavLink>
          <NavLink to="/equipment" className={navClass}>
            Equipment
          </NavLink>
          <NavLink to="/missing" className={navClass}>
            Missing
          </NavLink>
          <NavLink to="/create" className="btn btn-sm nav-cta">
            + New Employee
          </NavLink>
        </nav>
      </div>
    </header>

    <main className="page">
      <Outlet />
    </main>
  </div>
);

export default Layout;
