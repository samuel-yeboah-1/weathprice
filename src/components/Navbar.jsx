import React from "react";
import { useLocation, Link, useNavigate } from "react-router";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { ModeToggle } from "./ui/mode-toggle";
import { useAuthContext } from "@/contexts/AuthContext";

function Nav({ onMenuToggle }) {
  const { auth, logout } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

    const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinks = [
    { path: "/weather", label: "Weather" },
    { path: "/prices", label: "Prices" },
  ];

  const NavLinks = () => (
    <>
      {navLinks.map(({ path, label }) => (
        <Link
          key={path}
          to={path}
          className={cn(
            "text-sm transition-colors hover:text-primary",
            location.pathname === path
              ? "text-primary font-medium"
              : "text-muted-foreground"
          )}
        >
          {label}
        </Link>
      ))}
    </>
  );

  const AuthSection = () => (
    <>
      {auth ? (
        <div className="flex items-center gap-4">
          <span className="text-sm">
            Welcome, {auth.username || auth.email}
          </span>
          <Button variant="secondary" size="sm" onClick={handleLogout}>
            Sign Out
          </Button>
        </div>
      ) : (
        <Button
          variant="secondary"
          size="sm"
          onClick={() => navigate("/auth/signin")}
        >
          Sign In
        </Button>
      )}
    </>
  );

  return (
    <header className="h-16 bg-background border-b flex items-center justify-between gap-4 px-4">
      <div className="flex items-center justify-between gap-8 w-full">
        <div className="flex items-center  gap-4">
          <h1 className="text-lg font-bold pl-2">WeathPrice Dashboard</h1>
        </div>

        <div className="flex flex-row gap-4">
          <div className="md:hidden">
            <ModeToggle />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onMenuToggle}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        <nav className="hidden md:flex items-center gap-4">
          <NavLinks />
          <ModeToggle />
        </nav>
      </div>
      <div className="hidden md:flex">
        <AuthSection />
      </div>
    </header>
  );
}

export default Nav;
