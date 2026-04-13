import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Authors from "./pages/Authors";
import Layout from "./Layout";

export default function App() {
    // call blog-api and save data to variable(s)
    // pass said variable(s) as props to the components below
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/authors" element={<Authors />} />
            </Route>
        </Routes>
    );
}
