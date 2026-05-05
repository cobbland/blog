import { Link } from "react-router";
export default function Home() {
    return (
        <article>
            <h1>Blog Admin</h1>
            <p>This is the blog admin site.</p>
            <p>
                See the temp <Link to="/Post">Post Page</Link>.
            </p>
        </article>
    );
}
