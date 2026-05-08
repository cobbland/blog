export async function userAuth(setAuth) {
    try {
        const response = await fetch(import.meta.env.VITE_API_URL + "/auth", {
            credentials: "include",
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        setAuth({ loading: false, data: result });
    } catch (err) {
        console.log(err);
        setAuth({ loading: false, error: err });
    }
}
