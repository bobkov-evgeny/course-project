import React from "react";
import PropTypes from "prop-types";

const Qualitie = ({ quality }) => {
    return (
        <>
            <span key={quality._id} className={"badge m-1 bg-" + quality.color}>
                {quality.name}
            </span>
        </>
    );
};

Qualitie.propTypes = {
    quality: PropTypes.number.isRequired,
};

export default Qualitie;
