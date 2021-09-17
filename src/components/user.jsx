import React from "react";
import Qualitie from "./qualitie";
import Bookmark from "./bookmark";
import PropTypes from "prop-types";

const User = ({ user, onDelete, onToggleUserBookmark }) => {
    return (
        <>
            <tr key={user._id}>
                <th scope="row">{user.name}</th>
                <td>
                    {user.qualities.map((quality) => (
                        <Qualitie key={quality.name} quality={quality} />
                    ))}
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}/5</td>
                <td>
                    <Bookmark
                        key={user._id}
                        bookmarked={user.bookmark}
                        onClick={() => onToggleUserBookmark(user._id)}
                    />
                </td>
                <td>
                    <button
                        onClick={() => onDelete(user._id)}
                        className="btn btn-danger"
                    >
                        Удалить
                    </button>
                </td>
            </tr>
        </>
    );
};

User.propTypes = {
    user: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleUserBookmark: PropTypes.func.isRequired,
};

export default User;
