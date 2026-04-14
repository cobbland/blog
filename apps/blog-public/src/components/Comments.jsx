import Comment from "./Comment";
import CommentButton from "./CommentButton";

export default function Comments({ comments }) {
    return (
        <details className="comments">
            <summary>Comments</summary>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id} className="comment">
                        <Comment comment={comment} />
                    </li>
                ))}
            </ul>
            <CommentButton />
        </details>
    );
}
