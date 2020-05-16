import React from "react";
import Toggle from "./Toggle";
import "../styles/usersTables.css";

interface User {
	name: string;
	email: string;
	username: string;
}
const tableHeadings = ["User", "User Name", "Email", "Block/UnBlock"];
const unBlockingTimeInMinutes: number = 5;
const unBlockingTimeInMilliseconds: number =
	unBlockingTimeInMinutes * 60 * 1000;
//make this time 5 minutes.

const blockUser = (username: string, setBlockedUsers: Function) => {
	localStorage.setItem(username, "true");
	setBlockedUsers((prevState: Array<string>) => {
		return prevState.concat(username);
	});
};

const unblockUser = (username: string, setBlockedUsers: Function) => {
	setBlockedUsers((prevState: Array<string>) => {
		localStorage.removeItem(username);
		return prevState.filter((username) => username === username);
	});
};

const handleTopUserClick = (event: any, user: User, setTopUsers: Function) => {
	event.persist();
	console.log(event.target.value, user.name);
	setTopUsers((prevState: Array<User>) => {
		return prevState.concat(user);
	});
};
const UsersTable = ({ users, setBlockedUsers, routeType, setTopUsers }) => {
	const handleBlockToggle = (event: any) => {
		event.persist();
		const username = event.target.value;
		const blockedUser = localStorage.getItem(username);
		if (blockedUser) {
			unblockUser(username, setBlockedUsers);
		} else {
			blockUser(username, setBlockedUsers);
			setTimeout(() => {
				unblockUser(username, setBlockedUsers);
			}, unBlockingTimeInMilliseconds);
		}
	};
	return (
		<table>
			<tr>
				{tableHeadings.map((heading, index) => {
					return <th key={index}>{heading}</th>;
				})}
				{routeType === "users" ? <th>Top User</th> : null}
			</tr>
			{users.map((user, index) => {
				const { name, username, email } = user;
				return (
					<tr key={index}>
						<td>{name}</td>
						<td>{username}</td>
						<td>{email}</td>
						<td>
							<Toggle
								username={username}
								handleBlockToggle={handleBlockToggle}
							/>
							{localStorage.getItem(username) === "true" ? (
								<span>Blocked</span>
							) : null}
						</td>
						{routeType === "users" ? (
							<td>
								<input
									type='checkbox'
									value={username}
									id={username}
									onChange={(event) => {
										handleTopUserClick(event, user, setTopUsers);
									}}
								/>
							</td>
						) : null}
					</tr>
				);
			})}
		</table>
	);
};

export default UsersTable;
