import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ numberOfGuests }) => {
    if (numberOfGuests !== 0) {
        return (
            <span className="badge bg-primary mb-3">
                <h3>
                    {numberOfGuests} человек
                    {numberOfGuests === 2 ||
                    numberOfGuests === 3 ||
                    numberOfGuests === 4
                        ? "a"
                        : ""}{" "}
                    тусан
                    {numberOfGuests === 1 ? "ет" : "ут"} с тобой сегодня
                </h3>
            </span>
        );
    }

    return (
        <span className="badge bg-danger mb-3">
            <h3>Никто не пойдет тусить с тобой :(</h3>
        </span>
    );
};

SearchStatus.propTypes = {
    numberOfGuests: PropTypes.number.isRequired,
};

export default SearchStatus;
