"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShieldCheck } from "lucide-react"

export default function Signup() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="container mx-auto py-6">
        <Link href="/" className="flex items-center gap-2">
          <ShieldCheck className="h-8 w-8 text-black-600 stroke-current fill-none" />
          <h1 className="text-2xl font-bold text-black-600">MediChecker</h1>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg border-teal-100">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-black-600">Create an account</CardTitle>
            <CardDescription className="text-center text-black-500">
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Button variant="outline" className="w-full border-teal-200 text-black-600">
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
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                Sign up with Google
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-teal-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-black-500">Or continue with</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name" className="text-black-600">
                  First name
                </Label>
                <Input id="first-name" placeholder="John" className="border-teal-200 text-black-600" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name" className="text-black-600">
                  Last name
                </Label>
                <Input id="last-name" placeholder="Doe" className="border-teal-200 text-black-600" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-black-600">
                Email
              </Label>
              <Input id="email" type="email" placeholder="m@example.com" className="border-teal-200 text-black-600" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-black-600">
                Password
              </Label>
              <Input id="password" type="password" className="border-teal-200 text-black-600" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-black-600">
                Confirm password
              </Label>
              <Input id="confirm-password" type="password" className="border-teal-200 text-black-600" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
              <Link href="/user-details">Continue</Link>
            </Button>
            <p className="mt-4 text-center text-sm text-black-600">
              Already have an account?{" "}
              <Link href="/login" className="text-black-600 hover:underline font-medium">
                Log in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}

