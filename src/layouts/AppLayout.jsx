// src/layouts/AppLayout.jsx
import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { useAuthContext } from "@/contexts/AuthContext";
import Sidebar from "../components/Sidebar";
import Nav from "@/components/Navbar";
import { Button } from "@/components/ui/button";
export default function AppLayout() {
  const { auth } = useAuthContext();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex bg-background text-foreground h-screen">
      <Sidebar isOpen={isMobileMenuOpen} onMenuToggle={toggleMenu} />
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
          {auth ? (
            <Outlet />
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <p className="text-lg font-medium">
                You must sign in to view the dashboard
              </p>
              <Button onClick={() => navigate("/auth/signin")}>Sign In</Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
