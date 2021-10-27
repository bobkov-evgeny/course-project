import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import UserTable from "./usersTable";
import api from "../API";
import _ from "lodash";

const Users = () => {
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [searchBy, setSearchBy] = useState("");

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

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleChangePage = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleProfessionSelect = (item) => {
        setSearchBy("");
        setSelectedProf(item);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    const handleSearch = (item) => {
        setSelectedProf();
        setSearchBy(item);
    };

    const clearFilter = () => {
        setSelectedProf();
    };

    if (users) {
        const filteredUsers = selectedProf
            ? users.filter((user) => user.profession.name === selectedProf)
            : users;

        const searchedUsers = searchBy
            ? filteredUsers.filter((user) =>
                  user.name.toLowerCase().includes(searchBy.toLowerCase())
              )
            : filteredUsers;

        const count = searchedUsers.length;
        const sortedUsers = _.orderBy(
            searchedUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                            valueProperty="_id"
                            contentProperty="name"
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Сбросить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus numberOfGuests={count} />
                    <UserTable
                        users={usersCrop}
                        onDelete={handleDelete}
                        onToggleUserBookmark={handleToggleUserBookmark}
                        onSort={handleSort}
                        onSearch={handleSearch}
                        searchFieldValue={searchBy}
                        selectedSort={sortBy}
                    />
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            onPageChange={handleChangePage}
                            currentPage={currentPage}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "loading";
};

Users.propTypes = {
    users: PropTypes.array,
    onDelete: PropTypes.func,
    onToggleUserBookmark: PropTypes.func,
};

export default Users;
