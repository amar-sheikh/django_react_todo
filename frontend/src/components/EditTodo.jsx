import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditTodo = () => {
	const [todo, setTodo] = useState({
		id: '',
		task_name: '',
		task_description: '',
		is_completed: false
	})
	const [errors, setErrors] = useState({
		task_name: '',
		task_description: '',
		is_completed: false
	})
	const navigate = useNavigate()
	const params = useParams()

	useEffect(()=> {
		const getTodo = async () => {
			try {
				const response = await fetch(`http://127.0.0.1:8000/api/v1/todos/${params.id}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				})

				const data = await response.json()
				setTodo({
					id: data.id,
					task_name: data.task_name,
					task_description: data.task_description,
					is_completed: data.is_completed
				})
			}
			catch {
				setError('Error fetching data')
			}
		}

		getTodo()
	},[params])

	const handleSubmit = async (e) => {
		e.preventDefault();

		const response = await fetch(`http://127.0.0.1:8000/api/v1/todos/${params.id}/`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(todo)
		})

		if (response.status === 200) {
			navigate('/')
		}
		else {
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
			<h1>Update Todo</h1>
			<form onSubmit={handleSubmit}>
				<div className='form-field-group'>
					<label htmlFor='task_name'>Task name</label>
					<input
						name='task_name'
						type='text'
						value={todo.task_name}
						onChange={(e) => setTodo({ ...todo, task_name: e.target.value })}
						placeholder='Enter task name...' />
					<div className='error'>{errors.task_name}</div>
				</div>
				<div className='form-field-group'>
					<label htmlFor='task_description'>Task descripton</label>
					<textarea
						name='task_description'
						value={todo.task_description}
						onChange={(e) => setTodo({ ...todo, task_description: e.target.value })}
						placeholder='Enter description...' />
					<div className='error'>{errors.task_description}</div>
				</div>
				<div className='form-field-group'>
					<label htmlFor='is_completed'>Task Completed</label>
					<input
						name='is_completed'
						type='checkbox'
						checked={todo.is_completed}
						onChange={(e) => setTodo({ ...todo, is_completed: e.target.checked })} />
					<div className='error'>{errors.is_completed}</div>
				</div>
				<button type='submit'>Update</button>
			</form>
		</div>
	)
}

export default EditTodo