import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router";
import Comments from "../components/Comments";
import Markdown from "react-markdown";
import { PostsContext, UsersContext } from "../context";

export default function Posts() {
    const [comments, setComments] = useState({
        loading: true,
        data: [],
        error: null,
    });
    const {
        data: posts,
        loading: postsLoading,
        error: postsError,
    } = useContext(PostsContext);
    const {
        data: users,
        loading: usersLoading,
        error: usersError,
    } = useContext(UsersContext);
    const { postId } = useParams();
    const post = posts?.find((post) => post.id == postId);
    const author = users?.find((user) => user.id == post?.authorId);

    async function fetchComments() {
        try {
            const response = await fetch(
                import.meta.env.VITE_API_URL + "/posts/" + postId + "/comments",
            );
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const result = await response.json();
            setComments({ loading: false, data: result });
        } catch (err) {
            console.error(err.message);
            setComments({ loading: false, error: err });
        }
    }

    useEffect(() => {
        fetchComments();
    });

    if (postsLoading || usersLoading) {
        return (
            <article className="loading">
                <h1>⠀</h1>
                <div>
                    <p>⠀</p>
                </div>
            </article>
        );
    }

    if (postsError || usersError) {
        return (
            <article className="error">
                <h1>Uh oh...</h1>
                <p>Error: {postsError.message || usersError.message}</p>
            </article>
        );
    }

    if (!post || !author) {
        return (
            <article>
                <h1>Uh oh...</h1>
                <p>No such post.</p>
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
                <div>
                    <Markdown>{post.content}</Markdown>
                </div>
            </article>
            {comments.data && !comments.loading ? (
                <Comments
                    comments={comments.data}
                    fetchComments={fetchComments}
                    postId={postId}
                />
            ) : (
                ""
            )}
        </>
    );
}
