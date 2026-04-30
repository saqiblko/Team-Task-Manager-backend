import { useState } from "react";
import { Link } from "react-router";
import { loginUser } from "../../Api/auth.js";

import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons/index.js";
import Label from "../form/Label.js";
import Input from "../form/input/InputField.js";
import Checkbox from "../form/input/Checkbox.js";
import Button from "../ui/button/Button.js";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await loginUser({
        email,
        password,
      });

      console.log("Login success:", response.data);

      // token save
      localStorage.setItem("token", response.data.token);

      // redirect
      window.location.href = import.meta.env.BASE_URL;
    } catch (err) {
      console.log(err);

      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="w-full max-w-md pt-10 mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ChevronLeftIcon className="size-5" />
          Back to dashboard
        </Link>
      </div>

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5">
            <h1 className="mb-2 font-semibold text-gray-800 text-2xl">
              Sign In
            </h1>

            <p className="text-sm text-gray-500">
              Enter your email and password to sign in!
            </p>
          </div>

          {/* error message */}

          {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* email */}

              <div>
                <Label>
                  Email <span className="text-red-500">*</span>
                </Label>

                <Input
                  placeholder="info@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* password */}

              <div>
                <Label>
                  Password <span className="text-red-500">*</span>
                </Label>

                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeIcon className="size-5" />
                    ) : (
                      <EyeCloseIcon className="size-5" />
                    )}
                  </span>
                </div>
              </div>

              {/* remember */}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Checkbox checked={isChecked} onChange={setIsChecked} />

                  <span className="text-sm text-gray-700">
                    Keep me logged in
                  </span>
                </div>

                <Link to="/reset-password" className="text-sm text-blue-500">
                  {/* Forgot password? */}
                </Link>
              </div>

              {/* button */}

              <div>
                <Button className="w-full" size="sm" type="submit">
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
              </div>
            </div>
          </form>

          {/* signup */}

          {/* <div className="mt-5">

            <p className="text-sm text-gray-700">

              Don’t have an account?{" "}

              <Link
                to="/signup"
                className="text-blue-500"
              >
                Sign Up
              </Link>

            </p>

          </div> */}
        </div>
      </div>
    </div>
  );
}
