// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import api from '../api/axios';

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/dashboard')
      .then((res) => setData(res.data))
      .catch(() => { });
  }, []);

  if (!data)
    return (
      <div className="text-center py-20">
        <div className="animate-spin w-10 h-10 border-4 border-brand-600 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );

  const { total_tasks, status_summary, overdue_tasks } = data;

  const stats = [
    { label: 'Total Tasks', value: total_tasks, icon: '📌', color: 'bg-brand-100 text-brand-700' },
    { label: 'Pending', value: status_summary.pending, icon: '⏳', color: 'bg-amber-100 text-amber-700' },
    { label: 'In Progress', value: status_summary.in_progress, icon: '🔄', color: 'bg-purple-100 text-purple-700' },
    { label: 'Completed', value: status_summary.completed, icon: '✅', color: 'bg-green-100 text-green-700' },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's your project overview.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-5 flex items-center space-x-4">
            <div className={`p-3 rounded-xl ${stat.color}`}>
              <span className="text-3xl">{stat.icon}</span>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Overdue Section */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4 flex items-center space-x-3">
          <span className="text-2xl">⚠️</span>
          <h2 className="text-xl font-bold text-white">Overdue Tasks</h2>
          <span className="bg-white/20 text-white text-sm rounded-full px-3 py-1 ml-auto">
            {overdue_tasks.length} tasks
          </span>
        </div>
        {overdue_tasks.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <span className="text-4xl">🎉</span>
            <p className="mt-2">No overdue tasks. Great job!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {overdue_tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-red-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {task.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {task.project?.name || '—'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">
                      {task.due_date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-700">
                        {task.status}
                      </span>
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