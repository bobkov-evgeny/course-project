import React from "react";
import PropTypes from "prop-types";
import {
    BOOKMARKED_ICON_URL,
    NOT_BOOKMARKED_ICON_URL,
} from "../../utils/bookmarks-icons";

const Bookmark = ({ bookmarked, onClick }) => {
    return (
        <>
            <button onClick={onClick} className="btn btn-danger">
                {bookmarked ? BOOKMARKED_ICON_URL : NOT_BOOKMARKED_ICON_URL}
            </button>
        </>
    );
};

Bookmark.propTypes = {
    bookmarked: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
};

export default Bookmark;
