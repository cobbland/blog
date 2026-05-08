import { useContext } from "react";
import { AuthContext, siteData } from "@blog/shared";

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
