import React, { useState } from "react";
import "../styles/search.css";
interface User {
	name: string;
	email: string;
	username: string;
}

const searchUser = (
	users: Array<User>,
	searchInput: string,
	setSearchResults: Function,
) => {
	setSearchResults(() => {
		return users.filter((user: User) => {
			return (
				user.name.includes(searchInput) || user.email.includes(searchInput)
			);
		});
	});
};
const Search = ({ users, searchInput, setSearchInput, setSelectedUser }) => {
	const [searchResults, setSearchResults] = useState([]);

	const handleChange = (event: any) => {
		if (event.target.value) {
			setSearchInput(event.target.value.trim());
			searchUser(users, searchInput, setSearchResults);
		}
	};
	const showDetails = (user: User) => {
		setSearchResults([]);
		setSelectedUser(user);
	};
	return (
		<div className='inline'>
			<form>
				<div className='autocomplete'>
					<p className='search-by'>Search By</p>
					<input
						type='text'
						onChange={handleChange}
						placeholder='Email or Name'
					/>
				</div>
				<input type='submit' />
			</form>
			<div className='autocomplete'>
				{searchResults.map((user: User, index: number) => {
					return (
						<div
							onClick={() => showDetails(user)}
							className='autocomplete-items'
							key={user.name}>
							{user.name}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Search;
