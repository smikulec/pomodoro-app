import React from 'react';
import TaskList from '../src/components/TaskList';

export default function Task({ taskList }) {
	console.log('taskList in Task', taskList);
	return <TaskList items={taskList} />;
}
