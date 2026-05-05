import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Layout from "./Layout";
import Post from "./pages/Post";
import Posts from "./pages/Posts";
import Comments from "./pages/Comments";
import Login from "./pages/Login";
function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/post" element={<Post />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/comments" element={<Comments />} />
                <Route path="/login" element={<Login />} />
            </Route>
        </Routes>
    );
}

export default App;
