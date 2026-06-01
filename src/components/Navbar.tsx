import { Link } from 'react-router-dom';
import { PlaneTakeoff } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <PlaneTakeoff className="logo-icon" />
          <span>AeroClaim</span>
        </Link>
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/compare" className="nav-link">Compare Rights</Link>
          <Link to="/claim" className="nav-button">Check Eligibility</Link>
        </div>
      </div>
    </nav>
  );
}
