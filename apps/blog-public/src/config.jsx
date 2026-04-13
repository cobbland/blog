const siteData = {
    siteName: "Blog",
    copyright: {
        name: "CC BY-SA 4.0",
        link: "https://creativecommons.org/licenses/by-sa/4.0/",
    },
    pages: [
        { title: "home", link: "/" },
        { title: "posts", link: "/posts" },
        { title: "authors", link: "/authors" },
    ],
};

const content = (
    <>
        <h1>Article Title</h1>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
            deserunt voluptas suscipit ullam ut a ea obcaecati aliquid sunt,
            ipsam expedita iste nemo dolor eos doloribus ducimus pariatur harum
            at!
        </p>
    </>
);

export { siteData, content };
