import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
    items,
    valueProperty,
    contentProperty,
    onItemSelect,
    selectedItem,
}) => {
    return (
        <ul className="list-group">
            {(typeof items === "object" ? Object.values(items) : items).map(
                (item) => (
                    <li
                        key={item[valueProperty]}
                        className={
                            "list-group-item" +
                            (item[contentProperty] === selectedItem
                                ? " active"
                                : "")
                        }
                        onClick={() => onItemSelect(item[contentProperty])}
                        role="button"
                    >
                        {item[contentProperty]}
                    </li>
                )
            )}
        </ul>
    );
};

GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name",
};

GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func.isRequired,
    selectedItem: PropTypes.string,
};

export default GroupList;
