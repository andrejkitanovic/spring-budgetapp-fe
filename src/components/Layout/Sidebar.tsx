import React from "react";

import { faArrowRightFromBracket, faGear, faHouse, faNoteSticky } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const handleLogout = () => {
    localStorage.removeItem("user_id")
    navigate('/login');
  }

  return (
    <div
      className={`flex flex-col z-40  sticky left-auto top-0 translate-x-0 transform h-screen overflow-y-auto no-scrollbar w-64 sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-gray-800 p-4 transition-all duration-200 ease-in-out`}
    >
      <ul className="mt-3">
        {/* Dashboard */}
        <li
          className={`px-3 py-2 rounded-sm mb-2 last:mb-0 ${
            pathname === "/" && "bg-gray-900"
          }`}
        >
          <Link
            to="/"
            className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
              pathname === "/" && "hover:text-gray-200"
            }`}
          >
            <div className="flex items-center">
              <FontAwesomeIcon icon={faHouse} />
              <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                Dashboard
              </span>
            </div>
          </Link>
        </li>
         {/* Notes */}
         <li
          className={`px-3 py-2 rounded-sm mb-2 last:mb-0 ${
            pathname === "/notes" && "bg-gray-900"
          }`}
        >
          <Link
            to="/notes"
            className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
              pathname === "/notes" && "hover:text-gray-200"
            }`}
          >
            <div className="flex items-center">
              <FontAwesomeIcon icon={faNoteSticky} />
              <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                Notes
              </span>
            </div>
          </Link>
        </li>
        {/* Settings */}
        <li
          className={`px-3 py-2 rounded-sm mb-2 last:mb-0 ${
            pathname === "/settings" && "bg-gray-900"
          }`}
        >
          <Link
            to="/settings"
            className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
              pathname === "/settings" && "hover:text-gray-200"
            }`}
          >
            <div className="flex items-center">
              <FontAwesomeIcon icon={faGear} />
              <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                Settings
              </span>
            </div>
          </Link>
        </li>
        <li
          className={`px-3 py-2 rounded-sm mb-2 last:mb-0`}
        >
          <div
            className={`block text-gray-200 hover:text-white truncate transition duration-150 cursor-pointer`}
            onClick={handleLogout}
          >
            <div className="flex items-center">
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
              <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                Logout
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
