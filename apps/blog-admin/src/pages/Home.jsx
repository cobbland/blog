import { Link } from "react-router";
import { siteData, AuthContext } from "@blog/shared";
import { useContext } from "react";

export default function Home() {
    const {
        auth: { loading, data },
    } = useContext(AuthContext);

    if (loading || !data || !data?.name || !data?.username) {
        return (
            <article>
                <h1>{siteData.siteName} Admin</h1>
                <p>Welcome to {siteData.siteName}'s admin site!</p>
            </article>
        );
    }

    return (
        <article>
            <h1>{siteData.siteName} Admin</h1>
            <p>
                Welcome to {siteData.siteName} admin site,{" "}
                {data?.name || data.username}!
            </p>
        </article>
    );
}
