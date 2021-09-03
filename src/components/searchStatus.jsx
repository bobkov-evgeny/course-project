import React from "react";

const SearchStatus = ({ numberOfGuests }) => {
	return numberOfGuests === 0 ? (
		<span className={"badge bg-danger m-2"}>
			<h3>Никто не пойдет тусить с тобой :(</h3>
		</span>
	) : (
		<span className={"badge bg-primary m-2"}>
			<h3>
				{numberOfGuests} человек
				{numberOfGuests === 2 || numberOfGuests === 3 || numberOfGuests === 4
					? "a"
					: ""}{" "}
				тусан
				{numberOfGuests === 1 ? "ет" : "ут"} с тобой сегодня
			</h3>
		</span>
	);
};

export default SearchStatus;
