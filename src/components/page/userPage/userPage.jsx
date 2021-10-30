import React, { useEffect, useState } from "react";
import api from "../../../API";
import PropTypes from "prop-types";
import Qualitie from "../../ui/qualities/qualitie";
import { Link } from "react-router-dom";
import caretUpIMG from "../../../images/caret-up-fill.svg";
import caretDownIMG from "../../../images/caret-down-fill.svg";
import gearIMG from "../../../images/gear.svg";
import CommentsListComponent from "./commentsListComponent";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    const [users, setUsers] = useState([]);
    useEffect(() => {
        api.users.getById(userId).then((data) => {
            setUser(data);
        });
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    if (!user) return <>Loading...</>;
    return (
        <div className="container">
            <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                    <div className="card mb-3">
                        <div className="card-body">
                            <Link
                                className="position-absolute top-0 end-0 btn btn-light btn-sm "
                                to={`/users/${userId}/edit`}
                            >
                                <img src={gearIMG} alt="#" />
                            </Link>

                            <div className="d-flex flex-column align-items-center text-center position-relative">
                                <img
                                    src={`https://avatars.dicebear.com/api/avataaars/${(
                                        Math.random() + 1
                                    )
                                        .toString(36)
                                        .substring(7)}.svg`}
                                    className="rounded-circle shadow-1-strong"
                                    alt="avatar"
                                    width="150"
                                    height="150"
                                />
                                <div className="mt-3">
                                    <h4>{user.name}</h4>
                                    <p className="text-secondary mb-1">
                                        {user.profession.name}
                                    </p>
                                    <div className="text-muted">
                                        <img
                                            src={caretUpIMG}
                                            role="button"
                                            alt="#"
                                        />
                                        <img
                                            src={caretDownIMG}
                                            role="button"
                                            alt="#"
                                        />
                                        <span className="ms-2">
                                            {user.rate}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card-body d-flex flex-column justify-content-center text-center">
                            <h5 className="card-title">
                                <span>Качества</span>
                            </h5>
                            <p className="card-text">
                                {user.qualities.map((quality) => (
                                    <Qualitie
                                        key={quality.name}
                                        quality={quality}
                                    />
                                ))}
                            </p>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card-body d-flex flex-column justify-content-center text-center">
                            <h5 className="card-title">
                                <span>Completed meetings</span>
                            </h5>

                            <h1 className="display-1">
                                {user.completedMeetings}
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <CommentsListComponent
                        userId={userId}
                        usersList={users}
                        // users.map((user) => ({
                        //                             name: user.name,
                        //                             value: user._id,
                        //                         }))
                    />
                </div>
            </div>
        </div>
        // <div className="container mt-5">
        //     <div className="row">
        //         <div className="col-md-5 offset-2 shadow p-5">
        //             <div
        //                 style={{
        //                     display: "flex",
        //                     flexDirection: "column",
        //                     alignItems: "flex-start",
        //                 }}
        //             >
        //                 <div className="w-100 d-flex justify-content-center mb-4">
        //                     <h1>{user.name}</h1>
        //                 </div>
        //                 <h3>Качества: </h3>
        //                 {user.qualities.map((quality) => (
        //                     <Qualitie key={quality.name} quality={quality} />
        //                 ))}
        //                 <h3>Профессия:</h3> {user.profession.name}
        //                 <h3>Встретился, раз:</h3> {user.completedMeetings}
        //                 <h3>Оценка:</h3> {user.rate}
        //                 <div className="w-100 mt-4 mb-2 d-flex justify-content-center">
        //                     <Link
        //                         className="btn mt-4 w-25 btn-primary"
        //                         to={`/users`}
        //                     >
        //                         Назад
        //                     </Link>
        //                     <Link
        //                         className="btn mt-4 w-25 ms-4 btn-success"
        //                         to={`/users/${userId}/edit`}
        //                     >
        //                         Изменить
        //                     </Link>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
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
