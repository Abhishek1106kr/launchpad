import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  LogOut, 
  User, 
  Menu, 
  X,
  PlusCircle
} from 'lucide-react';
import logo from '../../assets/logo.svg';

const StartupSidebar = () => {
  const { startup, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/startup/login');
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 z-50 p-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:bg-white lg:pt-5 lg:pb-4">
        <div className="flex items-center flex-shrink-0 px-6">
          <img className="h-8 w-auto" src={logo} alt="LaunchPad" />
        </div>
        <div className="mt-6 h-0 flex-1 flex flex-col overflow-y-auto">
          <div className="px-3 mt-6">
            <div className="space-y-1">
              <NavLink
                to="/startup/dashboard"
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
                to="/startup/gigs"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  } group flex items-center px-3 py-2 text-sm font-medium rounded-md`
                }
              >
                <Briefcase className="mr-3 h-5 w-5" />
                Gigs
              </NavLink>

              <NavLink
                to="/startup/gigs/new"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  } group flex items-center px-3 py-2 text-sm font-medium rounded-md`
                }
              >
                <PlusCircle className="mr-3 h-5 w-5" />
                Post New Gig
              </NavLink>

              <NavLink
                to="/startup/students"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  } group flex items-center px-3 py-2 text-sm font-medium rounded-md`
                }
              >
                <Users className="mr-3 h-5 w-5" />
                Browse Students
              </NavLink>

              <NavLink
                to="/startup/profile"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  } group flex items-center px-3 py-2 text-sm font-medium rounded-md`
                }
              >
                <User className="mr-3 h-5 w-5" />
                Company Profile
              </NavLink>
            </div>
          </div>

          {/* Profile section */}
          <div className="mt-auto px-3 py-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {startup?.logo ? (
                  <img
                    className="h-9 w-9 rounded-full object-cover"
                    src={startup.logo}
                    alt={startup.name}
                  />
                ) : (
                  <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-800 font-medium text-sm">
                      {startup?.name?.charAt(0) || 'S'}
                    </span>
                  </div>
                )}
              </div>
              <div className="ml-3 min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {startup?.name || 'Your Company'}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {startup?.email || 'email@example.com'}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="ml-auto flex-shrink-0 p-1 text-gray-400 hover:text-gray-600"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 flex z-40">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={toggleSidebar}></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={toggleSidebar}
              >
                <span className="sr-only">Close sidebar</span>
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4">
                <img className="h-8 w-auto" src={logo} alt="LaunchPad" />
              </div>
              <nav className="mt-5 px-2 space-y-1">
                <NavLink
                  to="/startup/dashboard"
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    } group flex items-center px-2 py-2 text-base font-medium rounded-md`
                  }
                  onClick={toggleSidebar}
                >
                  <LayoutDashboard className="mr-4 h-6 w-6" />
                  Dashboard
                </NavLink>

                <NavLink
                  to="/startup/gigs"
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    } group flex items-center px-2 py-2 text-base font-medium rounded-md`
                  }
                  onClick={toggleSidebar}
                >
                  <Briefcase className="mr-4 h-6 w-6" />
                  Gigs
                </NavLink>

                <NavLink
                  to="/startup/gigs/new"
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    } group flex items-center px-2 py-2 text-base font-medium rounded-md`
                  }
                  onClick={toggleSidebar}
                >
                  <PlusCircle className="mr-4 h-6 w-6" />
                  Post New Gig
                </NavLink>

                <NavLink
                  to="/startup/students"
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    } group flex items-center px-2 py-2 text-base font-medium rounded-md`
                  }
                  onClick={toggleSidebar}
                >
                  <Users className="mr-4 h-6 w-6" />
                  Browse Students
                </NavLink>

                <NavLink
                  to="/startup/profile"
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    } group flex items-center px-2 py-2 text-base font-medium rounded-md`
                  }
                  onClick={toggleSidebar}
                >
                  <User className="mr-4 h-6 w-6" />
                  Company Profile
                </NavLink>
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {startup?.logo ? (
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={startup.logo}
                      alt={startup.name}
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-800 font-medium">
                        {startup?.name?.charAt(0) || 'S'}
                      </span>
                    </div>
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-base font-medium text-gray-700">
                    {startup?.name || 'Your Company'}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center"
                  >
                    <LogOut className="mr-1 h-4 w-4" />
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 w-14">{/* Force sidebar to shrink to fit close icon */}</div>
        </div>
      )}
    </>
  );
};

export default StartupSidebar;