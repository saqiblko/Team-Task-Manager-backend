// src/pages/Projects.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function Projects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: '', description: '' });
  const [showAdd, setShowAdd] = useState(false);
  const [email, setEmail] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [loadingMember, setLoadingMember] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    api.get('/projects').then((res) => setProjects(res.data)).catch(() => {});
  };

  const addProject = async (e) => {
    e.preventDefault();
    try {
      await api.post('/projects', form);
      setForm({ name: '', description: '' });
      setShowAdd(false);
      fetchProjects();
    } catch (err) {
      alert('Failed to create project');
    }
  };

  const addMember = async () => {
    if (!email || !selectedProject) return;
    setLoadingMember(true);
    try {
      await api.post(`/projects/${selectedProject}/members`, { email });
      setEmail('');
      setSelectedProject(null);
      fetchProjects();
    } catch (err) {
      alert('Failed to add member');
    } finally {
      setLoadingMember(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-500 mt-1">Manage your team projects</p>
        </div>
        {user?.role === 'admin' && (
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="inline-flex items-center px-5 py-3 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition"
          >
            <span className="text-xl mr-2">＋</span> New Project
          </button>
        )}
      </div>

      {/* Add Project Form */}
      {showAdd && (
        <form
          onSubmit={addProject}
          className="bg-white rounded-2xl shadow-md p-6 mb-8 space-y-4 border border-brand-100 animate-fade-in"
        >
          <h3 className="text-lg font-semibold text-gray-800">Create New Project</h3>
          <input
            type="text"
            placeholder="Project name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            required
          />
          <textarea
            placeholder="Project description (optional)"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            rows="2"
          />
          <div className="flex space-x-3">
            <button
              type="submit"
              className="px-6 py-2.5 bg-brand-600 text-white rounded-xl hover:bg-brand-700 transition font-medium"
            >
              Create Project
            </button>
            <button
              type="button"
              onClick={() => setShowAdd(false)}
              className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden group"
          >
            <div className="bg-gradient-to-r from-brand-500 to-brand-400 h-2"></div>
            <div className="p-5">
              <Link to={`/projects/${project.id}`}>
                <h2 className="text-xl font-bold text-gray-800 group-hover:text-brand-600 transition mb-1">
                  {project.name}
                </h2>
              </Link>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                {project.description || 'No description'}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-xs text-gray-400">
                  <span>👤 {project.creator?.name}</span>
                </div>
                {user?.role === 'admin' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project.id);
                    }}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg transition font-medium"
                  >
                    ＋ Add Member
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Member Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">👥 Add Team Member</h3>
            <p className="text-sm text-gray-500 mb-4">
              Enter the user's email address to invite them to this project.
            </p>
            <input
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl mb-4 focus:ring-2 focus:ring-brand-500"
            />
            <div className="flex space-x-3 justify-end">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-700 transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={addMember}
                disabled={loadingMember || !email}
                className="px-5 py-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white rounded-xl transition font-medium flex items-center space-x-2"
              >
                {loadingMember ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Adding...</span>
                  </>
                ) : (
                  'Add Member'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}