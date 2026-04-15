import { useContext } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";
import { UsersContext, PostsContext } from "../context";

export default function Author() {
    const { data: posts, loading: postsLoading } = useContext(PostsContext);
    const { data: users, loading: usersLoading } = useContext(UsersContext);
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
