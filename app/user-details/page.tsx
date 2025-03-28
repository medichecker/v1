"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";
import { supabase } from "@/src/supabaseClient";

export default function UserDetailsPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfService, setDateOfService] = useState("");
  const [billAmount, setBillAmount] = useState("");
  const [billConcerns, setBillConcerns] = useState("");
  const [visitType, setVisitType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [savedVisitData, setSavedVisitData] = useState<any>(null);
  const router = useRouter();

  // Check if user is authenticated and retrieve user ID
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      
      if (data?.user) {
        setUserId(data.user.id);
      } else {
        // Redirect to login if not authenticated
        router.push("/google-signup");
      }
    };
    
    getUser();
  }, [router]);

  // Retrieve medical bill data from localStorage
  useEffect(() => {
    try {
      const visitDataJson = localStorage.getItem("veyra_visit_data");
      if (visitDataJson) {
        const visitData = JSON.parse(visitDataJson);
        setSavedVisitData(visitData);
      }
    } catch (error) {
      console.error("Error parsing saved visit data:", error);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!userId) {
      setError("User not authenticated. Please log in again.");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {

        // Retrieve user's email from auth.users table
        const { data, error: userError } = await supabase.auth.getUser();
        const userEmail = data?.user?.email;

        if (userError) throw userError;


        // 1. Insert user details
        const { error: userDetailsError } = await supabase
          .from("profiles")
          .upsert({
            id: userId,
            first_name: firstName,
            last_name: lastName,
            email: userEmail, // Store email in profiles table
            phone_number: phoneNumber
            
          });

      if (userDetailsError) throw userDetailsError;
      const visit_id = localStorage.getItem('visit_id');
      console.log(visit_id);
      const { error: visitError } = await supabase
          .from("medical_visits")
          .update({
            hospital_visit_type: visitType,
            service_date: dateOfService || null,
            bill_amount: billAmount ? parseFloat(billAmount) : null,
            bill_concerns: billConcerns,
            healthcare_provider: localStorage.getItem('hospital') || "",
            city: localStorage.getItem('city') || "",
            state: localStorage.getItem('state') || ""
          }).eq('id', visit_id);

      // 2. Insert medical visit data
      if (savedVisitData) {
        
        if (visitError) throw visitError;

        // 3. Insert insurance details
        if (savedVisitData.insuranceProvider) {
          const { error: insuranceError } = await supabase
            .from("insurance_details")
            .insert({
              user_id: userId,
              insurance_type: "primary", // Default value
              insurance_provider: savedVisitData.insuranceProvider
            });

          if (insuranceError) throw insuranceError;
        }
      }

      // Clear stored data after successful submission
      localStorage.removeItem("veyra_visit_data");
      
      // Redirect to dashboard or profile page
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Error saving user details:", err);
      setError(err.message || "An error occurred while saving your information");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="container mx-auto py-6 flex justify-center">
        <Link href="/" className="flex items-center gap-2">
          <ShieldCheck className="h-8 w-8 text-black-600 stroke-current fill-none" />
          <h1 className="text-2xl font-bold text-black-600">veyra</h1>
        </Link>
      </header>

      <main className="container mx-auto py-6 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg border-black-100">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-black-600">Complete Your Profile</CardTitle>
              <CardDescription className="text-center">
                Please provide some additional information so we can better help you with your medical bills.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              {savedVisitData && (
                <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-100">
                  <h3 className="font-medium text-black-600 mb-2">Bill Information Retrieved</h3>
                  <p className="text-sm text-black-600">
                    We found your previously entered information for a bill from{" "}
                    <span className="font-medium">{savedVisitData.hospital}</span> in{" "}
                    <span className="font-medium">{savedVisitData.city}, {savedVisitData.state}</span>.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-black-600 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full p-2 border border-black-200 rounded-md focus:ring-black-500 focus:border-black-500 text-black-600"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-black-600 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full p-2 border border-black-200 rounded-md focus:ring-black-500 focus:border-black-500 text-black-600"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-black-600 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full p-2 border border-black-200 rounded-md focus:ring-black-500 focus:border-black-500 text-black-600"
                    required
                  />
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-medium text-lg text-black-600 mb-3">Visit Details</h3>
                  
                  <div>
                    <label htmlFor="visitType" className="block text-sm font-medium text-black-600 mb-1">
                      Visit Type
                    </label>
                    <select
                      id="visitType"
                      value={visitType}
                      onChange={(e) => setVisitType(e.target.value)}
                      className="w-full p-2 border border-black-200 rounded-md focus:ring-black-500 focus:border-black-500 text-black-600"
                      required
                    >
                      <option value="">Select Visit Type</option>
                      <option value="emergency">Emergency</option>
                      <option value="inpatient">Inpatient</option>
                      <option value="outpatient">Outpatient</option>
                      <option value="specialist">Specialist Visit</option>
                      <option value="primary-care">Primary Care</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label htmlFor="dateOfService" className="block text-sm font-medium text-black-600 mb-1">
                        Date of Service
                      </label>
                      <input
                        type="date"
                        id="dateOfService"
                        value={dateOfService}
                        onChange={(e) => setDateOfService(e.target.value)}
                        className="w-full p-2 border border-black-200 rounded-md focus:ring-black-500 focus:border-black-500 text-black-600"
                      />
                    </div>
                    <div>
                      <label htmlFor="billAmount" className="block text-sm font-medium text-black-600 mb-1">
                        Bill Amount ($)
                      </label>
                      <input
                        type="number"
                        id="billAmount"
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        value={billAmount}
                        onChange={(e) => setBillAmount(e.target.value)}
                        className="w-full p-2 border border-black-200 rounded-md focus:ring-black-500 focus:border-black-500 text-black-600"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label htmlFor="billConcerns" className="block text-sm font-medium text-black-600 mb-1">
                      Specific Concerns About Your Bill
                    </label>
                    <textarea
                      id="billConcerns"
                      rows={3}
                      placeholder="Please describe any specific concerns you have about your bill"
                      value={billConcerns}
                      onChange={(e) => setBillConcerns(e.target.value)}
                      className="w-full p-2 border border-black-200 rounded-md focus:ring-black-500 focus:border-black-500 text-black-600"
                    ></textarea>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button 
                    type="submit" 
                    className="bg-black hover:bg-black-700 px-6" 
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save & Continue"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
