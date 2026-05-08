import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Post from "./pages/Post";
import Authors from "./pages/Authors";
import Author from "./pages/Author";
import Layout from "./Layout";
import { useState, useEffect } from "react";
import { PostsContext, UsersContext } from "./context";
import SignUp from "./pages/SignUp";
import { userAuth, AuthContext, Login, dataFetch } from "@blog/shared";

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
    const [auth, setAuth] = useState({
        loading: true,
        data: [],
        error: null,
    });

    useEffect(() => {
        dataFetch(setPosts, setUsers);
    }, []);

    useEffect(() => {
        userAuth(setAuth);
    }, []);

    return (
        <AuthContext value={{ auth, setAuth }}>
            <PostsContext value={posts}>
                <UsersContext value={users}>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Home />} />
                            <Route path="/posts" element={<Posts />} />
                            <Route path="/posts/:postId" element={<Post />} />
                            <Route path="/authors" element={<Authors />} />
                            <Route
                                path="/authors/:authorId"
                                element={<Author />}
                            />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<SignUp />} />
                        </Route>
                    </Routes>
                </UsersContext>
            </PostsContext>
        </AuthContext>
    );
}
