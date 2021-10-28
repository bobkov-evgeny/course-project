import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({
    options,
    onChange,
    name,
    label,
    defaultValues = [],
}) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                  label: options[optionName].name,
                  value: options[optionName]._id,
              }))
            : options;

    const defaultArray = Object.keys(defaultValues).map((optionName) => ({
        label: defaultValues[optionName].name,
        value: defaultValues[optionName]._id,
    }));

    const handleChange = (value) => {
        const result = value.map((item) => ({
            _id: item.value,
            name: item.label,
            color: Object.values(options)
                .filter((option) => option._id === item.value)
                .flatMap((item) => item.color)[0],
        }));

        onChange({ name: name, value: result });
    };

    return (
        <div className="mb-4">
            <label htmlFor="validationCustom04" className="form-label">
                {label}
            </label>
            <Select
                className="basic-multi-select"
                classNamePrefix="select"
                closeMenuOnSelect={false}
                isMulti
                name={name}
                options={optionsArray}
                onChange={handleChange}
                value={defaultArray}
            />
        </div>
    );
};

MultiSelectField.propTypes = {
    onChange: PropTypes.func,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    name: PropTypes.string,
    label: PropTypes.string,
    defaultValues: PropTypes.array,
};

export default MultiSelectField;
