import React, { useState } from "react";
import api from "../API";

const Users = () => {
	const [users, setUsers] = useState(api.users.fetchAll);

	const handleDelete = (userId) => {
		setUsers(users.filter((user) => user._id !== userId));
	};

	const renderPhrase = (number) => {
		return number === 0 ? (
			<span className={"badge bg-danger m-2"}>
				<h3>Никто не пойдет тусить с тобой :(</h3>
			</span>
		) : (
			<span className={"badge bg-primary m-2"}>
				<h3>
					{number} человек
					{number === 2 || number === 3 || number === 4 ? "a" : ""} тусан
					{number === 1 ? "ет" : "ут"} с тобой сегодня
				</h3>
			</span>
		);
	};

	console.log(users);

	return (
		<>
			{renderPhrase(users.length)}
			<table className="table">
				<thead>
					<tr>
						<th scope="col">Имя</th>
						<th scope="col">Качества</th>
						<th scope="col">Профессия</th>
						<th scope="col">Встретился, раз</th>
						<th scope="col">Оценка</th>
						<th scope="col"></th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user._id}>
							<th scope="row">{user.name}</th>
							<td scope="row">
								{user.qualities.map((quality) => (
									<span
										key={quality._id}
										className={"badge m-1 bg-" + quality.color}
									>
										{quality.name}
									</span>
								))}
							</td>
							<td>{user.profession.name}</td>
							<td>{user.completedMeetings}</td>
							<td>{user.rate}/5</td>
							<td>
								<button
									onClick={() => handleDelete(user._id)}
									className="btn btn-danger"
								>
									Удалить
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default Users;
