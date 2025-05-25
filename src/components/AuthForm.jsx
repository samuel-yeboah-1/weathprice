import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { authService } from "@/services/auth.service";
import { useAuthContext } from "@/contexts/AuthContext";

function AuthForm({ className = "" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthContext();

  const isSignIn = location.pathname === "/auth/signin";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    ...(isSignIn ? {} : { name: "" }),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSwitchMode = () => {
    const nextPath = isSignIn ? "/auth/signup" : "/auth/signin";
    navigate(nextPath);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setErrorMessage("");

    try {
      const user = isSignIn
        ? await authService.signIn(formData)
        : await authService.signUp(formData);

      login(user);
      navigate("/");
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${className}`}>
      <Card className="w-[350px] md:w-[500px] relative">
        <CardHeader>
          <CardTitle>{isSignIn ? "Sign In" : "Sign Up"}</CardTitle>
          <CardDescription>
            {isSignIn
              ? "Welcome back to WeathPrice! Please sign in to continue"
              : "Create a new account to start using WeathPrice"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              {!isSignIn && (
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              {error && (
                <div>
                  {" "}
                  <p className="text-red-500">{errorMessage}</p>
                </div>
              )}
              <div className="flex flex-col space-y-1.5">
                <Button type="submit" disabled={loading}>
                  {loading
                    ? isSignIn
                      ? "Signing in..."
                      : "Signing up..."
                    : isSignIn
                    ? "Sign In"
                    : "Sign Up"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <div className="flex flex-row gap-2">
            <span>
              {isSignIn ? "Don't have an account?" : "Already have an account?"}
            </span>
            <button
              onClick={handleSwitchMode}
              className="text-blue-500 hover:text-blue-700 transition-colors"
            >
              {isSignIn ? "Sign up" : "Sign in"}
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default AuthForm;
