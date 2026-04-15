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
    const [posts, setPosts] = useState({
        loading: true,
        data: [],
        error: null,
    });
    const [users, setUsers] = useState({
        loading: true,
        data: [],
        error: null,
    });

    useEffect(() => {
        async function dataFetch() {
            try {
                const [responsePosts, responseUsers] = await Promise.all([
                    fetch(import.meta.env.VITE_API_URL + "/posts"),
                    fetch(import.meta.env.VITE_API_URL + "/users"),
                ]);
                if (!responsePosts.ok) {
                    throw new Error(`Response status: ${responsePosts.status}`);
                }
                if (!responseUsers.ok) {
                    throw new Error(`Response status: ${responseUsers.status}`);
                }
                const [resultPosts, resultUsers] = await Promise.all([
                    responsePosts.json(),
                    responseUsers.json(),
                ]);
                setPosts({ loading: false, data: resultPosts });
                setUsers({ loading: false, data: resultUsers });
            } catch (err) {
                console.error(err.message);
                setPosts({ loading: false, error: err });
                setUsers({ loading: false, error: err });
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
