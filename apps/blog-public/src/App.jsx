import Article from "./components/Article";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Nav from "./components/Nav";

export default function App() {
    // call blog-api and save data to variable(s)
    // pass said variable(s) as props to the components below
    const siteName = false;
    const pages = [
        { title: "home", link: "/" },
        { title: "posts", link: "/posts" },
        { title: "authors", link: "/authors" },
    ];
    const content = (
        <>
            <h1>Article Title</h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
                deserunt voluptas suscipit ullam ut a ea obcaecati aliquid sunt,
                ipsam expedita iste nemo dolor eos doloribus ducimus pariatur
                harum at!
            </p>
        </>
    );
    const copyWrite = {
        name: "CC BY-SA 4.0",
        link: "https://creativecommons.org/licenses/by-sa/4.0/",
    };
    return (
        <>
            <Header siteName={siteName ? siteName : "Blog"} />
            <Nav pages={pages} />
            <Article content={content} />
            <Footer copyWrite={copyWrite} />
        </>
    );
}
