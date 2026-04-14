import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import Comments from "../components/Comments";

export default function Posts() {
    const [post, setPost] = useState(null);
    const [author, setAuthor] = useState(null);
    const [comments, setComments] = useState(null);
    const [loading, setLoading] = useState(true);
    const { postId } = useParams();

    useEffect(() => {
        async function dataFetch() {
            try {
                const response = await fetch(
                    import.meta.env.VITE_API_URL + "/posts/" + postId,
                    {
                        mode: "cors",
                    },
                );
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const result = await response.json();
                const responseAuthor = await fetch(
                    import.meta.env.VITE_API_URL + "/users/" + result.authorId,
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
                const responseComments = await fetch(
                    import.meta.env.VITE_API_URL +
                        "/posts/" +
                        postId +
                        "/comments",
                    {
                        mode: "cors",
                    },
                );
                if (!responseComments.ok) {
                    throw new Error(
                        `Response status: ${responseComments.status}`,
                    );
                }
                const resultComments = await responseComments.json();
                setPost(result);
                setAuthor(resultAuthor);
                setComments(resultComments);
            } catch (err) {
                console.error(err.message);
            } finally {
                setLoading(false);
            }
        }
        dataFetch();
    }, [postId]);

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
        <>
            <article>
                <h1>{post.title}</h1>
                <span className="info">
                    By{" "}
                    <Link to={"/authors/" + author.id}>{author.username}</Link>{" "}
                    on {new Date(post.createdAt).toLocaleDateString()}
                </span>
                <div>{post.content}</div>
            </article>
            {comments && <Comments comments={comments} postId={postId} />}
        </>
    );
}
