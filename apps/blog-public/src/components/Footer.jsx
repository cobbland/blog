export default function Footer({ copyWrite }) {
    return (
        <footer>
            <a href="#top">TOP</a>
            {copyWrite && (
                <>
                    {" "}
                    | <a href={copyWrite.link}>{copyWrite.name}</a>
                </>
            )}
        </footer>
    );
}
