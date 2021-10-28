import React from "react";
import PropTypes from "prop-types";
import Bookmark from "../common/bookmark";
import Qualities from "./qualities";
import Table from "../common/table";
import { Link } from "react-router-dom";

const UserTable = ({
    users,
    onDelete,
    onToggleUserBookmark,
    selectedSort,
    onSort,
    onSearch,
    searchFieldValue,
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
            component: (user) => <Qualities qualities={user.qualities} />,
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
            onSearch={onSearch}
            searchFieldValue={searchFieldValue}
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
    onSearch: PropTypes.func.isRequired,
    searchFieldValue: PropTypes.string,
    selectedSort: PropTypes.object.isRequired,
};

export default UserTable;
