import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Post from "./pages/Post";
import Authors from "./pages/Authors";
import Author from "./pages/Author";
import Layout from "./Layout";
import { useState, useEffect } from "react";
import { PostsContext, UsersContext } from "./context";

export default function App() {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([loading]);
    const [users, setUsers] = useState([loading]);

    useEffect(() => {
        async function dataFetch() {
            try {
                const responsePosts = await fetch(
                    import.meta.env.VITE_API_URL + "/posts",
                    {
                        mode: "cors",
                    },
                );
                const responseUsers = await fetch(
                    import.meta.env.VITE_API_URL + "/users",
                    {
                        mode: "cors",
                    },
                );
                if (!responsePosts.ok) {
                    throw new Error(`Response status: ${responsePosts.status}`);
                }
                if (!responseUsers.ok) {
                    throw new Error(`Response status: ${responseUsers.status}`);
                }
                const result = await responsePosts.json();
                const resultUsers = await responseUsers.json();
                setPosts([loading].concat(result));
                setUsers([loading].concat(resultUsers));
            } catch (err) {
                console.error(err.message);
            } finally {
                setLoading(false);
            }
        }
        dataFetch();
    }, []);

    return (
        <PostsContext value={posts}>
            <UsersContext value={users}>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="/posts" element={<Posts />} />
                        <Route path="/posts/:postId" element={<Post />} />
                        <Route path="/authors" element={<Authors />} />
                        <Route path="/authors/:authorId" element={<Author />} />
                    </Route>
                </Routes>
            </UsersContext>
        </PostsContext>
    );
}
