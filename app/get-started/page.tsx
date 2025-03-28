// get-started
"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShieldCheck, Upload, Search, DollarSign, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { states } from "@/lib/states"
import { supabase } from './supabaseClient';

const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (user) {
    console.log(user.id); // This is the user's UID
  }
};
export default function GetStarted() {
  const [currentStep, setCurrentStep] = useState(1)

  const steps = [
    {
      id: 1,
      title: "Upload Medical Bill",
      description: "Upload your bill",
      icon: Upload,
      content: <UploadBillStep onNext={() => setCurrentStep(2)} />,
    },
    {
      id: 2,
      title: "Scan Bill",
      description: "We analyze your bill",
      icon: Search,
      content: <ScanBillStep onNext={() => setCurrentStep(3)} />,
    },
    {
      id: 3,
      title: "Save Money",
      description: "See your savings",
      icon: DollarSign,
      content: <SaveMoneyStep />,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <header className="container mx-auto py-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <ShieldCheck className="h-8 w-8 text-black-600 stroke-current fill-none" />
          <h1 className="text-2xl font-bold text-black-600">veyra</h1>
        </Link>
      </header>

      <main className="container mx-auto py-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between mb-12">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex border-black border items-center justify-center mb-2",
                    currentStep >= step.id ? "bg-black text-white" : "text-black-500",
                  )}
                >
                  <step.icon className="h-6 w-6 stroke-current fill-none" />
                </div>
                <div className="text-center">
                  <p className={cn("font-medium", currentStep >= step.id ? "text-black-600" : "text-black-500")}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500 max-w-[120px] mx-auto">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {steps.find((step) => step.id === currentStep)?.content}
        </div>
      </main>
    </div>
  )
}

// function UploadBillStep({ onNext }: { onNext: () => void }) {
//   const [isDragging, setIsDragging] = useState(false)
//   const [file, setFile] = useState<File | null>(null)

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault()
//     setIsDragging(true)
//   }

//   const handleDragLeave = () => {
//     setIsDragging(false)
//   }

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault()
//     setIsDragging(false)

//     if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
//       setFile(e.dataTransfer.files[0])
//     }
//   }

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setFile(e.target.files[0])
//     }
//   }

//   return (
//     <Card className="shadow-lg border-black">
//       <CardContent className="p-8">
//         <h2 className="text-2xl font-bold text-center mb-6 text-black-600">Upload Your Medical Bill</h2>

//         <div
//           className={cn(
//             "border-2 border-dashed rounded-lg p-8 text-center mb-6 transition-colors",
//             isDragging ? "border-black-600 bg-black-50" : "border-black-400",
//             file ? "border-black" : "",
//           )}
//           onDragOver={handleDragOver}
//           onDragLeave={handleDragLeave}
//           onDrop={handleDrop}
//         >
//           {file ? (
//             <div className="flex flex-col items-center">
//               <div className="bg-black-100 p-3 rounded-full mb-3">
//                 <Upload className="h-6 w-6 text-black-600 stroke-current fill-none" />
//               </div>
//               <p className="font-medium text-black-600">{file.name}</p>
//               <p className="text-sm text-black-500 mb-3">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => setFile(null)}
//                 className="text-black-600 border-black-200"
//               >
//                 Remove
//               </Button>
//             </div>
//           ) : (
//             <>
//               <div className="bg-gray-100 p-3 rounded-full mx-auto mb-3 w-fit">
//                 <Upload className="h-6 w-6 text-black-500 stroke-current fill-none" />
//               </div>
//               <p className="text-black-600 mb-2">Drag and drop your file here, or</p>
//               <div>
//                 <label htmlFor="file-upload" className="cursor-pointer">
//                   <span className="text-black-600 font-medium">Browse files</span>
//                   <input
//                     id="file-upload"
//                     type="file"
//                     className="hidden"
//                     accept=".pdf,.jpg,.jpeg,.png"
//                     onChange={handleFileChange}
//                   />
//                 </label>
//               </div>
//               <p className="text-xs text-black-500 mt-3">Supported formats: PDF, JPG, PNG</p>
//             </>
//           )}
//         </div>

