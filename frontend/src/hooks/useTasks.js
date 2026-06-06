import { useState, useEffect } from 'react'
import api from '../api/axios'

function useTasks() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const res = await api.get('/tasks')
      setTasks(res.data)
    } catch (err) {
      setError('Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }

  const addTask = async (title, description) => {
    try {
      const res = await api.post('/tasks', { title, description })
      setTasks(prev => [res.data, ...prev])
    } catch (err) {
      setError('Failed to add task')
    }
  }

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`)
      setTasks(prev => prev.filter(task => task._id !== id))
    } catch (err) {
      setError('Failed to delete task')
    }
  }

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'pending' ? 'completed' : 'pending'
    try {
      const res = await api.put(`/tasks/${id}`, { status: newStatus })
      setTasks(prev => prev.map(task => task._id === id ? res.data : task))
    } catch (err) {
      setError('Failed to update task')
    }
  }

  const editTask = async (id, title, description) => {
    try {
      const res = await api.put(`/tasks/${id}`, { title, description })
      setTasks(prev => prev.map(task => task._id === id ? res.data : task))
    } catch (err) {
      setError('Failed to edit task')
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return { tasks, loading, error, addTask, deleteTask, toggleStatus, editTask }
}

export default useTasks