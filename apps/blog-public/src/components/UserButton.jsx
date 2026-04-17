import { useContext } from "react";
import { AuthContext } from "../context";
import { Link, useNavigate } from "react-router";

export default function UserButton() {
    const {
        auth: { data, loading },
        setAuth,
    } = useContext(AuthContext);
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            const response = await fetch(
                import.meta.env.VITE_API_URL + "/auth/logout",
                {
                    method: "POST",
                    credentials: "include",
                },
            );
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            setAuth({ loading: false, data: [] });
            navigate("/");
        } catch (err) {
            console.error(err.message);
            setAuth({ loading: false, error: err });
        }
    }

    if (loading) {
        return <p>⠀</p>;
    }

    if (data?.username) {
        return (
            <Link to={"/"} onClick={handleLogout}>
                Logout
            </Link>
        );
    }

    return <Link to={"/login"}>login</Link>;
}
