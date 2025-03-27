"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";
import { supabase } from "@/src/supabaseClient";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasVisitData, setHasVisitData] = useState(false);
  const router = useRouter();

  // Check if we have medical data in localStorage
  useEffect(() => {
    const visitData = localStorage.getItem('veyra_visit_data');
    setHasVisitData(!!visitData);
    console.log("Existing visit data:", visitData ? "Found" : "None");
  }, []);

  const handleNormalSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const { data, error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/get-started`
        }
      });

      if (signupError) {
        console.error("Error signing up:", signupError.message);
        setError(signupError.message);
        return;
      }

      // Redirect to /get-started after successful sign-up
      router.push("/get-started");
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    setError("");
    
    try {
      const { data, error: signupError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/get-started`
        }
      });

      if (signupError) {
        console.error("Error signing up with Google:", signupError.message);
        setError(signupError.message);
        return;
      }
      
      // No need to redirect here as Supabase OAuth handles it
      // The redirectTo option will send the user to /get-started after Google auth
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <header className="container mx-auto py-6 flex justify-center">
        <Link href="/" className="flex items-center gap-2">
          <ShieldCheck className="h-8 w-8 text-black-600 stroke-current fill-none" />
          <h1 className="text-2xl font-bold text-black-600">veyra</h1>
        </Link>
      </header>

      <main className="flex items-center justify-center p-4 w-full">
        <Card className="w-full max-w-md shadow-lg border-black-100 rounded-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-xl font-bold text-black-600">Welcome to veyra</CardTitle>
            <CardDescription className="text-black-500">Sign up to create your account</CardDescription>
            
            {hasVisitData && (
              <div className="mt-2 bg-blue-50 p-3 rounded border border-blue-200 text-sm text-black-600">
                We've saved your bill information. Complete signup to continue with your analysis.
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Error message display */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            
            {/* Normal Sign-Up Form */}
            <form id="normal-signup-form" onSubmit={handleNormalSignup} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-black-600 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-black-200 rounded-md focus:ring-black-500 focus:border-black-500 text-black-600"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-black-600 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-black-200 rounded-md focus:ring-black-500 focus:border-black-500 text-black-600"
                  required
                />
              </div>
              <Button 
                type="submit" 
                form="normal-signup-form" 
                className="w-full bg-black hover:bg-black-700"
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign Up"}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <span className="absolute bg-white px-2 text-sm text-gray-500">OR</span>
              <hr className="w-full border-gray-300" />
            </div>

            {/* Google Sign-Up */}
            <Button
              onClick={handleGoogleSignup}
              className="w-full bg-black hover:bg-black-700 flex items-center justify-center gap-2"
              disabled={loading}
            >
              {/* Embedded Google Logo */}
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              {loading ? "Connecting..." : "Continue with Google"}
            </Button>

            {/* Terms and Privacy */}
            <p className="text-sm text-gray-500 text-center max-w-xs mx-auto">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-4">
            {/* Login Link */}
            <p className="text-sm text-black-600">
              Already have an account?{" "}
              <Link href="/login" className="text-black-600 hover:underline font-medium">
                Log in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}