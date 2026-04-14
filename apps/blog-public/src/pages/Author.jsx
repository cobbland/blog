import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";

export default function Author() {
    const [author, setAuthor] = useState(null);
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);
    const { authorId } = useParams();

    useEffect(() => {
        async function dataFetch() {
            try {
                const responseAuthor = await fetch(
                    import.meta.env.VITE_API_URL + "/users/" + authorId,
                    {
                        mode: "cors",
                    },
                );
                const responsePosts = await fetch(
                    import.meta.env.VITE_API_URL +
                        "/users/" +
                        authorId +
                        "/posts",
                    {
                        mode: "cors",
                    },
                );
                if (!responseAuthor.ok) {
                    throw new Error(
                        `Response status: ${responseAuthor.status}`,
                    );
                }
                if (!responsePosts.ok) {
                    throw new Error(`Response status: ${responsePosts.status}`);
                }
                const resultAuthor = await responseAuthor.json();
                const resultPosts = await responsePosts.json();
                setAuthor(resultAuthor);
                setPosts(resultPosts);
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
                <h1>⠀</h1>
                <div>
                    <p>⠀</p>
                </div>
            </article>
        );
    }

    return (
        <article>
            <h1>{author.username}</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <Link to={`/posts/${post.id}`}>{post.title}</Link>
                        <span className="info">
                            {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                    </li>
                ))}
            </ul>
        </article>
    );
}
