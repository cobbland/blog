import { Outlet } from "react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Nav from "./components/Nav";
import { siteData, content } from "./config";

export default function Layout() {
    return (
        <>
            <Header siteName={siteData.siteName} />
            <Nav pages={siteData.pages} />
            <main>
                <Outlet context={content} />
            </main>
            <Footer copyright={siteData.copyright} />
        </>
    );
}
