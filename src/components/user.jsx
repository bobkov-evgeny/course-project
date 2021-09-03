import React from "react";
import Qualitie from "./qualitie";
import Bookmark from "./bookmark";

const User = ({ user, onDelete, onToggleUserBookmark }) => {
	return (
		<>
			<tr key={user._id}>
				<th scope="row">{user.name}</th>
				<td>
					{user.qualities.map((quality) => (
						<Qualitie key={quality.name} quality={quality} />
					))}
				</td>
				<td>{user.profession.name}</td>
				<td>{user.completedMeetings}</td>
				<td>{user.rate}/5</td>
				<td>
					<Bookmark
						key={user._id}
						bookmarked={user.bookmarked}
						onClick={() => onToggleUserBookmark(user._id)}
					/>
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