"use client"

import Link from "next/link"
import { ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollAnimation } from "@/components/scroll-animation"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function PrivacyPolicy() {
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
            <h1 className="text-4xl font-bold mb-8 text-black-600">Privacy Policy</h1>
            <p className="text-sm text-black-600/60 mb-8">Effective Date: 3/17/2025</p>
            
            <div className="prose prose-lg max-w-none text-black-600/80">
              <p className="mb-8">
                MediChecker ("we," "us," or "our") respects your privacy and is committed to protecting it through compliance with this Privacy Policy. 
                This Privacy Policy describes the types of information we may collect from you, how we use it, and your rights and choices regarding your personal data.
              </p>

              <h2 className="text-2xl font-bold mt-12 mb-4 text-black-600">1. Scope of This Privacy Policy</h2>
              <p className="mb-8">
                This Privacy Policy applies to the personal information MediChecker collects through our website, mobile applications, and any other services we provide 
                (collectively, the "Services"). By using the Services, you acknowledge and agree to the terms outlined in this Privacy Policy. If you do not agree with 
                our practices, please do not use the Services.
              </p>

              <h2 className="text-2xl font-bold mt-12 mb-4 text-black-600">2. Information We Collect</h2>
              <p className="mb-4">We collect different types of information, including:</p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3 text-black-600">a. Personal Information You Provide</h3>
              <ul className="list-disc pl-6 mb-6">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Billing and payment details (if applicable)</li>
                <li>Insurance information (if submitted for bill analysis)</li>
                <li>Uploaded medical bills or related documents</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3 text-black-600">b. Information We Collect Automatically</h3>
              <ul className="list-disc pl-6 mb-6">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>Usage data (e.g., pages visited, session duration, clickstream data)</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3 text-black-600">c. Sensitive Health Information</h3>
              <p className="mb-8">
                If you upload medical bills or related documents, they may contain sensitive health information. We implement strict security measures 
                to ensure compliance with applicable data protection regulations, including HIPAA where required.
              </p>

              <h2 className="text-2xl font-bold mt-12 mb-4 text-black-600">3. How We Use Your Information</h2>
              <p className="mb-4">We use your personal information to:</p>
              <ul className="list-disc pl-6 mb-8">
                <li>Provide, maintain, and improve our Services</li>
                <li>Analyze medical bills for potential errors or overcharges</li>
                <li>Process payments (if applicable)</li>
                <li>Send you updates, service-related communications, and marketing messages</li>
                <li>Detect, investigate, and prevent fraudulent or unauthorized activities</li>
                <li>Comply with legal and regulatory obligations</li>
              </ul>

              <h2 className="text-2xl font-bold mt-12 mb-4 text-black-600">4. How We Share Your Information</h2>
              <p className="mb-4">We do not sell your personal information. However, we may share it under the following circumstances:</p>
              <ul className="list-disc pl-6 mb-8">
                <li>With Third-Party Service Providers: We work with trusted partners for payment processing, cloud storage, security, and analytics.</li>
                <li>For Legal Compliance: We may disclose your information if required by law, subpoena, or to protect our legal rights.</li>
                <li>In Business Transfers: If MediChecker undergoes a merger, acquisition, or sale of assets, your data may be part of the transferred assets.</li>
              </ul>

              <h2 className="text-2xl font-bold mt-12 mb-4 text-black-600">5. Your Rights and Choices</h2>
              <p className="mb-4">Depending on your jurisdiction, you may have rights concerning your personal information, including:</p>
              <ul className="list-disc pl-6 mb-8">
                <li>Access & Correction: You may request a copy of the data we hold and update any inaccuracies.</li>
                <li>Deletion: You may request the deletion of your personal data, subject to legal and operational requirements.</li>
                <li>Marketing Preferences: You can opt out of marketing communications by following the unsubscribe instructions in our emails.</li>
              </ul>
              <p className="mb-8">To exercise these rights, contact us at contact@medichecker.com</p>

              <h2 className="text-2xl font-bold mt-12 mb-4 text-black-600">6. Data Security</h2>
              <p className="mb-8">
                We implement industry-standard security measures to protect your data from unauthorized access, disclosure, alteration, and destruction. 
                However, no system is completely secure, and we cannot guarantee absolute protection of your data.
              </p>

              <h2 className="text-2xl font-bold mt-12 mb-4 text-black-600">7. Data Retention</h2>
              <p className="mb-8">
                We retain your personal information as long as necessary to provide our Services, comply with legal obligations, and resolve disputes. 
                Once no longer required, we securely delete or anonymize your data.
              </p>

              <h2 className="text-2xl font-bold mt-12 mb-4 text-black-600">8. Children's Privacy</h2>
              <p className="mb-8">
                Our Services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. 
                If we discover such data, we will take appropriate steps to delete it.
              </p>

              <h2 className="text-2xl font-bold mt-12 mb-4 text-black-600">9. Cookies and Tracking Technologies</h2>
              <p className="mb-8">
                We use cookies and similar technologies to enhance user experience, analyze usage trends, and improve our Services. 
                You can manage cookie preferences through your browser settings.
              </p>

              <h2 className="text-2xl font-bold mt-12 mb-4 text-black-600">10. California Privacy Rights</h2>
              <p className="mb-4">If you are a California resident, you may have additional rights under the California Consumer Privacy Act (CCPA), including the right to:</p>
              <ul className="list-disc pl-6 mb-8">
                <li>Request details about the personal information we collect and how it is used</li>
                <li>Request deletion of your data</li>
                <li>Opt out of data sharing for targeted advertising purposes</li>
              </ul>
              <p className="mb-8">To exercise these rights, contact us at contact@medicalbillchecker.com</p>

              <h2 className="text-2xl font-bold mt-12 mb-4 text-black-600">11. Changes to This Privacy Policy</h2>
              <p className="mb-8">
                We may update this Privacy Policy periodically. We will notify you of significant changes by posting the revised policy on our website 
                and updating the "Effective Date." Continued use of the Services after changes constitutes acceptance of the updated policy.
              </p>

              <h2 className="text-2xl font-bold mt-12 mb-4 text-black-600">12. Contact Us</h2>
              <p className="mb-4">If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
              <p className="mb-8">
                MediChecker<br />
                Email: contact@medicalbillchecker.com
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