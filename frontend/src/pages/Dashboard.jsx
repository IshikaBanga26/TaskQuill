import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useTasks from '../hooks/useTasks'
import TaskCard from '../components/TaskCard'

function Dashboard() {
  const { tasks, loading, error, addTask, deleteTask, toggleStatus, editTask } = useTasks()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  const handleAdd = async () => {
    if (!title.trim()) return
    await addTask(title, description)
    setTitle('')
    setDescription('')
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const filteredTasks = tasks
    .filter(task => {
      if (filter === 'pending') return task.status === 'pending'
      if (filter === 'completed') return task.status === 'completed'
      return true
    })
    .filter(task =>
      task.title.toLowerCase().includes(search.toLowerCase())
    )

  return (
    <div className="dashboard">

      {/* Navbar */}
      <div className="navbar">
        <h1>TaskQuill</h1>
        <div className="nav-right">
          <span>Hey, {user?.name}</span>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="dashboard-body">

        {/* Add Task */}
        <div className="add-task-box">
          <h3>New Task</h3>
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={handleAdd}>Add Task</button>
        </div>

        {/* Search + Filter */}
        <div className="controls">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <div className="filter-btns">
            {['all', 'pending', 'completed'].map(f => (
              <button
                key={f}
                className={filter === f ? 'active' : ''}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Task List */}
        {error && <p className="error-msg">{error}</p>}
        {loading ? (
          <p className="loading">Loading tasks...</p>
        ) : filteredTasks.length === 0 ? (
          <p className="empty">No tasks found</p>
        ) : (
          <div className="task-list">
            {filteredTasks.map(task => (
              <TaskCard
                key={task._id}
                task={task}
                onDelete={deleteTask}
                onToggle={toggleStatus}
                onEdit={editTask}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default Dashboard