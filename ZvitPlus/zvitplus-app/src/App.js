import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout
import Navbar from './components/Layout/Navbar';

// Auth
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// Home
import Home from './pages/Home/Home';

// My Space
import Dashboard from './pages/MySpace/Dashboard';
import MyTemplates from './pages/MySpace/MyTemplates';
import MyReports from './pages/MySpace/MyReports';

// Templates
import TemplateList from './pages/Templates/TemplateList';
import TemplateDetail from './pages/Templates/TemplateDetail';
import CreateReport from './pages/Templates/CreateReport';

// Reports
import ReportList from './pages/Reports/ReportList';
import RecentReports from './pages/Reports/RecentReports';
import ReportDetail from './pages/Reports/ReportDetail';

// Если нужны эти компоненты, создайте их:
// import CreateTemplate from './pages/Templates/CreateTemplate';
// import CreateReportFromTemplate from './pages/Templates/CreateReportFromTemplate';
import Profile from './pages/Profile/Profile';
import TemplateUpload from './pages/Templates/Upload/index.jsx';

// Для этих компонентов пока можно использовать заглушки:
const CreateTemplate = () => <div>Create Template (в разработке)</div>;
const CreateReportFromTemplate = () => <div>Create Report from Template (в разработке)</div>;
// const Profile = () => <div>Profile (в разработке)</div>;

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Публичные маршруты */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Защищенные маршруты (пока без PrivateRoute) */}
        {/* My Space */}
        <Route path="/my-space" element={<Dashboard />} />
        <Route path="/my-space/templates" element={<MyTemplates />} />
        <Route path="/my-space/reports" element={<MyReports />} />
        
        {/* Templates */}
        <Route path="/templates" element={<TemplateList />} />
        <Route path="/templates/create" element={<CreateTemplate />} />
        <Route path="/templates/:id" element={<TemplateDetail />} />
        <Route path="/templates/upload" element={<TemplateUpload/>} />
        
        {/* Reports */}
        <Route path="/reports" element={<ReportList />} />
        <Route path="/reports/recent" element={<RecentReports />} />
        <Route path="/reports/:id" element={<ReportDetail />} />
        <Route path="/create-report" element={<CreateReport />} />
        <Route path="/create-report/:templateId" element={<CreateReportFromTemplate />} />
        
        {/* Profile */}
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;