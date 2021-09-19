import React from "react";
import Users from "../users";
import { useParams, useHistory } from "react-router";
import User from "../user";

const UsersPage = () => {
    const { userId } = useParams();
    const { replace } = useHistory();

    return (
        <>{userId ? <User userId={userId} onClick={replace} /> : <Users />}</>
    );
};

export default UsersPage;
