import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import api from "../../API";
import * as yup from "yup";
import { Link, useHistory } from "react-router-dom";

const UserEditForm = ({ userId }) => {
    const history = useHistory();
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "male",
        qualities: [],
    });

    const [qualities, setQualities] = useState({});
    const [professions, setProfession] = useState();
    const [errors, setErrors] = useState({});

    const isValid = Object.keys(errors).length === 0;

    const handleChange = (value) => {
        console.log(value);
        setData((prevState) => ({ ...prevState, [value.name]: value.value }));
    };

    useEffect(() => {
        api.users.getById(userId).then((data) => {
            setData(data);
        });
    }, []);

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);

    const validateScheme = yup.object().shape({
        name: yup.string().required("Имя обязательно для заполнения"),
        email: yup
            .string()
            .required("Электронная почта обязательна для заполнения")
            .email("E-mail введен не корректно"),
    });

    const validate = () => {
        validateScheme
            .validate(data)
            .then(() => setErrors({}))
            .catch((err) => setErrors({ [err.path]: err.message }));
        return Object.keys(errors).length === 0;
    };

    useEffect(() => {
        validate();
    }, [data]);

    const handleSubmit = (e) => {
        const isValid = validate();
        if (!isValid) return;
        api.users
            .update(userId, data)
            .then(() => history.push(`/users/${userId}`))
            .catch((err) => console.log(err));
    };

    return (
        <div className="ms-5 mt-5 pt-3">
            <div className="row">
                <div className="col-md-4">
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Имя"
                            name="name"
                            value={data.name}
                            error={errors.name}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Электронная почта"
                            type="text"
                            name="email"
                            value={data.email}
                            error={errors.email}
                            onChange={handleChange}
                        />
                        <SelectField
                            label="Выберите Вашу профессию"
                            defaultOption="Актер"
                            options={professions}
                            onChange={handleChange}
                            error={errors.profession}
                            value={data.profession.name}
                        />
                        <RadioField
                            options={[
                                { name: "Male", value: "male" },
                                { name: "Female", value: "female" },
                                { name: "Other", value: "other" },
                            ]}
                            onChange={handleChange}
                            error={errors.profession}
                            value={data.sex}
                            name="sex"
                            label="Выберите Ваш пол"
                        />
                        <MultiSelectField
                            options={qualities}
                            onChange={handleChange}
                            name="qualities"
                            label="Выберите Ваши качества"
                            defaultValues={data.qualities}
                        />
                        <Link to={`/users/${userId}`}>
                            <button
                                className="btn btn-danger w-100 mx-auto mb-2"
                                type="button"
                            >
                                Cancel
                            </button>
                        </Link>
                        <button
                            className="btn btn-primary w-100 mx-auto"
                            type="submit"
                            disabled={!isValid}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

UserEditForm.propTypes = {
    userId: PropTypes.string,
};

export default UserEditForm;
