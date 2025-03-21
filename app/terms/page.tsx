"use client"

import Link from "next/link"
import { ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollAnimation } from "@/components/scroll-animation"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function TermsAndConditions() {
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
        <Link href="/" className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 md:h-8 md:w-8 text-black-600 stroke-current fill-none" />
          <h1 className="text-xl md:text-2xl font-bold text-black-600">MediChecker</h1>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="text-black-600/80 hover:text-black-600">
            Home
          </Link>
          <a href="mailto:usemedichecker@gmail.com" className="text-black-600/80 hover:text-black-600">
            Contact
          </a>
        </nav>
        <Button variant="outline" size="sm" className="md:hidden border-black-600 text-black-600">
          Menu
        </Button>
      </motion.header>

      <main className="container mx-auto py-12 px-4">
        <ScrollAnimation animation="fadeIn" duration={0.7}>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-black-600">Terms and Conditions</h1>
            
            <div className="prose prose-lg max-w-none text-black-600/80">
              <h2 className="text-2xl font-bold mt-12 mb-4 text-black-600">1. Introduction</h2>
              <p className="mb-8">
                These Terms and Conditions ("Terms") govern your access to and use of Medichecker's services, including but not limited to the Medichecker website, applications, and related services (collectively, the "Service").
              </p>
              <p className="mb-8">
                By accessing or using the Service, you agree to comply with and be bound by these Terms. If you do not agree to these Terms, you may not use the Service.
              </p>

              <h2 className="text-2xl font-bold mt-12 mb-4 text-black-600">2. Definitions</h2>
              <ul className="list-disc pl-6 mb-8">
                <li>"MediChecker," "we," "us," or "our" refers to MediChecker Inc.</li>
                <li>"User," "you," or "your" refers to the individual or entity accessing or using the Service.</li>
                <li>"Account" means a registered user profile within the Service.</li>
                <li>"Advocate" refers to a medical bill advocate utilizing MediChecker's platform to offer negotiation and dispute services.</li>
              </ul>

              <h2 className="text-2xl font-bold mt-12 mb-4 text-black-600">3. Eligibility</h2>
              <p className="mb-8">
                To use the Service, you must be at least 18 years old and legally capable of entering into binding agreements. By using the Service, you represent and warrant that you meet these requirements.
              </p>

              <h2 className="text-2xl font-bold mt-12 mb-4 text-black-600">4. Service Overview</h2>
              <p className="mb-8">
                MediChecker provides a platform that allows users to upload medical bills for analysis and connects them with professional medical bill advocates who negotiate and dispute charges on their behalf. MediChecker does not guarantee specific outcomes or financial savings.
              </p>

              <h2 className="text-2xl font-bold mt-12 mb-4 text-black-600">5. Account Registration and Security</h2>
              <p className="mb-4">You must register for an account to access certain features of the Service. By registering:</p>
              <ul className="list-disc pl-6 mb-8">
                <li>You agree to provide accurate, current, and complete information.</li>
                <li>You are responsible for maintaining the security of your account credentials.</li>
                <li>You must notify us immediately if you suspect unauthorized access to your account.</li>
                <li>We reserve the right to suspend or terminate accounts at our discretion.</li>
              </ul>

              <h2 className="text-2xl font-bold mt-12 mb-4 text-black-600">6. Fees and Payment</h2>
              <ul className="list-disc pl-6 mb-8">
                <li>The first 50 users who sign up for MediChecker will be able to upload medical bills for free.</li>
                <li>After the first 50 users, MediChecker will charge a $1 fee per bill uploaded.</li>
                <li>By using any paid features, you agree to pay all fees associated with the Service as outlined in the applicable pricing schedule.</li>
                <li>MediChecker reserves the right to update fees at any time, with notice provided to users.</li>
                <li>MediChecker is not responsible for any third party failed.</li>
              </ul>

              <h2 className="text-2xl font-bold mt-12 mb-4 text-black-600">7. Communication and Consent</h2>
              <p className="mb-8">
                By using the Service, you consent to receive electronic communications from us, including emails, text messages, and notifications. You may opt-out of non-essential communications at any time.
              </p>

              <h2 className="text-2xl font-bold mt-12 mb-4 text-black-600">8. Privacy Policy</h2>
              <p className="mb-8">
                Your use of the Service is also governed by our Privacy Policy, which outlines how we collect, use, and protect your personal information.
              </p>

              <h2 className="text-2xl font-bold mt-12 mb-4 text-black-600">9. User Responsibilities and Prohibited Activities</h2>
              <p className="mb-4">You agree not to:</p>
              <ul className="list-disc pl-6 mb-8">
                <li>Upload false, misleading, or fraudulent medical bills.</li>
                <li>Impersonate another individual or entity.</li>
                <li>Violate any applicable laws or regulations.</li>
                <li>Use the Service for any unauthorized or illegal purposes.</li>
              </ul>

              <h2 className="text-2xl font-bold mt-12 mb-4 text-black-600">10. Disclaimers</h2>
              <p className="mb-8">
                MediChecker provides the Service "as is" without warranties of any kind, whether express or implied. We do not guarantee that the Service will be uninterrupted, error-free, or secure.
              </p>

              <h2 className="text-2xl font-bold mt-12 mb-4 text-black-600">11. Limitation of Liability</h2>
              <p className="mb-8">
                To the fullest extent permitted by law, MediChecker shall not be liable for any direct, indirect, incidental, or consequential damages resulting from your use of the Service.
              </p>

              <h2 className="text-2xl font-bold mt-12 mb-4 text-black-600">12. Indemnification</h2>
              <p className="mb-8">
                You agree to indemnify and hold MediChecker harmless from any claims, liabilities, damages, or expenses arising from your use of the Service or violation of these Terms.
              </p>

              <h2 className="text-2xl font-bold mt-12 mb-4 text-black-600">13. Termination</h2>
              <p className="mb-8">
                We reserve the right to suspend or terminate your access to the Service at any time, with or without cause. You may also terminate your account by ceasing to use the Service.
              </p>

              <h2 className="text-2xl font-bold mt-12 mb-4 text-black-600">14. Dispute Resolution</h2>
              <p className="mb-8">
                All disputes arising from these Terms shall be resolved through binding arbitration in accordance with the American Arbitration Association's rules. You waive any right to participate in class actions.
              </p>

              <h2 className="text-2xl font-bold mt-12 mb-4 text-black-600">15. Governing Law</h2>
              <p className="mb-8">
                These Terms shall be governed by and construed under the laws of the State of California, without regard to its conflict of law principles.
              </p>

              <h2 className="text-2xl font-bold mt-12 mb-4 text-black-600">16. Amendments</h2>
              <p className="mb-8">
                MediChecker may update these Terms at any time by posting a revised version on the Service. Continued use of the Service after such updates constitutes your acceptance of the new Terms.
              </p>

              <h2 className="text-2xl font-bold mt-12 mb-4 text-black-600">17. Contact Information</h2>
              <p className="mb-8">
                For any questions regarding these Terms, please contact us at contact@medichecker.com
              </p>
            </div>
          </div>
        </ScrollAnimation>
      </main>

      <footer className="bg-black text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="h-6 w-6 text-white stroke-current fill-none" />
                <h3 className="text-xl font-bold">MediChecker</h3>
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
            <p>© {new Date().getFullYear()} MediChecker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 