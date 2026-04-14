import { siteData } from "../config";

export default function Home() {
    return (
        <article>
            <h1>{siteData.siteName}</h1>
            <p>Welcome to {siteData.siteName}!</p>
        </article>
    );
}
