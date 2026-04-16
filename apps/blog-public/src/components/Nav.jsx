import { NavLink } from "react-router";
import UserButton from "./UserButton";

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
                <ul className="login-out">
                    <li>
                        <UserButton />
                    </li>
                </ul>
            </ul>
        </nav>
    );
}
