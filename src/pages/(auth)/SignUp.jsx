import React from "react";
import AuthForm from "@/components/AuthForm";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

function SignUp() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-6 items-center justify-center">
      <div className="self-start">
        <Button
          variant="ghost"
          className="text-sm text-muted-foreground hover:text-primary"
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </Button>
      </div>
      <AuthForm />
    </div>
  );
}

export default SignUp;
