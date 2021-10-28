import React, { useEffect, useState } from "react";
import Qualitie from "../../ui/qualities/qualitie";
import api from "../../../API";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    if (!user) return <>Loading...</>;
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-5 offset-2 shadow p-5">
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <div className="w-100 d-flex justify-content-center mb-4">
                            <h1>{user.name}</h1>
                        </div>
                        <h3>Качества: </h3>
                        {user.qualities.map((quality) => (
                            <Qualitie key={quality.name} quality={quality} />
                        ))}
                        <h3>Профессия:</h3> {user.profession.name}
                        <h3>Встретился, раз:</h3> {user.completedMeetings}
                        <h3>Оценка:</h3> {user.rate}
                        <div className="w-100 mt-4 mb-2 d-flex justify-content-center">
                            <Link
                                className="btn mt-4 w-25 btn-primary"
                                to={`/users`}
                            >
                                Назад
                            </Link>
                            <Link
                                className="btn mt-4 w-25 ms-4 btn-success"
                                to={`/users/${userId}/edit`}
                            >
                                Изменить
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired,
};

export default UserPage;

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
