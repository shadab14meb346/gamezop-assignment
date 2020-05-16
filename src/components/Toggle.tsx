import React from "react";

const Toggle = ({ username, handleBlockToggle }) => {
	return (
		<label className='switch'>
			<input
				type='checkbox'
				value={username}
				checked={localStorage.getItem(username) === "true" ? true : false}
				onChange={handleBlockToggle}></input>
			<span className='slider round'></span>
		</label>
	);
};

export default Toggle;
