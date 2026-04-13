import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Posts() {
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function dataFetch() {
            try {
                const response = await fetch(
                    import.meta.env.VITE_API_URL + "/posts",
                    {
                        mode: "cors",
                    },
                );
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const result = await response.json();
                setPosts(result);
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
                <h1>Posts</h1>
                <ul>
                    <li>Loading posts...</li>
                </ul>
            </article>
        );
    }

    return (
        <article>
            <h1>Posts</h1>
            {posts.map((post) => (
                <li key={post.id}>
                    <Link to={`/posts/${post.id}`}>{post.title}</Link>
                </li>
            ))}
        </article>
    );
}
