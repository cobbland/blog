export async function fetchComments(baseUrl, postId, setComments) {
    try {
        const response = await fetch(
            baseUrl + "/posts/" + postId + "/comments",
        );
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        setComments({ loading: false, data: result });
    } catch (err) {
        console.error(err.message);
        setComments({ loading: false, error: err });
    }
}
