export {};
import React, { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
} from "react-router-dom";
import "../styles/header.css";
import UsersTable from "./UsersTable";
import Search from "./Search";
import SearchResults from "./SearchResults";
import Drawer from "./Drawer";
const URL = "https://jsonplaceholder.typicode.com/users";
let loading = false;

const Header = () => {
	const [users, setUsers] = useState([]);
	const [blockedUsers, setBlockedUsers] = useState([]);
	const [searchInput, setSearchInput] = useState("");
	const [selectedUser, setSelectedUser] = useState({});
	const [active, setActive] = useState("users");
	const [topUsers, setTopUsers] = useState([]);
	const handleLinkClick = (link: string) => {
		setSelectedUser({});
		setActive(link);
	};
	useEffect(() => {
		loading = true;
		fetch(URL)
			.then((response) => response.json())
			.then((users) => {
				loading = false;
				setUsers(users);
			})
			.catch((err) => {
				loading = false;
				console.log(err);
			});
	}, []);
	return (
		<Router>
			<div>
				<div className='navigation'>
					<nav className='navbar'>
						<Drawer />
						<Redirect exact from='/' to='users' />
						<Link
							onClick={() => {
								handleLinkClick("users");
							}}
							className={`link ${active === "users" ? "active" : null}`}
							to='/users'>
							Users
						</Link>
						<Link
							onClick={() => {
								handleLinkClick("top-users");
							}}
							className={`link ${active === "top-users" ? "active" : null}`}
							to='/top-users'>
							Top Users
						</Link>
						<Search
							users={users}
							searchInput={searchInput}
							setSearchInput={setSearchInput}
							setSelectedUser={setSelectedUser}
						/>
						<SearchResults selectedUser={selectedUser} />
						<Switch>
							<Route path='/users'>
								<UsersTable
									users={users}
									setTopUsers={setTopUsers}
									setBlockedUsers={setBlockedUsers}
									routeType={"users"}
									setUsers={setUsers}
								/>
							</Route>
							<Route path='/top-users'>
								<UsersTable
									users={JSON.parse(localStorage.getItem("topUsers"))}
									setTopUsers={setTopUsers}
									setBlockedUsers={setBlockedUsers}
									routeType={"top-users"}
									setUsers={setUsers}
								/>
							</Route>
						</Switch>
					</nav>
				</div>
			</div>
		</Router>
	);
};

export default Header;
