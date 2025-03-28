"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { FileText, ExternalLink, X, ShieldCheck } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { supabase } from "@/src/supabaseClient.ts"
export default function Dashboard() {
  //const [showBillDetails, setShowBillDetails] = useState(false)
  //const [showLegalDetails, setShowLegalDetails] = useState(false)
  const [analysisResults, setAnalysisResults] = useState([]);
  const [showBillDetails, setShowBillDetails] = useState(false);
  const [showLegalDetails, setShowLegalDetails] = useState(false);

  useEffect(() => {
    async function fetchMedicalVisitsAndBillDetails() {
      // Retrieve the current user's ID
      const { data: { user } } = await supabase.auth.getUser();
      const userId = user.id;

      // Query the latest medical visit for the current user
      const { data: latestVisit, error: visitError } = await supabase
        .from('medical_visits')
        .select('*')
        .eq('user_id', userId)
        .order('service_date', { ascending: false })
        .limit(1);

      if (visitError) {
        console.error('Error fetching latest visit:', visitError);
        return;
      }

      if (!latestVisit || latestVisit.length === 0) {
        console.log('No visits found for the user.');
        return;
      }

      const latestVisitId = latestVisit[0].id;

      // Fetch the corresponding bill details
      const { data: billDetails, error: billError } = await supabase
        .from('bill_details')
        .select('*')
        .eq('visit_id', latestVisitId);

      if (billError) {
        console.error('Error fetching bill details:', billError);
        return;
      }

      if (!billDetails || billDetails.length === 0) {
        console.log('No bill details found for the latest visit.');
        return;
      }

      // Format the data into analysisResults
      const formattedData = billDetails.map((bill) => ({
        service: bill.procedure_name, // Assuming service_name exists in medical_visits table
        charged: Math.round(bill.cost * 100) / 100, // Assuming charged_amount exists in bill_details table
        correct: Math.round(bill.actual_cost * 100) / 100, // Assuming correct_amount exists in bill_details table
        savings: Math.round((bill.cost - bill.actual_cost) * 100) / 100,
      }));

      setAnalysisResults(formattedData);
    }

    fetchMedicalVisitsAndBillDetails();
  }, []);
  /*
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
      service: "MRI Scan",
      charged: 1500,
      correct: 1000,
      savings: 500,
    },
    // Additional items to demonstrate scrolling
    {
      service: "Lab Tests",
      charged: 400,
      correct: 250,
      savings: 150,
    },
    {
      service: "Consultation",
      charged: 350,
      correct: 200,
      savings: 150,
    },
  ]
  */
  const totalSavings = analysisResults.reduce((sum, item) => sum + item.savings, 0)
  const savedPercentage = 45 // Mock progress percentage
  const daysRemaining = 14 // Estimated days until case resolution
  const currentStage = "Negotiating charges with hospital billing department" // Current stage of process

  const legalAnalysis = [
    {
      law: "Hospital Price Transparency Rule",
      description:
        "This federal rule requires hospitals to provide clear, accessible pricing information online about the items and services they provide.",
      relevance: "The hospital may have failed to disclose the standard charges for the services you received.",
    },
    {
      law: "No Surprises Act",
      description:
        "Protects patients from surprise medical bills when they receive emergency services or certain services at in-network facilities.",
      relevance: "You may have been billed for out-of-network services without proper notification.",
    },
    {
      law: "State Medical Billing Regulations",
      description: "Many states have laws that protect patients from unfair billing practices.",
      relevance: "Your state may have specific protections regarding the billing practices identified in your case.",
    },
    // Additional item to demonstrate scrolling
    {
      law: "Medical Debt Protection Act",
      description: "Protects consumers from aggressive medical debt collection practices and ensures fair billing.",
      relevance: "You may be eligible for protections against certain collection actions related to your medical debt.",
    },
  ]

  const totalLegalIssues = legalAnalysis.length

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Use the imported Sidebar component */}
      <Sidebar currentPath="/dashboard" />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Main content */}
        <main className="flex-1 p-6">
          {/* Large savings banner */}
          <div className="mb-8 w-full mt-8">
            <div className="p-8">
              <div className="flex items-baseline justify-center mb-8">
                <p className="text-lg text-gray-600 mr-2">You could save up to</p>
                <h2 className="text-8xl font-bold text-teal-600">${totalSavings}</h2>
              </div>

              <div className="max-w-xl mx-auto">
                {/* Progress bar - smaller size */}
                <div className="w-full border border-gray-300 rounded-full h-2 mb-1 bg-white">
                  <div
                    className="bg-teal-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${savedPercentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <p></p>
                  <p>~{daysRemaining} days remaining</p>
                </div>

                {/* Current stage explanation - single line */}
                <div className="bg-gray-50 p-3 rounded-lg text-center mb-2">
                  <p className="text-gray-700 font-medium">
                    Currently: <span className="text-gray-600">{currentStage}</span>{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Analysis sections side by side */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Bill Results */}
            <div className="flex-1 bg-white p-6 rounded-xl shadow-lg flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-teal-600" />
                  Bill Results
                </h2>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-gray-700 bg-gray-100 hover:bg-gray-200"
                  onClick={() => setShowBillDetails(true)}
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  View Details
                </Button>
              </div>
              <div className="overflow-y-auto max-h-64 mb-4">
                <div className="space-y-4">
                  {analysisResults.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 p-4 rounded-lg flex items-center justify-between hover:bg-gray-100 transition-all duration-200 hover:shadow-md cursor-pointer"
                    >
                      <div className="font-medium text-gray-800">{item.service}</div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-red-500 line-through text-sm">${item.charged}</div>
                          <div className="text-teal-600 font-bold">${item.correct}</div>
                        </div>
                        <div className="bg-teal-100 text-teal-800 px-2 py-1 rounded text-sm font-medium">
                          Save ${item.savings}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-auto pt-4 border-t border-gray-200 flex justify-between items-center bg-white">
                <span className="font-medium text-gray-700">Total Potential Savings:</span>
                <span className="text-xl font-bold text-teal-600">${totalSavings}</span>
              </div>
            </div>

            {/* Legal Issues */}
            {/* <div className="flex-1 bg-white p-6 rounded-xl shadow-lg flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <ShieldCheck className="h-5 w-5 mr-2 text-teal-600" />
                  Potential Legal Issues
                </h2>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-gray-700 bg-gray-100 hover:bg-gray-200"
                  onClick={() => setShowLegalDetails(true)}
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  View Details
                </Button>
              </div>
              <div className="overflow-y-auto max-h-64 mb-4">
                <div className="space-y-4">
                  {legalAnalysis.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:shadow-md cursor-pointer"
                    >
                      <h3 className="font-medium text-gray-800 mb-1">{item.law}</h3>
                      <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                      <div className="bg-white p-3 rounded-md border-l-4 border-teal-500 text-sm shadow-sm">
                        <span className="font-medium text-gray-700">Relevance: </span>
                        <span className="text-gray-600">{item.relevance}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-auto pt-4 border-t border-gray-200 flex justify-between items-center bg-white">
                <span className="font-medium text-gray-700">Total Legal Issues:</span>
                <span className="text-xl font-bold text-teal-600">{totalLegalIssues}</span>
              </div>
            </div> */}
          </div>
        </main>
      </div>

      {/* Bill Details Popup */}
      {showBillDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[80vh] flex flex-col animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-teal-600" />
                Bill Details
              </h2>
              <Button size="icon" variant="ghost" className="rounded-full" onClick={() => setShowBillDetails(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="overflow-y-auto flex-1 p-6">
              {analysisResults.map((item, index) => (
                <div key={index} className="bg-gray-50 p-6 mb-4 rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-medium text-gray-800">{item.service}</h3>
                    <div className="bg-teal-100 text-teal-800 px-3 py-1 rounded font-medium">Save ${item.savings}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-white p-4 rounded-md shadow-sm">
                      <p className="text-gray-500 text-sm mb-1">Charged Amount</p>
                      <p className="text-red-500 font-bold text-lg line-through">${item.charged}</p>
                    </div>
                    <div className="bg-white p-4 rounded-md shadow-sm">
                      <p className="text-gray-500 text-sm mb-1">Correct Amount</p>
                      <p className="text-teal-600 font-bold text-lg">${item.correct}</p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-md shadow-sm">
                    <p className="text-gray-500 text-sm mb-1">Explanation</p>
                    <p className="text-gray-700">
                      Our analysis shows that the standard rate for this service is lower than what you were charged.
                      We've identified a ${item.savings} overcharge based on fair market rates and insurance agreements.
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-between items-center">
              <span className="font-medium text-gray-700">Total Potential Savings:</span>
              <span className="text-xl font-bold text-teal-600">${totalSavings}</span>
            </div>
          </div>
        </div>
      )}

      {/* Legal Details Popup */}
      {showLegalDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[80vh] flex flex-col animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <ShieldCheck className="h-5 w-5 mr-2 text-teal-600" />
                Legal Issues Analysis
              </h2>
              <Button size="icon" variant="ghost" className="rounded-full" onClick={() => setShowLegalDetails(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="overflow-y-auto flex-1 p-6">
              {legalAnalysis.map((item, index) => (
                <div key={index} className="bg-gray-50 p-6 mb-4 rounded-lg">
                  <h3 className="text-xl font-medium text-gray-800 mb-3">{item.law}</h3>

                  <div className="bg-white p-4 rounded-md shadow-sm mb-3">
                    <p className="text-gray-500 text-sm mb-1">Description</p>
                    <p className="text-gray-700">{item.description}</p>
                  </div>

                  <div className="bg-white p-4 rounded-md shadow-sm border-l-4 border-teal-500">
                    <p className="text-gray-500 text-sm mb-1">How This Applies To Your Case</p>
                    <p className="text-gray-700">{item.relevance}</p>
                  </div>

                  <div className="bg-white p-4 rounded-md shadow-sm mt-3">
                    <p className="text-gray-500 text-sm mb-1">Potential Action</p>
                    <p className="text-gray-700">
                      Our legal team can help you address this issue by preparing appropriate documentation and
                      communicating with the healthcare provider to ensure compliance with this regulation.
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-between items-center">
              <span className="font-medium text-gray-700">Total Legal Issues:</span>
              <span className="text-xl font-bold text-teal-600">{totalLegalIssues}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

