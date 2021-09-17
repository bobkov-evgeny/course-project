import React, { useState, useEffect } from "react";
import api from "./API";
import Users from "./components/users";

function App() {
    const [users, setUsers] = useState();
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleDelete = (userId) => {
        const newUsers = users.filter((user) => user._id !== userId);
        setUsers(newUsers);
    };

    const handleToggleUserBookmark = (userId) => {
        const newUsers = users.map((user) => {
            if (user._id === userId) {
                return !user.bookmark || user.bookmark === false
                    ? { ...user, bookmark: true }
                    : { ...user, bookmark: false };
            }
            return user;
        });
        setUsers(newUsers);
    };

    return (
        <>
            {users && (
                <Users
                    onDelete={handleDelete}
                    users={users}
                    onToggleUserBookmark={handleToggleUserBookmark}
                />
            )}
        </>
    );
}

export default App;
