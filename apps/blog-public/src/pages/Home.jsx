import { useContext } from "react";
import { siteData } from "../config";
import { AuthContext } from "../context";

export default function Home() {
    const {
        auth: { loading, data },
    } = useContext(AuthContext);

    if (loading || !data || !data?.name || !data?.username) {
        return (
            <article>
                <h1>{siteData.siteName}</h1>
                <p>Welcome to {siteData.siteName}!</p>
            </article>
        );
    }

    return (
        <article>
            <h1>{siteData.siteName}</h1>
            <p>
                Welcome to {siteData.siteName}, {data?.name || data.username}!
            </p>
        </article>
    );
}
