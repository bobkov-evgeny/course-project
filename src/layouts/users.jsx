import React from "react";
import { useHistory, useParams } from "react-router";
import UserPage from "../components/page/usersPage/userPage";
import UsersListPage from "../components/page/usersListPage/usersListPage";

const Users = () => {
    const { userId } = useParams();
    const { replace } = useHistory();

    return (
        <>
            {userId
? (
                <UserPage userId={userId} onClick={replace} />
            )
: (
                <UsersListPage />
            )}
        </>
    );
};

export default Users;