//         <div className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label htmlFor="insurance" className="block text-sm font-medium text-black-600 mb-1">
//                 Insurance Provider
//               </label>
//               <select
//                 id="insurance"
//                 className="w-full p-2 border border-black-200 rounded-md text-black-600"
//                 required
//               >
//                 <option value="">Select Insurance</option>
//                 <option value="aetna">Aetna</option>
//                 <option value="bluecross">Blue Cross Blue Shield</option>
//                 <option value="cigna">Cigna</option>
//                 <option value="humana">Humana</option>
//                 <option value="kaiser">Kaiser Permanente</option>
//                 <option value="medicare">Medicare</option>
//                 <option value="medicaid">Medicaid</option>
//                 <option value="unitedhealth">UnitedHealthcare</option>
//                 <option value="other">Other</option>
//               </select>
//             </div>
//             <div>
//               <label htmlFor="state" className="block text-sm font-medium text-black-600 mb-1">
//                 State
//               </label>
//               <select
//                 id="state"
//                 className="w-full p-2 border border-black-200 rounded-md focus:ring-black-500 focus:border-black-500 text-black-600"
//               >
//                 <option value="">Select State</option>
//                 {states.map((state) => (
//                   <option key={state.value} value={state.value}>
//                     {state.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//           <div>
//             <label htmlFor="city" className="block text-sm font-medium text-black-600 mb-1">
//               City
//             </label>
//             <input
//               type="text"
//               id="city"
//               placeholder="e.g., Chicago"
//               className="w-full p-2 border border-black-200 rounded-md focus:ring-black-500 focus:border-black-500 text-black-600"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="hospital" className="block text-sm font-medium text-black-600 mb-1">
//               Hospital/Provider
//             </label>
//             <input
//               type="text"
//               id="hospital"
//               placeholder="e.g., Northwestern Memorial Hospital"
//               className="w-full p-2 border border-black-200 rounded-md focus:ring-black-500 focus:border-black-500 text-black-600"
//               required
//             />
//           </div>
//         </div>
        

//         <div className="mt-8 flex justify-between">
//           <Button variant="outline" asChild className="border-black text-black hover:bg-gray-100">
//             <Link href="/no-bill">Don't have a bill yet?</Link>
//           </Button>
//           <Button onClick={onNext} className="bg-black hover:bg-black" disabled={!file}>
//             Continue <ArrowRight className="ml-2 h-4 w-4 stroke-current fill-none" />
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

