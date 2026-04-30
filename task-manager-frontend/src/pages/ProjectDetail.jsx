// src/pages/ProjectDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function ProjectDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    assigned_to: '',
    due_date: '',
    status: 'pending',
  });
  const [showTaskForm, setShowTaskForm] = useState(false);

  useEffect(() => {
    api.get(`/projects/${id}`)
      .then((res) => setProject(res.data))
      .catch(() => navigate('/projects'));
  }, [id]);

  const addTask = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...taskForm, project_id: id };
      if (!payload.assigned_to) delete payload.assigned_to;
      if (!payload.due_date) delete payload.due_date;
      
      await api.post('/tasks', payload);
      setTaskForm({ title: '', description: '', assigned_to: '', due_date: '', status: 'pending' });
      setShowTaskForm(false);
      const res = await api.get(`/projects/${id}`);
      setProject(res.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Task creation failed');
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    await api.put(`/tasks/${taskId}`, { status: newStatus });
    const res = await api.get(`/projects/${id}`);
    setProject(res.data);
  };

  const updateTaskAssignment = async (taskId, assignedTo) => {
    await api.put(`/tasks/${taskId}`, { assigned_to: assignedTo || null });
    const res = await api.get(`/projects/${id}`);
    setProject(res.data);
  };

  if (!project)
    return (
      <div className="text-center py-20">
        <div className="animate-spin w-10 h-10 border-4 border-brand-600 border-t-transparent rounded-full mx-auto"></div>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
        <Link to="/projects" className="hover:text-brand-600">Projects</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{project.name}</span>
      </nav>

      {/* Header */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
            <p className="text-gray-500 mt-1">{project.description || 'No description'}</p>
          </div>
          <button
            onClick={() => setShowTaskForm(!showTaskForm)}
            className="flex items-center px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl transition shadow-md"
          >
            <span className="text-lg mr-2">＋</span> Add Task
          </button>
        </div>
        {/* Members */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Team</h3>
          <div className="flex flex-wrap gap-2">
            {project.members?.map((member) => (
              <span
                key={member.id}
                className="inline-flex items-center px-3 py-1.5 bg-brand-50 text-brand-700 rounded-full text-sm font-medium"
              >
                <span className="w-5 h-5 bg-brand-200 rounded-full flex items-center justify-center text-xs mr-2 font-bold">
                  {member.name.charAt(0)}
                </span>
                {member.name}
                <span className="ml-1 text-xs text-brand-400">
                  ({member.pivot?.role_in_project || 'member'})
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Task Creation Form */}
      {showTaskForm && (
        <form
          onSubmit={addTask}
          className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-brand-100 animate-fade-in space-y-4"
        >
          <h3 className="text-lg font-semibold text-gray-800">New Task</h3>
          <input
            type="text"
            placeholder="Task title"
            value={taskForm.title}
            onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500"
            required
          />
          <textarea
            placeholder="Description"
            value={taskForm.description}
            onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500"
            rows="2"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
              <select
                value={taskForm.assigned_to}
                onChange={(e) => setTaskForm({ ...taskForm, assigned_to: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500"
              >
                <option value="">Unassigned</option>
                {project.members?.map((m) => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input
                type="date"
                value={taskForm.due_date}
                onChange={(e) => setTaskForm({ ...taskForm, due_date: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>
          <div className="flex space-x-3">
            <button type="submit" className="px-6 py-2.5 bg-brand-600 text-white rounded-xl hover:bg-brand-700 font-medium transition">
              Create Task
            </button>
            <button
              type="button"
              onClick={() => setShowTaskForm(false)}
              className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 font-medium transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Tasks Table */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
        <div className="px-6 py-4 border-b bg-gray-50/50">
          <h2 className="text-xl font-semibold text-gray-800">
            📋 Tasks ({project.tasks?.length || 0})
          </h2>
        </div>
        {project.tasks?.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No tasks yet. Click "Add Task" to create one.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Task</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigned To</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {project.tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="font-medium text-gray-900">{task.title}</p>
                      {task.description && (
                        <p className="text-xs text-gray-500 mt-0.5 truncate max-w-xs">{task.description}</p>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <select
                        value={task.assigned_to || ''}
                        onChange={(e) => updateTaskAssignment(task.id, e.target.value)}
                        className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-brand-500 bg-transparent"
                        disabled={user.role !== 'admin'}
                      >
                        <option value="">Unassigned</option>
                        {project.members?.map((m) => (
                          <option key={m.id} value={m.id}>{m.name}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {task.due_date ? (
                        <span className="text-gray-700">{task.due_date}</span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={task.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={task.status}
                        onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                        className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-brand-500"
                        disabled={user.role !== 'admin' && task.assigned_to !== user.id}
                      >
                        <option value="pending">⏳ Pending</option>
                        <option value="in_progress">🔄 In Progress</option>
                        <option value="completed">✅ Completed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper component for status badge
function StatusBadge({ status }) {
  const colors = {
    pending: 'bg-amber-100 text-amber-700',
    in_progress: 'bg-purple-100 text-purple-700',
    completed: 'bg-green-100 text-green-700',
  };
  const icons = {
    pending: '⏳',
    in_progress: '🔄',
    completed: '✅',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status]}`}>
      {icons[status]} {status.replace('_', ' ')}
    </span>
  );
}