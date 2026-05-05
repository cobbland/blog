export default function login() {
    return (
        <article>
            <h1>Login</h1>
            <form action="">
                <label htmlFor="username">
                    Username:{" "}
                    <input type="text" name="username" id="username" />
                </label>
                <label htmlFor="password">
                    Password:{" "}
                    <input type="password" name="password" id="password" />
                </label>
                <input type="submit" value="login" />
            </form>
            <div></div>
        </article>
    );
}
