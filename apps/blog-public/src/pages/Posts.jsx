import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Posts() {
    const [posts, setPosts] = useState(null);
    const [users, setUsers] = useState(null);
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
                const responseUsers = await fetch(
                    import.meta.env.VITE_API_URL + "/users",
                    {
                        mode: "cors",
                    },
                );
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                if (!responseUsers.ok) {
                    throw new Error(`Response status: ${responseUsers.status}`);
                }
                const result = await response.json();
                const resultUsers = await responseUsers.json();
                setPosts(result);
                setUsers(resultUsers);
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
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <Link to={`/posts/${post.id}`}>{post.title}</Link>
                        <span className="info">
                            by{" "}
                            <Link
                                to={
                                    "/authors/" +
                                    users.filter(
                                        (user) => user.id == post.authorId,
                                    )[0].id
                                }
                            >
                                {
                                    users.filter(
                                        (user) => user.id == post.authorId,
                                    )[0].username
                                }
                            </Link>{" "}
                            on {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                    </li>
                ))}
            </ul>
        </article>
    );
}
