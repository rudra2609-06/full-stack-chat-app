import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import * as z from "zod";
import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import { LoginSchema } from "../schemas/LoginSchema";

const inputClassName =
  "w-full bg-transparent py-3 text-white placeholder:text-base-content/50 focus:outline-none";

const fieldClassName =
  "flex items-center gap-3 rounded-xl border border-base-300/70 bg-base-100/40 px-3 transition-colors duration-200 focus-within:border-primary/30 focus-within:ring-1 focus-within:ring-white";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});

  const { isLogingIn, login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loginValidation(formData)) return;
    login({formData,navigate});
  };

  const loginValidation = (data) => {
    const result = LoginSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors = z.treeifyError(result.error);
      setError({
        email: fieldErrors?.properties?.email?.errors?.[0],
        password: fieldErrors?.properties?.password?.errors?.[0],
      });
      return false;
    }
    return true;
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mt-2">Welcome Back</h2>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label mb-1">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className={fieldClassName}>
                <Mail className="size-5 shrink-0 text-white" />
                <input
                  type="email"
                  className={inputClassName}
                  placeholder="you@example.com"
                  value={formData.email || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              {error.email && (
                <p className="text-red-400 text-sm mt-1">{error.email}</p>
              )}
            </div>

            <div className="form-control">
              <label className="label mb-1">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className={fieldClassName}>
                <Lock className="size-5 shrink-0 text-white" />
                <input
                  type={showPassword ? "text" : "password"}
                  className={inputClassName}
                  placeholder="••••••••"
                  value={formData.password || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="shrink-0 text-white/90"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
              {error.email && (
                <span className="text-red-600 mt-1 text-sm">{error.email}</span>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLogingIn}
            >
              {isLogingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Log in"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="link link-primary">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <AuthImagePattern
        title={"Welcome back!"}
        subtitle={
          "Login in to continue your conversations and catch up with your messages."
        }
      />
    </div>
  );
};

export default Login;
