import React from 'react';

export default function TaskList({ items }) {
	console.log(items);
	return (
		<div className='task-list'>
			<p>See what you have been working hard on:</p>
			{items !== undefined ? (
				<ul>
					{items.map((item) => (
						<li key={item.name}>{item.name}</li>
					))}
				</ul>
			) : null}
		</div>
	);
}
