import React from "react";
import PropTypes from "prop-types";

const TextArea = ({ label, name, error, numberOfRows, onChange }) => {
    const handleChange = ({ target }) => {
        onChange({ name: [target.name], value: target.value });
    };

    const getInputClasses = () =>
        "form-control w-100 " + (error ? "is-invalid" : "");

    return (
        <div className="input-group has-validation d-flex flex-column">
            <label className="form-label" htmlFor={name}>
                {label}
            </label>

            <textarea
                className={getInputClasses()}
                id={name}
                name={name}
                rows={numberOfRows}
                onChange={handleChange}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

TextArea.propTypes = {
    label: PropTypes.string,
    numberOfRows: PropTypes.number,
    name: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func,
};

export default TextArea;
