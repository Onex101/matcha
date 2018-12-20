import React from 'react';

export default function({name, numderOfUsers}){
	return (
		<div className="chat-header">
			<div className="user-info">
				<div className="user-name">{name}</div>
				<div className="status">
						<div className="indicator"></div>
						<span>{numderOfUsers ? numderOfUsers : null}</span>
				</div>
			</div>
		</div>
	);
}