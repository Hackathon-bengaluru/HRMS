import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Users, Calendar, Clock, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState({
    totalEmployees: 0,
    pendingLeaves: 0,
    todayAttendance: 0,
    monthlyPayroll: 0,
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get('/api/reports/analytics');
      setAnalytics(response.data);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    }
  };

  const stats = [
    {
      title: 'People on file',
      value: analytics.totalEmployees,
      icon: Users,
      color: 'bg-blue-500',
      link: '/employees',
    },
    {
      title: 'Time-off queue',
      value: analytics.pendingLeaves,
      icon: Calendar,
      color: 'bg-yellow-500',
      link: '/leave',
    },
    {
      title: 'Today on-site',
      value: analytics.todayAttendance,
      icon: Clock,
      color: 'bg-green-500',
      link: '/attendance',
    },
    {
      title: 'Payroll this month',
      value: `$${analytics.monthlyPayroll.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-purple-500',
      link: '/payroll',
    },
  ];

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Operations overview</h1>
          <p className="mt-2 text-gray-600">A clear read on the work behind your workplace.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link
                key={stat.title}
                to={stat.link}
                className="card hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center">
                  <div className={`${stat.color} p-3 rounded-lg text-white`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Move the work forward</h2>
            <div className="space-y-3">
              <Link
                to="/employees"
                className="block w-full btn btn-primary text-center"
              >
                Open people directory
              </Link>
              <Link
                to="/leave"
                className="block w-full btn btn-secondary text-center"
              >
                Triage time off
              </Link>
              <Link
                to="/reports"
                className="block w-full btn btn-secondary text-center"
              >
                Read the reports
              </Link>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Recent movement</h2>
            <p className="text-gray-500">Your latest workplace activity will appear here.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;

