import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import { signUpSchema } from "../schemas/SignUpSchema";
import * as z from "zod";
import AuthImagePattern from "../components/AuthImagePattern";

const fieldClassName =
  "flex items-center gap-3 rounded-xl border border-base-300/70 bg-base-100/40 px-3 transition-colors duration-200 focus-within:border-primary/30 focus-within:ring-1 focus-within:ring-white";

const inputClassName =
  "w-full bg-transparent py-3 text-white placeholder:text-base-content/50 focus:outline-none";

const SignUp = () => {
  const { isSigningUp, signUp } = useAuthStore();
  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!signUpValidation(formData)) return;
    signUp(formData);
  };

  const signUpValidation = (data) => {
    const result = signUpSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors = z.treeifyError(result.error);
      setError({
        name: fieldErrors?.properties?.name?.errors?.[0],
        password: fieldErrors?.properties?.password?.errors?.[0],
        email: fieldErrors?.properties?.email?.errors?.[0],
      });
      return false;
    }
    setError({});
    return true;
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mt-2">Create Account</h2>
              <p className="text-base-content/60">
                Get Started with your free account
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label mb-1">
                <span className="label-text font-medium">Name</span>
              </label>
              <div className={fieldClassName}>
                <User className="size-5 shrink-0 text-white" />
                <input
                  type="text"
                  name="name"
                  className={inputClassName}
                  placeholder="John Doe"
                  value={formData.name || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              {error.name && (
                <p className="text-red-400 text-sm mt-1">{error.name}</p>
              )}
            </div>

            <div className="form-control">
              <label className="label mb-1">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className={fieldClassName}>
                <Mail className="size-5 shrink-0 text-white" />
                <input
                  type="email"
                  name="email"
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
                  name="password"
                  className={inputClassName}
                  placeholder="........"
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
              {error.password && (
                <p className="text-red-400 text-sm mt-1">{error.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* right side */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};

export default SignUp;
