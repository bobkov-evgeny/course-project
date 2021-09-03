import React from "react";
import User from "./user";

const Users = ({ users, onDelete, onToggleUserBookmark }) => {
	return (
		<>
			<table className="table">
				<thead>
					<tr>
						<th scope="col">Имя</th>
						<th scope="col">Качества</th>
						<th scope="col">Профессия</th>
						<th scope="col">Встретился, раз</th>
						<th scope="col">Оценка</th>
						<th scope="col">В закладки</th>
						<th scope="col"></th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<User
							key={user._id}
							user={user}
							onDelete={onDelete}
							onToggleUserBookmark={onToggleUserBookmark}
						/>
					))}
				</tbody>
			</table>
		</>
	);
};

export default Users;
