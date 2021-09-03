import React from "react";
import Qualitie from "./qualitie";
import Bookmark from "./bookmark";

const User = ({ user, onDelete }) => {
	return (
		<>
			<tr key={user._id}>
				<th scope="row">{user.name}</th>
				<td>
					{user.qualities.map((quality) => (
						<Qualitie quality={quality} />
					))}
				</td>
				<td>{user.profession.name}</td>
				<td>{user.completedMeetings}</td>
				<td>{user.rate}/5</td>
				<td>
					<Bookmark />
				</td>
				<td>
					<button onClick={() => onDelete(user._id)} className="btn btn-danger">
						Удалить
					</button>
				</td>
			</tr>
		</>
	);
};

export default User;
