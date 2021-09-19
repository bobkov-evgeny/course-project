import React, { useState, useEffect } from "react";
import Qualitie from "./qualitie";
import api from "../API";
import PropTypes from "prop-types";

const User = ({ userId, onClick }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    if (!user) return <>Loading...</>;
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginLeft: 30,
            }}
        >
            <h1>{user.name}</h1>
            <h3>Качества: </h3>
            {user.qualities.map((quality) => (
                <Qualitie key={quality.name} quality={quality} />
            ))}
            <h3>Профессия:</h3> {user.profession.name}
            <h3>Встретился, раз:</h3> {user.completedMeetings}
            <h3>Оценка:</h3> {user.rate}
            <button
                className="mt-4 btn-primary"
                onClick={() => onClick("/users")}
            >
                Все пользователи
            </button>
        </div>
    );
};

User.propTypes = {
    userId: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default User;

// const User = ({ user, onDelete, onToggleUserBookmark }) => {
//     return (
//         <>
//             <tr key={user._id}>
//                 <th scope="row">{user.name}</th>
//                 <td>
//                     {user.qualities.map((quality) => (
//                         <Qualitie key={quality.name} quality={quality} />
//                     ))}
//                 </td>
//                 <td>{user.profession.name}</td>
//                 <td>{user.completedMeetings}</td>
//                 <td>{user.rate}/5</td>
//                 <td>
//                     <Bookmark
//                         key={user._id}
//                         bookmarked={user.bookmark}
//                         onClick={() => onToggleUserBookmark(user._id)}
//                     />
//                 </td>
//                 <td>
//                     <button
//                         onClick={() => onDelete(user._id)}
//                         className="btn btn-danger"
//                     >
//                         Удалить
//                     </button>
//                 </td>
//             </tr>
//         </>
//     );
// };
