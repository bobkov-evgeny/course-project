import React from "react";
import User from "./user";

const Users = ({ users, onRender, onDelete }) => {
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
						<User user={user} onDelete={onDelete} />
					))}
				</tbody>
			</table>
		</>
	);
};

export default Users;
