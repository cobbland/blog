import { Link } from "react-router";

export default function Header({ siteName }) {
    return (
        <header>
            <Link to="/">{siteName}</Link>
        </header>
    );
}
