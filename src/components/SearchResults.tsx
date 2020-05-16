import React, { useState } from "react";

const SearchResults = ({ selectedUser }) => {
	return (
		<div>
			<div>
				{Object.entries(selectedUser).map((element) => {
					const [key, value] = element;
					if (typeof value !== "object") {
						return (
							<p key={key}>
								<span className='bold'>{key}</span>:{value}
							</p>
						);
					}
				})}
			</div>
		</div>
	);
};

export default SearchResults;
