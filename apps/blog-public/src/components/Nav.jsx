import { NavLink } from "react-router";

export default function Nav({ pages }) {
    return (
        <nav className="nav-top">
            <ul>
                {pages.map((page) => (
                    <li key={page.title}>
                        <NavLink
                            to={page.link}
                            className={({ isActive }) =>
                                isActive ? "active" : ""
                            }
                        >
                            {page.title}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
