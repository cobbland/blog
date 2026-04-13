import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Post from "./pages/Post";
import Authors from "./pages/Authors";
import Author from "./pages/Author";
import Layout from "./Layout";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/posts/:postId" element={<Post />} />
                <Route path="/authors" element={<Authors />} />
                <Route path="/authors/:authorId" element={<Author />} />
            </Route>
        </Routes>
    );
}
