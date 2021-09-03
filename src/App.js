import React, { useState } from "react";
import api from "./API";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";

function App() {
	const [users, setUsers] = useState(api.users.fetchAll);

	const handleDelete = (userId) => {
		const newUsers = users.filter((user) => user._id !== userId);
		setUsers(newUsers);
	};

	const handleToggleUserBookmark = (userId) => {
		const newUsers = users.map((user) => {
			return user._id === userId ? { ...user, bookmarked: true } : user;
		});
		setUsers(newUsers);
	};
	return (
		<>
			<SearchStatus numberOfGuests={users.length} />
			<Users
				onDelete={handleDelete}
				users={users}
				onToggleUserBookmark={handleToggleUserBookmark}
			/>
		</>
	);
}

export default App;