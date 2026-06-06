const express = require('express')
const Task = require('../models/Task')
const protect = require('../middleware/authMiddleware')

const router = express.Router()

router.use(protect)

// get all tasks for the logged in user
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId }).sort({ createdAt: -1 })
    res.json(tasks)
  } catch (err) {
    console.log('fetch tasks error:', err.message)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// create a task
router.post('/', async (req, res) => {
  const { title, description } = req.body

  try {
    const task = new Task({
      title,
      description,
      userId: req.user.userId
    })
    await task.save()
    res.status(201).json(task)
  } catch (err) {
    console.log('create task error:', err.message)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// update a task
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.userId })
    if (!task) return res.status(404).json({ message: 'Task not found' })

    const { title, description, status } = req.body

    if (title !== undefined) task.title = title
    if (description !== undefined) task.description = description
    if (status !== undefined) task.status = status

    await task.save()
    res.json(task)
  } catch (err) {
    console.log('update task error:', err.message)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// delete a task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.userId })
    if (!task) return res.status(404).json({ message: 'Task not found' })

    res.json({ message: 'Task deleted' })
  } catch (err) {
    console.log('delete task error:', err.message)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

module.exports = router