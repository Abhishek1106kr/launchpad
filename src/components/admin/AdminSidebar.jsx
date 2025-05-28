import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Building, Users } from 'lucide-react';
import logo from '../../assets/logo.svg';

const AdminSidebar = () => {
  return (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:bg-white lg:pt-5 lg:pb-4">
      <div className="flex items-center flex-shrink-0 px-6">
        <img className="h-8 w-auto" src={logo} alt="LaunchPad" />
        <span className="ml-2 text-xl font-bold text-gray-900">Admin</span>
      </div>
      
      <div className="mt-6 h-0 flex-1 flex flex-col overflow-y-auto">
        <div className="px-3 mt-6">
          <div className="space-y-1">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                } group flex items-center px-3 py-2 text-sm font-medium rounded-md`
              }
            >
              <LayoutDashboard className="mr-3 h-5 w-5" />
              Dashboard
            </NavLink>

            <NavLink
              to="/admin/startups"
              className={({ isActive }) =>
                `${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                } group flex items-center px-3 py-2 text-sm font-medium rounded-md`
              }
            >
              <Building className="mr-3 h-5 w-5" />
              Startups
            </NavLink>

            <NavLink
              to="/admin/students"
              className={({ isActive }) =>
                `${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                } group flex items-center px-3 py-2 text-sm font-medium rounded-md`
              }
            >
              <Users className="mr-3 h-5 w-5" />
              Students
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;