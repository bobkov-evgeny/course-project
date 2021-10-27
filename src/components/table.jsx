import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import PropTypes from "prop-types";

const Table = ({
    data,
    column,
    onSort,
    onSearch,
    searchFieldValue,
    selectedSort,
    children,
}) => {
    const handleSearch = (item) => {
        onSearch(item);
    };
    return (
        <div className="m-2">
            <input
                className="w-100 mb-2"
                type="text"
                placeholder="Search..."
                value={searchFieldValue}
                onChange={(e) => handleSearch(e.target.value)}
            />
            <table className="table">
                {children || (
                    <>
                        <TableHeader
                            columns={column}
                            onSort={onSort}
                            onSearch={onSearch}
                            selectedSort={selectedSort}
                        />
                        <TableBody columns={column} data={data} />
                    </>
                )}
            </table>
        </div>
    );
};

Table.propTypes = {
    onSort: PropTypes.func,
    onSearch: PropTypes.func,
    selectedSort: PropTypes.object,
    searchFieldValue: PropTypes.string,
    column: PropTypes.object,
    data: PropTypes.array,
    children: PropTypes.array,
};
export default Table;
