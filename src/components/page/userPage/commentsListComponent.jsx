import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../API";
import Comment from "./comment";
import NewCommentForm from "../../ui/newCommentForm";

const CommentsListComponent = ({ usersList, userId }) => {
    const [commentsData, setCommentsData] = useState({});

    const updateData = () => {
        api.comments
            .fetchCommentsForUser(userId)
            .then((response) =>
                setCommentsData(
                    response.sort((a, b) => b.created_at - a.created_at)
                )
            )
            .catch((err) => console.log(err));
    };

    const handleAddComment = (data) => {
        api.comments
            .add(data)
            .then(() => {
                updateData();
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        updateData();
    }, []);

    const handleDelete = (id) => {
        api.comments
            .remove(id)
            .then(() => updateData())
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <div className="card mb-2">
                <div className="card-body ">
                    <NewCommentForm
                        usersList={usersList}
                        currentUserId={userId}
                        onAddComment={handleAddComment}
                    />
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>Comments</h2>
                    <hr />
                    {commentsData &&
                        Object.values(commentsData).map((comment) => (
                            <Comment
                                key={comment._id}
                                data={comment}
                                onDelete={handleDelete}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

CommentsListComponent.propTypes = {
    userId: PropTypes.string,
    usersList: PropTypes.array,
};

export default CommentsListComponent;
