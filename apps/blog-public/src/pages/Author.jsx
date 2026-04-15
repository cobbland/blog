import { useContext } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";
import { UsersContext, PostsContext } from "../context";

export default function Author() {
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
    const { authorId } = useParams();
    const author = users?.find((user) => user.id == authorId);

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

    if (!author) {
        return (
            <article>
                <h1>Uh oh...</h1>
                <p>No such author.</p>
            </article>
        );
    }

    if (!posts) {
        return (
            <article>
                <h1>author.username</h1>
                <p>This author hasn't made any posts yet.</p>
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
