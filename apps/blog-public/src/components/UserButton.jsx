import { useContext } from "react";
import { AuthContext } from "../context";
import { Link, NavLink } from "react-router";

export default function UserButton() {
    const {
        auth: { data, loading },
    } = useContext(AuthContext);

    if (loading) {
        return <p>⠀</p>;
    }

    if (data?.username && data?.admin) {
        return <Link to={"/authors/" + data.id}>{data.username}</Link>;
    }

    return <NavLink to={"/login"}>login</NavLink>;
}
