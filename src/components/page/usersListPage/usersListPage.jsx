import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UserTable from "../../ui/usersTable";
import api from "../../../API";
import _ from "lodash";

const UsersListPage = () => {
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
        const filteredUsers = searchBy
            ? users.filter((user) =>
                  user.name.toLowerCase().includes(searchBy.toLowerCase())
              )
            : selectedProf
            ? users.filter((user) => user.profession.name === selectedProf)
            : users;

        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
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
                            ????????????????
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus numberOfGuests={count} />
                    <input
                        className="w-100 mb-2"
                        style={{ height: "40px", padding: "10px" }}
                        type="text"
                        placeholder="Search..."
                        value={searchBy}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    <UserTable
                        users={usersCrop}
                        onDelete={handleDelete}
                        onToggleUserBookmark={handleToggleUserBookmark}
                        onSort={handleSort}
                        onSearch={handleSearch}
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

UsersListPage.propTypes = {
    users: PropTypes.array,
    onDelete: PropTypes.func,
    onToggleUserBookmark: PropTypes.func,
};

export default UsersListPage;
