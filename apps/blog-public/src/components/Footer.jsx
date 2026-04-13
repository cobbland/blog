export default function Footer({ copyright }) {
    return (
        <footer>
            <a href="#top">TOP</a>
            {copyright && (
                <>
                    {" "}
                    | <a href={copyright.link}>{copyright.name}</a>
                </>
            )}
        </footer>
    );
}
