import React, { useState } from "react";
import api from "./API";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";

function App() {
	const [users, setUsers] = useState(api.users.fetchAll);

	const handleDelete = (userId) => {
		setUsers(users.filter((user) => user._id !== userId));
	};

	return (
		<>
			<SearchStatus numberOfGuests={users.length} />
			<Users onDelete={handleDelete} users={users} />
		</>
	);
}

export default App;
