import SessionLength from '../src/components/SessionLength';
import TaskForm from '../src/components/TaskForm';

export default function Settings() {
	return (
		<>
			<TaskForm />
			<div>
				<h1>How long do you want your sessions to be?</h1>
				<div className='settings-container'>
					<SessionLength type='work' />
					<SessionLength type='break' />
				</div>
			</div>
		</>
	);
}
