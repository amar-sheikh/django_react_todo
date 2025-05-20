import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddTodo = () => {
	const [todo, setTodo] = useState({
		task_name: '',
		task_description: '',
		is_completed: false
	})
	const [ errors, setErrors ] = useState({
		task_name: '',
		task_description: '',
		is_completed: false
	})
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault();

		const response = await fetch('http://127.0.0.1:8000/api/v1/todos/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(todo)
		})

		if (response.status === 201) {
			navigate('/')
		}
		else{
			const data = await response.json()

			Object.entries(data).forEach(([item, item_errors]) => {
				setErrors(prevErrors => ({
					...prevErrors,
					[item]: item_errors.join(', ')
				}));
			});
		}
	}

	return (
		<div>
			<h1>Add Todo</h1>
			<form onSubmit={handleSubmit}>
				<div className='form-field-group'>
					<label htmlFor='task_name'>Task name</label>
					<input
						name='task_name'
						type='text'
						value={todo.task_name}
						onChange={(e) => setTodo({ ...todo, task_name: e.target.value })}
						placeholder='Enter task name...' />
					<div className='error'>{ errors.task_name }</div>
				</div>
				<div className='form-field-group'>
					<label htmlFor='task_description'>Task descripton</label>
					<textarea
						name='task_description'
						value={todo.task_description}
						onChange={(e) => setTodo({ ...todo, task_description: e.target.value })}
						placeholder='Enter description...' />
					<div className='error'>{ errors.task_description }</div>
					</div>
				<div className='form-field-group'>
					<label htmlFor='is_completed'>Task Completed</label>
					<input
						name='is_completed'
						type='checkbox'
						checked={todo.is_completed}
						onChange={(e) => setTodo({ ...todo, is_completed: e.target.checked })} />
					<div className='error'>{ errors.is_completed }</div>
				</div>
				<button type='submit'>Create</button>
			</form>
		</div>
	)
}

export default AddTodo