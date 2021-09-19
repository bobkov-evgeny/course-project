import React from "react";
import PropTypes from "prop-types";
import Bookmark from "./bookmark";
import QualitiesList from "./qualitiesList";
import Table from "./table";
import { Link } from "react-router-dom";

const UserTable = ({
    users,
    onDelete,
    onToggleUserBookmark,
    selectedSort,
    onSort,
}) => {
    const column = {
        name: {
            path: "name",
            name: "Имя",
            component: (user) => (
                <Link to={`/users/${user._id}`}>{user.name}</Link>
            ),
        },
        qualities: {
            name: "Качества",
            component: (user) => <QualitiesList qualities={user.qualities} />,
        },
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
        <Table
            column={column}
            onSort={onSort}
            selectedSort={selectedSort}
            data={users}
        />
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
