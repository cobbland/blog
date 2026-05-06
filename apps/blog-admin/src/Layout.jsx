import { Link, NavLink, Outlet } from "react-router";
import { siteData } from "@blog/shared/data/config";

export default function Layout() {
    return (
        <>
            <header>
                <Link to="/">{siteData.siteName} Admin</Link>
            </header>
            <nav className="nav-top">
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/posts">Posts</NavLink>
                    </li>
                    <li>
                        <NavLink to="/comments">Comments</NavLink>
                    </li>
                    <ul className="login-out">
                        <li>
                            <NavLink to="/login">Login</NavLink>
                        </li>
                    </ul>
                </ul>
            </nav>
            <main>
                <article>
                    <Outlet />
                </article>
            </main>
            <footer></footer>
        </>
    );
}
