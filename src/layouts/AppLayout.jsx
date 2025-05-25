// src/layouts/AppLayout.jsx
import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import Sidebar from "../components/Sidebar";
import Nav from "@/components/Navbar";
import { Button } from "../components/ui/button";

export default function AppLayout() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex bg-background text-foreground">
      <Sidebar isOpen={isMobileMenuOpen} onMenuToggle={toggleMenu} />
      {/* Backdrop for mobile menu with transition */}
      <div
        className={`
          fixed inset-0 bg-black/50 lg:hidden z-40
          transition-opacity duration-300 ease-out
          ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />
      <div className="flex flex-col flex-1">
        <Nav onMenuToggle={toggleMenu} />
        <main
          className="flex-1 p-4 overflow-auto"
          onClick={() => isMobileMenuOpen && setIsMobileMenuOpen(false)}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
