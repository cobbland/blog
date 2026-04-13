import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Author() {
    const [author, setAuthor] = useState(null);
    const [loading, setLoading] = useState(true);
    const { authorId } = useParams();
    // Also fetch and display posts by author
    useEffect(() => {
        async function dataFetch() {
            try {
                const response = await fetch(
                    import.meta.env.VITE_API_URL + "/users/" + authorId,
                    {
                        mode: "cors",
                    },
                );
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const result = await response.json();
                setAuthor(result);
            } catch (err) {
                console.error(err.message);
            } finally {
                setLoading(false);
            }
        }
        dataFetch();
    }, [authorId]);

    if (loading) {
        return (
            <article className="loading">
                <h1>Loading...</h1>
                <div>
                    <p>Loading...</p>
                </div>
            </article>
        );
    }

    return (
        <article>
            <h1>{author.name}</h1>
            <ul></ul>
        </article>
    );
}
