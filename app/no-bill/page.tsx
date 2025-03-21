"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShieldCheck, ArrowLeft } from "lucide-react"
import { supabase } from "@/src/supabaseClient"

export default function NoBillPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const { error } = await supabase
        .from('contacts')
        .insert([{
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone
        }])

      if (error) {
        throw error
      }

      setIsSubmitted(true)
    } catch (err: any) {
      console.error("Submission error:", err)
      setError(err.message || "Failed to submit form. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="container mx-auto py-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <ShieldCheck className="h-8 w-8 text-black-600 stroke-current fill-none" />
          <h1 className="text-2xl font-bold text-black-600">MediChecker</h1>
        </Link>
      </header>

      <main className="container mx-auto py-12">
        <div className="max-w-md mx-auto">
          {!isSubmitted ? (
            <Card className="shadow-lg border-black">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Get Started Without a Bill</CardTitle>
                <CardDescription className="text-center">
                  We'll help you understand your medical costs even if you don't have a bill yet.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {error && (
                  <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        name="lastName" 
                        value={formData.lastName} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      type="tel" 
                      value={formData.phone} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>

                  <div className="pt-4 flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline" 
                      asChild 
                      className="border-black text-black"
                    >
                      <Link href="/get-started">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                      </Link>
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-black hover:bg-black"
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : "Submit"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-lg border-black">
              <CardContent className="p-8 text-center">
                <div className="bg-black-100 p-4 rounded-full mx-auto mb-6 w-fit">
                  <ShieldCheck className="h-8 w-8 text-black-600 stroke-current fill-none" />
                </div>
                <h2 className="text-2xl font-bold mb-4 text-black-600">Thank You!</h2>
                <p className="text-black-600 mb-8">
                  We've received your information and will notify you when we launch our bill-free services.
                </p>
                <Button asChild className="bg-black hover:bg-black">
                  <Link href="/">Return Home</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
