import Markdown from "react-markdown";

export default function AuthorInfo({ author }) {
    return (
        <div className="author-info">
            {author.name && <p>{author.name}</p>}
            {author.bio && <Markdown>{author.bio}</Markdown>}
        </div>
    );
}
