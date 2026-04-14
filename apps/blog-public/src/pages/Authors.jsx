import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Authors() {
    const [authors, setAuthors] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function dataFetch() {
            try {
                const response = await fetch(
                    import.meta.env.VITE_API_URL + "/users",
                    {
                        mode: "cors",
                    },
                );
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const result = await response.json();
                setAuthors(result);
            } catch (err) {
                console.error(err.message);
            } finally {
                setLoading(false);
            }
        }
        dataFetch();
    }, []);

    if (loading) {
        return (
            <article className="loading">
                <h1>⠀</h1>
                <ul>
                    <li>⠀</li>
                </ul>
            </article>
        );
    }

    return (
        <article>
            <h1>Authors</h1>
            <ul>
                {authors
                    .filter((user) => user.author == true)
                    .map((author) => (
                        <li key={author.id}>
                            <Link to={`/authors/${author.id}`}>
                                {author.username}
                            </Link>
                        </li>
                    ))}
            </ul>
        </article>
    );
}
