import { Link } from "react-router";

export default function CommentButton() {
    return (
        <Link className="button" to="/login">
            Login to comment
        </Link>
    );
}
