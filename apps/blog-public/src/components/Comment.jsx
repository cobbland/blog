import { useContext } from "react";
import { Link } from "react-router";
import { UsersContext } from "../context";

export default function Comment({ comment }) {
    const users = useContext(UsersContext);
    const author = users.filter((user) => user.id == comment.authorId)[0];

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
