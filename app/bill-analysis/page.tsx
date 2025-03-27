"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShieldCheck, ArrowRight } from "lucide-react"

export default function BillAnalysis() {
  const analysisResults = [
    {
      service: "X-Ray",
      charged: 500,
      correct: 250,
      savings: 250,
    },
    {
      service: "Blood Test",
      charged: 300,
      correct: 150,
      savings: 150,
    },
    {
      service: "Consultation",
      charged: 200,
      correct: 200,
      savings: 0,
    },
    {
      service: "MRI Scan",
      charged: 1500,
      correct: 1000,
      savings: 500,
    },
    {
      service: "Emergency Room Fee",
      charged: 800,
      correct: 600,
      savings: 200,
    },
  ]

  const totalSavings = analysisResults.reduce((sum, item) => sum + item.savings, 0)

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="container mx-auto py-6">
        <Link href="/" className="flex items-center gap-2">
          <ShieldCheck className="h-8 w-8 text-black-600 stroke-current fill-none" />
          <h1 className="text-2xl font-bold text-black-600">veyra</h1>
        </Link>
      </header>

      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-lg border-teal-100">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-center mb-8 text-black-600">Your Bill Analysis Results</h2>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-black-600">Itemized Expenses:</h3>
                <div className="space-y-3">
                  {analysisResults.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-lg flex items-center justify-between border border-teal-100"
                    >
                      <div className="font-medium text-black-600">{item.service}</div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-red-500">${item.charged}</div>
                          <div className="text-black-600">${item.correct}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold mb-2 text-black-600">Total Savings</h3>
                <div className="text-5xl font-bold text-black-600">${totalSavings.toFixed(2)}</div>
              </div>

              <div className="bg-teal-50 p-6 rounded-lg mb-8 border border-teal-100">
                <h3 className="text-lg font-semibold mb-2 text-black-600">What Happens Next?</h3>
                <p className="text-black-600 mb-4">
                  Our team of experts will now begin the negotiation process with your healthcare provider to reduce
                  your bill based on our findings. This typically takes 2-3 weeks.
                </p>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-start">
                    <div className="bg-teal-200 p-1 rounded-full mr-2 mt-1">
                      <svg className="h-3 w-3 text-black-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-black-600">We'll contact your healthcare provider</span>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-teal-200 p-1 rounded-full mr-2 mt-1">
                      <svg className="h-3 w-3 text-black-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-black-600">Present our findings and negotiate a reduction</span>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-teal-200 p-1 rounded-full mr-2 mt-1">
                      <svg className="h-3 w-3 text-black-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-black-600">Keep you updated throughout the process</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button asChild className="bg-teal-600 hover:bg-teal-700">
                  <Link href="/dashboard">
                    Continue to Dashboard <ArrowRight className="ml-2 h-4 w-4 stroke-current fill-none" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

