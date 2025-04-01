"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Shield, Lock, FileCheck, ChevronRight, ChevronLeft, Search, Upload, DollarSign, ChevronDown, AlertTriangle, Mail, AlertOctagon, Copy, AlertCircle, ArrowRight, CheckCircle, Bug, Zap } from "lucide-react"
import InteractiveBill from "@/components/interactive-bill"
import { motion } from "framer-motion"
import { ScrollAnimation, ScrollAnimationGroup } from "@/components/scroll-animation"
import { SectionDivider } from "@/components/traveling-lines"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen">
      <motion.header
        className="container mx-auto py-4 md:py-6 flex justify-between items-center px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <Image
             src="/Veyra_Logo_Primary_H_Aura500.png" 
             alt="veyra"
             width={215}
             height={48}
             priority
             className="h-8 md:h-12 w-auto"
            />
          </Link>
        </div>
      </motion.header>

      <main>
        <div className="blob w-[300px] h-[300px] top-[20%] right-[10%] opacity-30"></div>
        <div className="blob w-[400px] h-[400px] top-[50%] left-[5%] opacity-20 animation-delay-2000"></div>
        <div className="blob w-[350px] h-[350px] bottom-[10%] right-[15%] opacity-25 animation-delay-4000"></div>
        
        {/* Hero Section - REDUCED PADDING */}
        <section className="container mx-auto py-4 md:py-8 px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left side - Text and buttons */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -30 }}
              transition={{ duration: 0.7 }}
              className="md:w-5/12 text-left order-2 md:order-1"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black-600 mb-6">
                Never Overpay for Medical Bills Again.
              </h2>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-4 mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Button asChild size="lg" className="bg-teal-600 text-white hover:bg-teal-800 rounded-full px-8">
                  <Link href="/google-signup">Get Started</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-black text-black-600 hover:bg-teal-50 rounded-full px-8"
                >
                  <Link href="/login">Log In</Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Right side - Interactive bill */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 30 }}
              transition={{ duration: 0.7 }}
              className="md:w-7/12 order-1 md:order-2"
            >
              <div className="w-full">
                <InteractiveBill />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Improved Gradient Transition - SHORTER HEIGHT */}
        <div className="w-full h-16 md:h-24 bg-gradient-to-b from-transparent to-white"></div>

        {/* SectionDivider with better positioning and opacity animation */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent"></div>
          <SectionDivider className="relative z-10" />
        </div>

        {/* How It Works Section */}
        <section id="how-it-works" className="relative bg-white pt-8 md:pt-12 pb-12 md:pb-20">
          <div className="container mx-auto px-4">
            <ScrollAnimation animation="fadeInUp" duration={0.7}>
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-black-600">
                How It Works
              </h2>
            </ScrollAnimation>
            
            <ScrollAnimationGroup 
              animation="fadeInUp" 
              staggerDelay={0.15} 
              baseDelay={0.2}
              duration={0.6}
            >
              {(AnimatedItem) => (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  <AnimatedItem>
                    <div className="border border-black rounded-2xl p-4 md:p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                      <div className="bg-white w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 border border-black">
                        <Upload className="h-8 w-8 text-black" />
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold mb-2 text-black-600">Upload Your Bill</h3>
                      <p className="text-sm text-black-700">Upload any medical bill from any U.S. hospital.</p>
                    </div>
                  </AnimatedItem>
                  
                  <AnimatedItem>  
                    <div className="border border-black rounded-2xl p-4 md:p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                      <div className="bg-white w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 border border-black">
                        <Search className="h-8 w-8 text-black" />
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold mb-2 text-black-600">We Analyze</h3>
                      <p className="text-sm text-black-700">Our system finds errors and compares to fair pricing.</p>
                    </div>
                  </AnimatedItem>
                  
                  <AnimatedItem>
                    <div className="border border-black rounded-2xl p-4 md:p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                      <div className="bg-white w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 border border-black">
                        <DollarSign className="h-8 w-8 text-black" />
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold mb-2 text-black-600">Save Money</h3>
                      <p className="text-sm text-black-700">We negotiate with providers to reduce your bill.</p>
                    </div>
                  </AnimatedItem>
                </div>
              )}
            </ScrollAnimationGroup>
          </div>
        </section>

        {/* Add Traveling Lines Divider */}
        <SectionDivider className="my-8" />
  {/* Medical Billing Errors Comparison Section */}
        <section className="container mx-auto py-16 md:py-24 px-4">
          <div className="flex flex-col md:flex-row items-stretch gap-8 max-w-6xl mx-auto">
            {/* Left side - Medical Billing Errors */}
            <div className="flex-1 bg-slate-50 rounded-3xl p-8 relative">
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6 text-red-500" />
                  <h3 className="text-2xl font-bold text-black-600">Medical Billing Errors</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-4 shadow-sm transform rotate-2 hover:rotate-0 transition-transform duration-300 hover:shadow-md">
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-orange-500 mt-1" />
                      <div>
                        <h4 className="font-semibold text-orange-600">Billing Error</h4>
                        <p className="text-black-600/80">Patient overcharged $3,450 for routine appendectomy</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4 shadow-sm transform -rotate-3 hover:rotate-0 transition-transform duration-300 hover:shadow-md">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-red-500 mt-1" />
                      <div>
                        <h4 className="font-semibold text-red-600">Billing Mistake</h4>
                        <p className="text-black-600/80">$2,780 charged for lab tests never performed</p>
                      </div>
                    </div>
                  </div>

               
                  <div className="bg-white rounded-xl p-4 shadow-sm transform rotate-3 hover:rotate-0 transition-transform duration-300 hover:shadow-md">
                    <div className="flex items-start gap-3">
                      <AlertOctagon className="h-5 w-5 text-orange-500 mt-1" />
                      <div>
                        <h4 className="font-semibold text-orange-600">Incorrect Coding</h4>
                        <p className="text-black-600/80">Wrong procedure code resulted in $4,200 overcharge</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4 shadow-sm transform -rotate-3 hover:rotate-0 transition-transform duration-300 hover:shadow-md">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-red-500 mt-1" />
                      <div>
                        <h4 className="font-semibold text-red-600">Out-of-Network Error</h4>
                        <p className="text-black-600/80">In-network doctor billed as out-of-network, $5,300 extra cost</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow between panels */}
            <div className="flex items-center justify-center md:w-24">
              <div className="bg-teal-500 rounded-full p-4 rotate-90 md:rotate-0">
                <ArrowRight className="h-6 w-6 text-white" />
              </div>
            </div>

            {/* Right side - With Veyra */}
            <div className="flex-1 bg-teal-50 rounded-3xl p-8">
              <div className="space-y-6">
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-black mr-2">With</span>
                  <Image
                    src="/Veyra_Logo_Primary_H_Aura500.png"
                    alt="Veyra"
                    width={100}
                    height={30}
                    className="h-8 w-auto brightness-0 sepia hue-rotate-140"
                    priority
                  />
                </div>

                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:transition-transform duration-300 hover:shadow-md">
                    <div className="flex items-start gap-4">
                      <div className="bg-teal-100 rounded-lg p-2">
                        <Bug className="h-6 w-6 text-teal-600" />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-black-600">Fix Errors</h4>
                        <p className="text-black-600/80">Automated error detection prevents billing mistakes before submission</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm hover:transition-transform duration-300 hover:shadow-md">
                    <div className="flex items-start gap-4">
                      <div className="bg-teal-100 rounded-lg p-2">
                        <Zap className="h-6 w-6 text-teal-600" />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-black-600">Resolve Issues</h4>
                        <p className="text-black-600/80">AI-powered system identifies and resolves claim issues in real-time</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm hover:transition-transform duration-300 hover:shadow-md">
                    <div className="flex items-start gap-4">
                      <div className="bg-teal-100 rounded-lg p-2">
                        <Shield className="h-6 w-6 text-teal-600" />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-black-600">Pay Fair Prices</h4>
                        <p className="text-black-600/80">Ensure accurate pricing and prevent overcharges with price transparency</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
        {/* Secure. Compliant. Trusted Section */}
        <section className="relative py-12 md:py-20">
          <div className="container mx-auto px-4">
            <ScrollAnimation animation="fadeIn" duration={0.7}>
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-black">
                Secure and Compliant
              </h2>
              <p className="text-center text-black mb-8 md:mb-12 max-w-2xl mx-auto text-sm md:text-base">
                Your medical information is sensitive. We take security seriously.
              </p>
            </ScrollAnimation>

            <ScrollAnimationGroup 
              animation="fadeInUp" 
              staggerDelay={0.15}
              duration={0.6}
            >
              {(AnimatedItem) => (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  <AnimatedItem>
                    <div className="flex flex-col items-start bg-white/10 backdrop-blur-sm p-4 rounded-2xl hover:bg-white/20 transition-colors">
                      <div className="flex items-center mb-3">
                        <Shield className="h-5 w-5 md:h-6 md:w-6 text-black stroke-current fill-none mr-2" />
                        <h3 className="text-lg md:text-xl font-semibold text-black">HIPAA Compliant</h3>
                      </div>
                      <p className="text-sm text-black">Full patient data privacy, adhering to healthcare regulations.</p>
                    </div>
                  </AnimatedItem>

                  <AnimatedItem>
                    <div className="flex flex-col items-start bg-white/10 backdrop-blur-sm p-4 rounded-2xl hover:bg-white/20 transition-colors">
                      <div className="flex items-center mb-3">
                        <Lock className="h-5 w-5 md:h-6 md:w-6 text-black stroke-current fill-none mr-2" />
                        <h3 className="text-lg md:text-xl font-semibold text-black">End-to-End Encrypted</h3>
                      </div>
                      <p className="text-sm text-black">AES-256 encryption protects your data from start to finish.</p>
                    </div>
                  </AnimatedItem>

                  <AnimatedItem>
                    <div className="flex flex-col items-start bg-white/10 backdrop-blur-sm p-4 rounded-2xl hover:bg-white/20 transition-colors">
                      <div className="flex items-center mb-3">
                        <FileCheck className="h-5 w-5 md:h-6 md:w-6 text-black stroke-current fill-none mr-2" />
                        <h3 className="text-lg md:text-xl font-semibold text-black">PHI Redacted</h3>
                      </div>
                      <p className="text-sm text-black">Patient identifiers removed, keeping data anonymous.</p>
                    </div>
                  </AnimatedItem>
                </div>
              )}
            </ScrollAnimationGroup>
          </div>
        </section>

        {/* Add Traveling Lines Divider */}
        <SectionDivider className="my-8" />

     
{/* FAQ Section */}
<section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <ScrollAnimation animation="fadeInUp" duration={0.7}>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black-600">
                Frequently Asked Questions
              </h2>
              <div className="max-w-3xl mx-auto space-y-4">
                <details className="group bg-white rounded-2xl cursor-pointer">
                  <summary className="flex items-center justify-between p-6 marker-hidden hover:text-teal-500 transition-colors">
                    <h3 className="text-xl font-semibold text-black-600 group-hover:text-teal-500 transition-colors">
                      Is Veyra HIPAA compliant?
                    </h3>
                    <ChevronDown className="w-5 h-5 text-black-600 transition-all duration-500 chevron group-hover:text-teal-500 group-open:rotate-180" />
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-black-600/80 leading-relaxed">
                      Veyra is committed to protecting your medical information and follows industry best practices 
                      to ensure security. For our medical bill analysis service, we do not record any PHI(Personal Health 
                      Information) and do not store any billing info. We continuously ensure that we are meeting the 
                      highest data protection standards.
                    </p>
                  </div>
                </details>

                <details className="group bg-white rounded-2xl cursor-pointer">
                  <summary className="flex items-center justify-between p-6 marker-hidden hover:text-teal-500 transition-colors">
                    <h3 className="text-xl font-semibold text-black-600 group-hover:text-teal-500 transition-colors">
                      How does Veyra work?
                    </h3>
                    <ChevronDown className="w-5 h-5 text-black-600 transition-all duration-500 chevron group-hover:text-teal-500 group-open:rotate-180" />
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-black-600/80 leading-relaxed">
                      Veyra helps users analyze medical bills for errors and overcharges. Simply upload your 
                      medical bill, and our system will scan it for potential discrepancies. If issues are detected, 
                      you can connect with a professional medical bill advocate who can help negotiate and dispute 
                      charges on your behalf.
                    </p>
                  </div>
                </details>

                <details className="group bg-white rounded-2xl cursor-pointer">
                  <summary className="flex items-center justify-between p-6 marker-hidden hover:text-teal-500 transition-colors">
                    <h3 className="text-xl font-semibold text-black-600 group-hover:text-teal-500 transition-colors">
                      What information do I need to submit?
                    </h3>
                    <ChevronDown className="w-5 h-5 text-black-600 transition-all duration-500 chevron group-hover:text-teal-500 group-open:rotate-180" />
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-black-600/80 leading-relaxed">
                      To use Veyra, you need to provide a copy of your itemized medical bill. If you choose 
                      to work with an advocate, additional details like insurance information and a HIPAA release 
                      form may be required for negotiation purposes.
                    </p>
                  </div>
                </details>

                <details className="group bg-white rounded-2xl cursor-pointer">
                  <summary className="flex items-center justify-between p-6 marker-hidden hover:text-teal-500 transition-colors">
                    <h3 className="text-xl font-semibold text-black-600 group-hover:text-teal-500 transition-colors">
                      Can I use Veyra even if I have insurance?
                    </h3>
                    <ChevronDown className="w-5 h-5 text-black-600 transition-all duration-500 chevron group-hover:text-teal-500 group-open:rotate-180" />
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-black-600/80 leading-relaxed">
                      Yes, Veyra works for both insured and uninsured individuals. If your insurance hasn't 
                      paid yet, we can help review your bill for errors before payment. If your claim has been 
                      processed, you may still be able to appeal charges or negotiate remaining balances. For 
                      uninsured users, we assist in identifying billing errors and exploring discounts or 
                      financial aid options.
                    </p>
                  </div>
                </details>
              </div>
            </ScrollAnimation>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-black-600">
              Start Saving on Your Medical Bills Today
            </h2>
            <Button asChild size="lg" className="bg-teal-600 text-white hover:bg-teal-800 rounded-full px-8">
              <Link href="/get-started">Get Started Now</Link>
            </Button>
          </div>
        </section>

       

      <footer className="bg-black text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="/Veyra_Logo_Primary_H_Aura500.png"
                  alt="veyra"
                  width={215}
                  height={48}
                  className="h-8 w-auto brightness-0 invert"
                />
              </div>
              <p className="text-sm text-white/70 max-w-xs">
                Making healthcare more affordable through bill analysis and negotiation.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-medium mb-3">Company</h4>
                <ul className="space-y-2 text-sm text-white/70">
                  <li><Link href="/about">About Us</Link></li>
                  <li><Link href="/team">Our Team</Link></li>
                  <li><Link href="/careers">Careers</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Resources</h4>
                <ul className="space-y-2 text-sm text-white/70">
                  <li><Link href="/blog">Blog</Link></li>
                  <li><Link href="/faq">FAQ</Link></li>
                  <li><Link href="/support">Support</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Legal</h4>
                <ul className="space-y-2 text-sm text-white/70">
                  <li><Link href="/privacy">Privacy Policy</Link></li>
                  <li><Link href="/terms">Terms of Service</Link></li>
                  <li><Link href="/hipaa">HIPAA Compliance</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center md:text-left text-sm text-white/50">
            <p>© {new Date().getFullYear()} veyra. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
           