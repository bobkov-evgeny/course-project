import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import PropTypes from "prop-types";

const Table = ({ data, column, onSort, onSearch, selectedSort, children }) => {
    return (
        <div className="m-2">
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
    column: PropTypes.object,
    data: PropTypes.array,
    children: PropTypes.array,
};
export default Table;
