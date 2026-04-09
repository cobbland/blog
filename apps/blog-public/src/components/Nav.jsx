export default function Nav({ pages }) {
    return (
        <nav className="nav-top">
            <ul>
                {pages.map((page) => (
                    <li>
                        <a href={page.link}>{page.title}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
