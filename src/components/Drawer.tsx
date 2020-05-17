import React, { useState } from "react";

import "../styles/drawer.css";

const closeNav = (setOpenSideNav: Function) => {
	setOpenSideNav(false);
};

const openNav = (setOpenSideNav: Function) => {
	setOpenSideNav(true);
};
const Drawer = () => {
	const [openSideNav, setOpenSideNav] = useState(false);
	return (
		<div className='inline'>
			<div className={`sidenav ${openSideNav ? "open" : "close"}`}>
				<span className='closebtn' onClick={() => closeNav(setOpenSideNav)}>
					&times;
				</span>
				<a href='#'>Home</a>
				<a href='#'>Sports</a>
				<a href='#'>News</a>
				<a href='#'>Log out</a>
			</div>
			<span
				className={`open-button ${openSideNav ? "close" : "open"}`}
				onClick={() => openNav(setOpenSideNav)}>
				&#9776;
			</span>
		</div>
	);
};

export default Drawer;
