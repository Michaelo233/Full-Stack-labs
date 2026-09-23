import { NavLink } from "react-router-dom";
import './Navigation.css';

function Nav () {
    return (

        <nav className="navigation">
            <h1>
            <NavLink to="/employee">Employees</NavLink>
            {' | '}
            <NavLink to="/organization">Organization</NavLink>
            </h1>
        </nav>
    );
}

export default Nav;