import { useState } from 'react'

function TaskCard({ task, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editDesc, setEditDesc] = useState(task.description)

  const handleSave = async () => {
    await onEdit(task._id, editTitle, editDesc)
    setIsEditing(false)
  }

  return (
    <div className={`task-card ${task.status}`}>
      {isEditing ? (
        <div className="edit-mode">
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <input
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
          />
          <div className="card-actions">
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div className="task-info">
            <h4 className={task.status === 'completed' ? 'done' : ''}>{task.title}</h4>
            {task.description && <p>{task.description}</p>}
            <span className={`badge ${task.status}`}>{task.status}</span>
          </div>
          <div className="card-actions">
            <button onClick={() => onToggle(task._id, task.status)}>
              {task.status === 'pending' ? 'Mark done' : 'Mark pending'}
            </button>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button className="del-btn" onClick={() => onDelete(task._id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  )
}

export default TaskCard