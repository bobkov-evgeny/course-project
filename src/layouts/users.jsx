import React from "react";
import { useParams } from "react-router";
import UserPage from "../components/page/userPage/userPage";
import UsersListPage from "../components/page/usersListPage";
import UserEditForm from "../components/ui/userEditForm";

const Users = () => {
    const { userId } = useParams();
    const { edit } = useParams();

    return (
        <>
            {userId
? (
                edit
? (
                    <UserEditForm userId={userId} />
                )
: (
                    <UserPage userId={userId} />
                )
            )
: (
                <UsersListPage />
            )}
        </>
    );
};

export default Users;
