import React from "react";

const Qualitie = ({ quality }) => {
	return (
		<>
			<span key={quality._id} className={"badge m-1 bg-" + quality.color}>
				{quality.name}
			</span>
		</>
	);
};

export default Qualitie;
