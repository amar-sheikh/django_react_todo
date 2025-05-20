import { Routes, Route } from 'react-router-dom'
import TodoList from './components/TodoList'
import EditTodo from './components/EditTodo'
import AddTodo from './components/AddTodo'
import DeleteTodo from './components/DeleteTodo'

function App() {
  return (
    <>
      <Routes>
        <Route path='' element={<TodoList /> } />
        <Route path='/add' element={<AddTodo />} />
        <Route path='/edit/:id' element={<EditTodo />} />
        <Route path='/delete/:id' element={<DeleteTodo />} />
      </Routes>
    </>
  )
}

export default App
