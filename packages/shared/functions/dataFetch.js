export async function dataFetch(setPosts, setUsers) {
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
