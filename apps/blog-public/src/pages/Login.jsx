import { useState, useContext } from "react";
import { AuthContext } from "../context";
import { Link } from "react-router";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {
        auth: { loading, data: authData },
        setAuth,
    } = useContext(AuthContext);

    const formUrl = import.meta.env.VITE_API_URL + "/auth/login";

    function handleUsernameChange(e) {
        setUsername(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    async function handleFormSubmit(formData) {
        try {
            const response = await fetch(formUrl, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: formData.get("username"),
                    password: formData.get("password"),
                }),
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const result = response.json();
            setAuth({ loading: false, data: result });
        } catch (err) {
            console.error(err.message);
            setAuth({ loading: false, error: err });
        }
    }

    if (!loading && authData?.name) {
        return (
            <article>
                <h1>Login</h1>
                <p>
                    You're already logged in,{" "}
                    {authData?.name || authData.username}.{" "}
                    <Link to={"/logout"}>Logout?</Link>
                </p>
            </article>
        );
    }

    return (
        <article>
            <h1>Login</h1>
            <form action={handleFormSubmit}>
                <label>
                    Username:{" "}
                    <input
                        type="text"
                        name="username"
                        autoComplete="username"
                        required
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </label>
                <label htmlFor="password">
                    Password:{" "}
                    <input
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </label>
                <input type="submit" value="Login" />
            </form>
            <p>
                Don't have an account?{" "}
                <Link to={"/signup"}>Sign up for one!</Link>
            </p>
        </article>
    );
}
