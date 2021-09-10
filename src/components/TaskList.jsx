import React from 'react';

export default function TaskList({items}) {
    return (
        <div className="task-list">
        { (items !== undefined) ? 
        <ul>
         {items.map((item) => (
                <li key={item.name}>
                    {item.name}
                </li>
         ))}
        </ul> 
        : null
        }
    </div>
    );
}