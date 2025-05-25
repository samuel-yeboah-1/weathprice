import React from "react";
import { NavLink } from "react-router";
import { Cross2Icon } from "@radix-ui/react-icons";

function Sidebar({ isOpen, onMenuToggle }) {
  return (
    <aside
      className={`fixed inset-y-0 right-0 z-50 w-64 bg-secondary py-4 px-2
        transform transition-all duration-300 ease-out
        opacity-0 lg:opacity-100
        lg:relative lg:translate-x-0 ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full"
        }`}
    >
      <nav>
        <ul className="flex flex-col gap-4">
          <li className="self-end md:hidden p-2">
            <Cross2Icon fontSize={12} onClick={() => onMenuToggle()} />
          </li>
          <li>
            <NavLink
              to="/weather"
              className={({ isActive }) =>
                `block p-2 rounded-lg hover:bg-primary/10 transition-colors
               ${isActive ? "bg-primary/20 font-medium" : ""}
              `
              }
            >
              Weather
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/prices"
              className={({ isActive }) =>
                `block p-2 rounded-lg hover:bg-primary/10 transition-colors
               ${isActive ? "bg-primary/20 font-medium" : ""}
              `
              }
            >
              Price
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
    <aside
      className={`fixed inset-y-0 right-0 z-50 w-64 bg-secondary py-4 px-2
        transform transition-all duration-300 ease-out
        opacity-0 lg:opacity-100
        lg:relative lg:translate-x-0 ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full"
        }`}
    >
      <nav>
        <ul className="flex flex-col gap-4">
          <li className="self-end md:hidden p-2">
            <Cross2Icon fontSize={12} onClick={() => onMenuToggle()} />
          </li>
          <li>
            <NavLink
              to="/weather"
              className={({ isActive }) =>
                `block p-2 rounded-lg hover:bg-primary/10 transition-colors
               ${isActive ? "bg-primary/20 font-medium" : ""}
              `
              }
            >
              Weather
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/prices"
              className={({ isActive }) =>
                `block p-2 rounded-lg hover:bg-primary/10 transition-colors
               ${isActive ? "bg-primary/20 font-medium" : ""}
              `
              }
            >
              Price
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
