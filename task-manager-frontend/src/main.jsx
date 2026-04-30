import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Tasks from './pages/Tasks';
import PrivateRoute from './components/PrivateRoute';
import SidebarLayout from './components/SidebarLayout';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes inside Sidebar Layout */}
          <Route path="/dashboard" element={
            <PrivateRoute><SidebarLayout><Dashboard /></SidebarLayout></PrivateRoute>
          } />

          <Route path="/projects" element={
            <PrivateRoute><SidebarLayout><Projects /></SidebarLayout></PrivateRoute>
          } />

          <Route path="/projects/:id" element={
            <PrivateRoute><SidebarLayout><ProjectDetail /></SidebarLayout></PrivateRoute>
          } />

          <Route path="/tasks" element={
            <PrivateRoute><SidebarLayout><Tasks /></SidebarLayout></PrivateRoute>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);