function UploadBillStep({ onNext }: { onNext: () => void }) {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    insurance: "",
    state: "",
    city: "",
    hospital: ""
  })
  const [showErrors, setShowErrors] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const uploadBill = async () => {
    // Validate form
    setShowErrors(true)
    setUploadError(null)
    
    const isValid = 
      file !== null && 
      formData.insurance !== "" && 
      formData.state !== "" && 
      formData.city.trim() !== "" && 
      formData.hospital.trim() !== ""
    
    if (!isValid) {
      return
    }

    // Prepare form data for upload
    const formDataToSend = new FormData()
    formDataToSend.append('file', file!)
    formDataToSend.append('insurance', formData.insurance)
    formDataToSend.append('city', formData.city)
    formDataToSend.append('state', formData.state)
    formDataToSend.append('hospital_name', formData.hospital)
    
    // Generate a temporary UID (you might want to replace this with a more robust method)
    const uid = localStorage.getItem('user_uid') || `temp_${Date.now()}`
    
    const { data: { user }, error } = await supabase.auth.getUser();
    formDataToSend.append('uid', user.id)
    try {
      setIsLoading(true)
      const response = await fetch('https://medichecker.pythonanywhere.com/billanalysis', {
        method: 'POST',
        body: formDataToSend
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const responseData = await response.json()
      
      // Save the response or analysis result to localStorage if needed
      localStorage.setItem('bill_analysis_result', JSON.stringify(responseData))

      // Proceed to next step
      onNext()
    } catch (error) {
      console.error('Upload error:', error)
      setUploadError('Failed to upload bill. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="shadow-lg border-black">
      <CardContent className="p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-black-600">Upload Your Medical Bill</h2>

        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center mb-6 transition-colors",
            isDragging ? "border-black-600 bg-black-50" : "border-black-400",
            file ? "border-black" : "",
            !file && showErrors ? "border-red-500" : ""
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {file ? (
            <div className="flex flex-col items-center">
              <div className="bg-black-100 p-3 rounded-full mb-3">
                <Upload className="h-6 w-6 text-black-600 stroke-current fill-none" />
              </div>
              <p className="font-medium text-black-600">{file.name}</p>
              <p className="text-sm text-black-500 mb-3">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFile(null)}
                className="text-black-600 border-black-200"
              >
                Remove
              </Button>
            </div>
          ) : (
            <>
              <div className="bg-gray-100 p-3 rounded-full mx-auto mb-3 w-fit">
                <Upload className="h-6 w-6 text-black-500 stroke-current fill-none" />
              </div>
              <p className="text-black-600 mb-2">Drag and drop your file here, or</p>
              <div>
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="text-black-600 font-medium">Browse files</span>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              <p className="text-xs text-black-500 mt-3">Supported formats: PDF, JPG, PNG</p>
            </>
          )}
          {!file && showErrors && (
            <p className="text-xs text-red-500 mt-2">Please upload a file</p>
          )}
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="insurance" className="block text-sm font-medium text-black-600 mb-1">
                Insurance Provider <span className="text-red-500">*</span>
              </label>
              <select
                id="insurance"
                className={cn(
                  "w-full p-2 border rounded-md text-black-600",
                  formData.insurance === "" && showErrors ? "border-red-500" : "border-black-200"
                )}
                value={formData.insurance}
                onChange={handleInputChange}
              >
                <option value="">Select Insurance</option>
                <option value="aetna">Aetna</option>
                <option value="bluecross">Blue Cross Blue Shield</option>
                <option value="cigna">Cigna</option>
                <option value="humana">Humana</option>
                <option value="kaiser">Kaiser Permanente</option>
                <option value="medicare">Medicare</option>
                <option value="medicaid">Medicaid</option>
                <option value="unitedhealth">UnitedHealthcare</option>
                <option value="other">Other</option>
              </select>
              {formData.insurance === "" && showErrors && (
                <p className="text-xs text-red-500 mt-1">Insurance provider is required</p>
              )}
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-black-600 mb-1">
                State <span className="text-red-500">*</span>
              </label>
              <select
                id="state"
                className={cn(
                  "w-full p-2 border rounded-md text-black-600",
                  formData.state === "" && showErrors ? "border-red-500" : "border-black-200"
                )}
                value={formData.state}
                onChange={handleInputChange}
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </select>
              {formData.state === "" && showErrors && (
                <p className="text-xs text-red-500 mt-1">State is required</p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-black-600 mb-1">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="city"
              placeholder="e.g., Chicago"
              className={cn(
                "w-full p-2 border rounded-md text-black-600",
                formData.city.trim() === "" && showErrors ? "border-red-500" : "border-black-200"
              )}
              value={formData.city}
              onChange={handleInputChange}
            />
            {formData.city.trim() === "" && showErrors && (
              <p className="text-xs text-red-500 mt-1">City is required</p>
            )}
          </div>
          <div>
            <label htmlFor="hospital" className="block text-sm font-medium text-black-600 mb-1">
              Hospital/Provider <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="hospital"
              placeholder="e.g., Northwestern Memorial Hospital"
              className={cn(
                "w-full p-2 border rounded-md text-black-600",
                formData.hospital.trim() === "" && showErrors ? "border-red-500" : "border-black-200"
              )}
              value={formData.hospital}
              onChange={handleInputChange}
            />
            {formData.hospital.trim() === "" && showErrors && (
              <p className="text-xs text-red-500 mt-1">Hospital/Provider is required</p>
            )}
          </div>
        </div>

        {uploadError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
            {uploadError}
          </div>
        )}
        
        <div className="mt-8 flex justify-between">
          <Button variant="outline" asChild className="border-black text-black hover:bg-gray-100">
            <Link href="/no-bill">Don't have a bill yet?</Link>
          </Button>
          <Button 
            onClick={uploadBill} 
            className="bg-black hover:bg-black"
            disabled={isLoading}
          >
            {isLoading ? "Uploading..." : "Continue"} 
            {!isLoading && <ArrowRight className="ml-2 h-4 w-4 stroke-current fill-none" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function ScanBillStep({ onNext }: { onNext: () => void }) {
  return (
    <Card className="shadow-lg border-black-100">
      <CardContent className="p-8 text-center">
        <div className="max-w-md mx-auto justify-end w-full">
          <div className="bg-black-100 p-4 rounded-full mx-auto mb-6 w-fit">
            <Search className="h-8 w-8 text-black-600 stroke-current fill-none" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-black-600">Scanning Your Bill</h2>
          <p className="text-black-600 mb-8">Our system is analyzing your bill to identify potential overcharges.</p>

          <div className="space-y-6 mb-8">
            <div className="bg-black-50 p-4 rounded-lg border border-black-100">
              <h3 className="font-medium text-black-600 mb-2">What We Look For:</h3>
              <ul className="text-left text-black-600 space-y-2">
                <li className="flex items-start">
                  <span className="bg-black-200 p-1 rounded-full mr-2 mt-1">
                    <svg className="h-3 w-3 text-black-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>Duplicate charges</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-black-200 p-1 rounded-full mr-2 mt-1">
                    <svg className="h-3 w-3 text-black-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>Upcoding</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-black-200 p-1 rounded-full mr-2 mt-1">
                    <svg className="h-3 w-3 text-black-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>Charges for services not received</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-black-200 p-1 rounded-full mr-2 mt-1">
                    <svg className="h-3 w-3 text-black-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>Prices above fair market rates</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={onNext} className="bg-black hover:bg-black-700">
              Continue <ArrowRight className="ml-2 h-4 w-4 stroke-current fill-none" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SaveMoneyStep() {
  return (
    <Card className="shadow-lg border-black-100">
      <CardContent className="p-8 text-center">
        <div className="max-w-md mx-auto">
          <div className="bg-black-100 p-4 rounded-full mx-auto mb-6 w-fit">
            <DollarSign className="h-8 w-8 text-black-600 stroke-current fill-none" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-black-600">We'll Save You Money</h2>
          <p className="text-black-600 mb-8">
            Our experts will negotiate with healthcare providers to reduce your bills.
          </p>

          <div className="bg-black-600 text-white p-6 rounded-lg mb-8">
            <h3 className="font-bold text-xl mb-2">Ready to get started?</h3>
            <p className="mb-4">Create an account to see your potential savings.</p>
            <Button asChild variant="secondary" size="lg" className="w-full">
              <Link href="/user-details">Sign Up Now</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// function SaveMoneyStep() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [hasVisitData, setHasVisitData] = useState(false);
//   const router = useRouter();

//   // Check if we have medical data in localStorage
//   useEffect(() => {
//     const visitData = localStorage.getItem('veyra_visit_data');
//     setHasVisitData(!!visitData);
//     console.log("Existing visit data:", visitData ? "Found" : "None");
//   }, []);

//   const handleNormalSignup = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
    
//     try {
//       const { data, error: signupError } = await supabase.auth.signUp({
//         email,
//         password,
//         options: {
//           emailRedirectTo: `${window.location.origin}/user-details`
//         }
//       });

//       if (signupError) {
//         console.error("Error signing up:", signupError.message);
//         setError(signupError.message);
//         return;
//       }

//       // Redirect to /user-details after successful sign-up
//       router.push("/user-details");
//     } catch (err) {
//       console.error("Unexpected error:", err);
//       setError("An unexpected error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleSignup = async () => {
//     setLoading(true);
//     setError("");
    
//     try {
//       const { data, error: signupError } = await supabase.auth.signInWithOAuth({
//         provider: "google",
//         options: {
//           redirectTo: `${window.location.origin}/user-details`
//         }
//       });

//       if (signupError) {
//         console.error("Error signing up with Google:", signupError.message);
//         setError(signupError.message);
//         return;
//       }
      
//       // No need to redirect here as Supabase OAuth handles it
//     } catch (err) {
//       console.error("Unexpected error:", err);
//       setError("An unexpected error occurred");
//       setLoading(false);
//     }
//   };

//   return (
//     <Card className="shadow-lg border-black-100">
//       <CardContent className="p-8">
//         <div className="max-w-md mx-auto">
//           <div className="bg-black-100 p-4 rounded-full mx-auto mb-6 w-fit">
//             <DollarSign className="h-8 w-8 text-black-600 stroke-current fill-none" />
//           </div>
//           <h2 className="text-2xl font-bold mb-4 text-black-600">Save Money on Your Bill</h2>
//           <p className="text-black-600 mb-6">
//             Create an account to see your potential savings and let our experts negotiate with your healthcare providers.
//           </p>

//           {hasVisitData && (
//             <div className="mb-6 bg-blue-50 p-3 rounded border border-blue-200 text-sm text-black-600">
//               We've saved your bill information. Complete signup to continue with your analysis.
//             </div>
//           )}

//           {/* Error message display */}
//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
//               <span className="block sm:inline">{error}</span>
//             </div>
//           )}
          
//           {/* Normal Sign-Up Form */}
//           <form id="normal-signup-form" onSubmit={handleNormalSignup} className="space-y-4 mb-6">
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-black-600 mb-1">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 placeholder="your@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full p-2 border border-black-200 rounded-md focus:ring-black-500 focus:border-black-500 text-black-600"
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-black-600 mb-1">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full p-2 border border-black-200 rounded-md focus:ring-black-500 focus:border-black-500 text-black-600"
//                 required
//               />
//             </div>
//             <Button 
//               type="submit" 
//               form="normal-signup-form" 
//               className="w-full bg-black hover:bg-black-700"
//               disabled={loading}
//             >
//               {loading ? "Signing up..." : "Sign Up"}
//             </Button>
//           </form>

//           {/* Divider */}
//           <div className="relative flex items-center justify-center mb-6">
//             <span className="absolute bg-white px-2 text-sm text-gray-500">OR</span>
//             <hr className="w-full border-gray-300" />
//           </div>

//           {/* Google Sign-Up */}
//           <Button
//             onClick={handleGoogleSignup}
//             className="w-full bg-black hover:bg-black-700 flex items-center justify-center gap-2 mb-6"
//             disabled={loading}
//           >
//             {/* Embedded Google Logo */}
//             <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
//               <path
//                 d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                 fill="#4285F4"
//               />
//               <path
//                 d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                 fill="#34A853"
//               />
//               <path
//                 d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                 fill="#FBBC05"
//               />
//               <path
//                 d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                 fill="#EA4335"
//               />
//             </svg>
//             {loading ? "Connecting..." : "Continue with Google"}
//           </Button>

//           {/* Terms and Privacy */}
//           <p className="text-sm text-gray-500 text-center max-w-xs mx-auto">
//             By continuing, you agree to our Terms of Service and Privacy Policy.
//           </p>

//           {/* Login Link */}
//           <p className="text-sm text-black-600 text-center mt-6">
//             Already have an account?{" "}
//             <Link href="/login" className="text-black-600 hover:underline font-medium">
//               Log in
//             </Link>
//           </p>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

