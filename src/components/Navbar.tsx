import { NavLink } from 'react-router-dom';
import { routerPaths } from '../app/routerPaths.ts';
import { useAuth } from '../hooks/useAuth.ts';

const navItems = [
  {
    name: 'Home',
    href: routerPaths.home
  },
  {
    name: 'Map',
    href: routerPaths.map
  }
];

const Navbar = () => {
  const { logout } = useAuth();

  return <nav className="navbar navbar-expand bg-light">
    <div className="container-fluid">
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav">
          {navItems.map(item => <li key={item.name} className="nav-item">
            <NavLink to={item.href} className="nav-link">
              {item.name}
            </NavLink>
          </li>)}
        </ul>

        <button className="ms-auto btn btn-light" onClick={() => logout()}>Logout</button>
      </div>
    </div>
  </nav>;
};

export default Navbar;
