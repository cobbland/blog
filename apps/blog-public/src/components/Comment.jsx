import { useContext } from "react";
import { Link } from "react-router";
import { UsersContext } from "../context";

export default function Comment({ comment }) {
    const { data: users, loading } = useContext(UsersContext);
    const author = users?.find((user) => user.id == comment.authorId);

    if (loading) return <span className="loading">⠀</span>;

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
