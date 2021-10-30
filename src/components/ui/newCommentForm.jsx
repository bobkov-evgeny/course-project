import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SelectField from "../common/form/selectField";
import TextArea from "../common/form/textArea";
import * as yup from "yup";

const NewCommentForm = ({ currentUserId, usersList, onAddComment }) => {
    const [data, setData] = useState({
        userId: {},
        content: "",
        pageId: currentUserId,
    });

    const [errors, setErrors] = useState({});
    const [isValid] = useState(Object.keys(errors).length === 0);

    const validateScheme = yup.object().shape({
        content: yup.string().required("Заполните поле ввода"),
        userId: yup.object().required("Выберите пользователя"),
    });

    const validate = () => {
        validateScheme
            .validate(data)
            .then(() => setErrors({}))
            .catch((err) => setErrors({ [err.path]: err.message }));
    };

    useEffect(() => {
        validate();
    }, [data]);

    const handleChange = (value) => {
        setData((prevState) => {
            return { ...prevState, [value.name]: value.value };
        });
    };

    const handleAddComment = async () => {
        validate();
        if (isValid && data.content) {
            onAddComment({
                ...data,
                userId: data.userId._id || currentUserId,
            });
        }
    };

    return (
        <div>
            <h2>New Comment</h2>
            <SelectField
                name="userId"
                label="Выберите пользователя"
                options={usersList}
                onChange={handleChange}
                defaultOption="Выберите пользователя"
                error={errors.userId}
                value={data.userId}
            />
            <TextArea
                label={"Сообщение"}
                name={"content"}
                numberOfRows={3}
                error={errors.content}
                onChange={handleChange}
            />
            <div className="d-flex w-100 justify-content-end mt-3">
                <button className="btn btn-primary" onClick={handleAddComment}>
                    Опубликовать
                </button>
            </div>
        </div>
    );
};

NewCommentForm.propTypes = {
    usersList: PropTypes.array,
    onAddComment: PropTypes.func,
    currentUserId: PropTypes.string,
};

export default NewCommentForm;
