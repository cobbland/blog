import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Comment({ comment }) {
    const [author, setAuthor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function dataFetch() {
            try {
                const responseAuthor = await fetch(
                    import.meta.env.VITE_API_URL + "/users/" + comment.authorId,
                    {
                        mode: "cors",
                    },
                );
                if (!responseAuthor.ok) {
                    throw new Error(
                        `Response status: ${responseAuthor.status}`,
                    );
                }
                const resultAuthor = await responseAuthor.json();
                setAuthor(resultAuthor);
            } catch (err) {
                console.error(err.message);
            } finally {
                setLoading(false);
            }
        }
        dataFetch();
    }, [comment.authorId]);

    if (loading) return <div className="comment loading">⠀</div>;

    return (
        <>
            <span className="info">
                By{" "}
                {author.author ? (
                    <Link to={"/authors/" + author.id}>{author.username}</Link>
                ) : (
                    author.username
                )}{" "}
                on {new Date(comment.createdAt).toLocaleDateString()}
            </span>
            {comment.content}
        </>
    );
}
