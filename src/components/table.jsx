import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import PropTypes from "prop-types";

const Table = ({ data, column, onSort, selectedSort, children }) => {
    return (
        <table className="table">
            {children || (
                <>
                    <TableHeader
                        columns={column}
                        onSort={onSort}
                        selectedSort={selectedSort}
                    />
                    <TableBody columns={column} data={data} />
                </>
            )}
        </table>
    );
};

Table.propTypes = {
    onSort: PropTypes.func,
    selectedSort: PropTypes.object,
    column: PropTypes.object,
    data: PropTypes.array,
    children: PropTypes.array,
};
export default Table;
