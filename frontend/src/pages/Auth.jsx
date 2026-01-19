import { useState } from "react";
import Signin from "./Signin";
import Signup from "./Signup";

function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignupSuccess = () => {
    setSuccessMessage("Account created successfully. Please sign in.");
    setIsSignUp(false);
  };

  const toggleMode = () => {
    setSuccessMessage("");
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="min-h-screen flex items-center justify-center
      bg-linear-to-br from-[#0B1220] via-[#0F172A] to-[#020617] px-4">

      <div className="relative w-full max-w-5xl h-720px
        bg-white rounded-3xl shadow-2xl overflow-hidden">

        <div className="flex h-full">

          {/* SIGN IN COLUMN */}
          <div
            className={`w-1/2 h-full transition-all duration-700
              ${isSignUp ? "opacity-0 pointer-events-none" : "opacity-100"}
            `}
          >
            <div className="h-full flex flex-col items-center justify-center pt-16">
              {successMessage && (
                <div className="mb-6 w-[320px] px-4 py-3 rounded-lg
                  bg-green-100 text-green-800 text-sm border border-green-300 text-center">
                  {successMessage}
                </div>
              )}
              <Signin />
            </div>
          </div>

          {/* SIGN UP COLUMN */}
          <div
            className={`w-1/2 h-full transition-all duration-700
              ${isSignUp ? "opacity-100" : "opacity-0 pointer-events-none"}
            `}
          >
            <div className="h-full flex flex-col items-center justify-start pt-12 pb-8">
              <Signup onSignupSuccess={handleSignupSuccess} />
            </div>
          </div>

          {/* OVERLAY PANEL */}
          <div
            className={`absolute top-0 right-0 w-1/2 h-full
              bg-linear-to-br from-[#0A2540] via-[#0B3A6E] to-[#1E40AF]
              text-white flex items-center justify-center
              transition-transform duration-700
              ${isSignUp ? "-translate-x-full" : ""}
            `}
          >
            <div className="text-center px-12">
              <h2 className="text-4xl font-bold mb-4">
                {isSignUp ? "Welcome Back!" : "Hello, Friend!"}
              </h2>

              <p className="text-blue-100 mb-10 leading-relaxed">
                {isSignUp
                  ? "Already have an account? Sign in to continue"
                  : "Create an account and start sending money securely"}
              </p>

              <button
                onClick={toggleMode}
                className="border border-white px-8 py-3 rounded-full
                  hover:bg-white hover:text-[#0A2540]
                  transition font-semibold tracking-wide"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Auth;
