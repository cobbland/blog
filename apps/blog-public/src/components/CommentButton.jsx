import { Link } from "react-router";

export default function CommentButton({ postId }) {
    return (
        <Link className="button" to={"/login?post=" + postId}>
            Login to comment
        </Link>
    );
}
