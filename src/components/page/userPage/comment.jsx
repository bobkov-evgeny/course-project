import React, { useEffect, useState } from "react";
import api from "../../../API";
import PropTypes from "prop-types";
import closeBtnIMG from "../../../images/x-lg.svg";

const Comment = ({ data, onDelete }) => {
    const [user, setUser] = useState({});
    useEffect(() => {
        api.users.getById(data.userId).then((res) => setUser(res));
    }, []);

    const getDate = (ms) => {
        const minutesPassed = Math.round((Date.now() - ms) / 1000 / 60);
        const date = new Date(+ms);

        switch (true) {
            case minutesPassed < 5: {
                return ` 1 минуту назад`;
            }
            case minutesPassed < 10: {
                return ` 5 минут назад`;
            }
            case minutesPassed < 30: {
                return ` 10 минут назад`;
            }
            case minutesPassed < 60: {
                return ` 30 минут назад`;
            }
            case minutesPassed < 1440: {
                const hours = Math.floor(minutesPassed / 60);
                const minutes = minutesPassed - hours * 60;
                return ` ${hours} часов ${minutes} минут назад`;
            }
            case minutesPassed < 518400: {
                return ` ${String(date.getDate()).padStart(2, "0")}.${String(
                    date.getMonth() + 1
                ).padStart(2, "0")}`;
            }
            case minutesPassed > 518400: {
                return ` ${String(date.getDate()).padStart(2, "0")}.${String(
                    date.getMonth() + 1
                ).padStart(2, "0")}.${date.getFullYear()}`;
            }
            default: {
                return ` *Дата не загрузилась*`;
            }
        }
    };

    return (
        <div className="bg-light card-body  mb-3">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start ">
                        <img
                            src={`https://avatars.dicebear.com/api/avataaars/${(
                                Math.random() + 1
                            )
                                .toString(36)
                                .substring(7)}.svg`}
                            className="rounded-circle shadow-1-strong me-3"
                            alt="avatar"
                            width="65"
                            height="65"
                        />
                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1 ">
                                        {user.name}
                                        <span className="small">
                                            {getDate(data.created_at)}
                                        </span>
                                    </p>
                                    <button className="btn btn-sm text-primary d-flex align-items-center">
                                        <img
                                            src={closeBtnIMG}
                                            role="button"
                                            alt=""
                                            onClick={() => onDelete(data._id)}
                                        />
                                    </button>
                                </div>
                                <p className="small mb-0">{data.content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Comment.propTypes = {
    data: PropTypes.object,
    onDelete: PropTypes.func,
};

export default Comment;
