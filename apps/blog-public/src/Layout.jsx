import { Outlet, Link } from "react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Nav from "./components/Nav";
import { siteData } from "./config";
import { ErrorBoundary } from "react-error-boundary";

export default function Layout() {
    return (
        <>
            <ErrorBoundary
                fallback={
                    <header>
                        <Link to="/">{siteData.siteName}</Link>
                    </header>
                }
            >
                <Header siteName={siteData.siteName} />
            </ErrorBoundary>
            <Nav pages={siteData.pages} />
            <ErrorBoundary
                fallback={
                    <article className="error">
                        <h1>Uh oh...</h1>
                        <p>Something went wrong.</p>
                    </article>
                }
            >
                <main>
                    <Outlet />
                </main>
            </ErrorBoundary>
            <Footer copyright={siteData.copyright} />
        </>
    );
}
