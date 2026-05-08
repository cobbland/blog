import { Link, NavLink, Outlet } from "react-router";
import { siteData, Footer } from "@blog/shared";
import Nav from "./components/Nav";

export default function Layout() {
    return (
        <>
            <header>
                <Link to="/">{siteData.siteName} Admin</Link>
            </header>
            <Nav pages={siteData.adminPages} />
            <main>
                <Outlet />
            </main>
            <Footer copyright={siteData.copyright} />
        </>
    );
}
