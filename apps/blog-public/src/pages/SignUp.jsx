import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router";
import { AuthContext, UsersContext } from "../context";

export default function SignUp() {
    const { data: users } = useContext(UsersContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPass, setRepeatPass] = useState("");
    const [name, setName] = useState("");
    const [formError, setFormError] = useState(null);
    const {
        auth: { loading, data: authData },
    } = useContext(AuthContext);
    const navigate = useNavigate();
    const formUrl = import.meta.env.VITE_API_URL + "/users";

    function handleUsernameChange(e) {
        setUsername(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleRepeatPassChange(e) {
        setRepeatPass(e.target.value);
    }

    function handleNameChange(e) {
        setName(e.target.value);
    }

    async function handleFormSubmit() {
        if (password !== repeatPass) {
            setFormError({
                errors: ["passwords must match"],
            });
            setPassword("");
            setRepeatPass("");
            return;
        }
        if (users?.find((user) => username == user.username)) {
            setFormError({
                errors: ["username must be unique"],
            });
            setPassword("");
            setRepeatPass("");
            return;
        }
        try {
            const response = await fetch(formUrl, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    name: name || null,
                }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                setFormError({
                    errors: [
                        "Username must be unique and password must be at least eight characters long with one of each of the following: uppercase letter, lowercase letter, number, symbol.",
                    ],
                });
                console.log(errorData);
                throw new Error(`Response status: ${response.status}`);
            }
            navigate("/");
        } catch (err) {
            console.error(err);
            setPassword("");
            setRepeatPass("");
        }
    }

    if (!loading && authData?.username) {
        return (
            <article>
                <h1>Signup</h1>
                <p>
                    You already have an account,{" "}
                    {authData?.name || authData.username}.
                </p>
            </article>
        );
    }

    return (
        <article>
            <h1>Signup</h1>
            {formError && <p className="error">{formError.errors}</p>}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleFormSubmit();
                }}
            >
                <label htmlFor="username">
                    Username:{" "}
                    <input
                        type="text"
                        name="username"
                        id="username"
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
                        id="password"
                        autoComplete="new-password"
                        required
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </label>
                <label htmlFor="repeatPass">
                    Retype Password:{" "}
                    <input
                        type="password"
                        name="repeatPass"
                        id="repeatPass"
                        autoComplete="new-password"
                        required
                        value={repeatPass}
                        onChange={handleRepeatPassChange}
                    />
                </label>
                <label htmlFor="name">
                    Name:{" "}
                    <input
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="name"
                        value={name}
                        onChange={handleNameChange}
                    />
                </label>
                <input type="submit" value="signup" />
            </form>
            <p>
                Already have an account?{" "}
                <Link to={"/login"}>Login instead!</Link>
            </p>
        </article>
    );
}
