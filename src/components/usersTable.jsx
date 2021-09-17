import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import Bookmark from "./bookmark";

const UserTable = ({
    users,
    onDelete,
    onToggleUserBookmark,
    selectedSort,
    onSort,
}) => {
    const column = {
        name: { path: "name", name: "Имя" },
        qualities: { name: "Качества" },
        professions: { path: "profession.name", name: "Профессия" },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз",
        },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <Bookmark
                    bookmarked={user.bookmark}
                    onClick={() => onToggleUserBookmark(user._id)}
                />
            ),
        },
        delete: {
            component: (user) => (
                <button
                    onClick={() => onDelete(user._id)}
                    className="btn btn-danger"
                >
                    Удалить
                </button>
            ),
        },
    };

    return (
        <table className="table">
            <TableHeader
                columns={column}
                onSort={onSort}
                selectedSort={selectedSort}
            />
            <TableBody columns={column} data={users} />
        </table>
    );
};

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleUserBookmark: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
};

export default UserTable;
