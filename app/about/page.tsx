"use client"

import Link from "next/link"
import { ShieldCheck, AlertCircle, Clock, Users, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollAnimation } from "@/components/scroll-animation"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function AboutUs() {
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
        {/* Hero Section */}
        <ScrollAnimation animation="fadeIn" duration={0.7}>
          <div className="text-center max-w-4xl mx-auto mb-24">
            <h1 className="text-4xl md:text-6xl font-bold mb-8 text-black-600 leading-tight">
              Making Medical Bills
              <span className="text-teal-600"> Fair</span> For Everyone
            </h1>
            <p className="text-xl text-black-600/80 leading-relaxed">
              We're revolutionizing how patients handle medical bills, making the process simpler, 
              faster, and more affordable for everyone.
            </p>
          </div>
        </ScrollAnimation>

        {/* Purpose Section */}
        <ScrollAnimation animation="fadeInUp" duration={0.7}>
          <div className="max-w-4xl mx-auto mb-24">
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <AlertCircle className="w-8 h-8 text-teal-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-black-600 mb-4">Our Purpose</h2>
                  <p className="text-lg text-black-600/80 leading-relaxed">
                    Our purpose at Medichecker is to help patients navigate the convoluted and broken medical 
                    billing system. Up to 80% of medical bills contain errors - a seriously alarming amount.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <Clock className="w-8 h-8 text-teal-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-black-600 mb-4">The Challenge</h2>
                  <p className="text-lg text-black-600/80 leading-relaxed">
                    The medical billing advocacy process is complicated and tedious. It can take hundreds of 
                    calls and emails and can take months to completely dispute your bill. While medical billing 
                    advocates are skilled, they charge high rates and we want to remove the high payment barrier 
                    to fair billing.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <Users className="w-8 h-8 text-teal-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-black-600 mb-4">Our Solution</h2>
                  <p className="text-lg text-black-600/80 leading-relaxed">
                    At Medichecker, we aim to simplify the entire process. With instant bill analysis, automated 
                    disputing, and ensuring resolutions, we hope to tackle this issue one bill at a time. We'll 
                    advocate for everyone, insured or uninsured.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <CheckCircle2 className="w-8 h-8 text-teal-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-black-600 mb-4">Our Vision</h2>
                  <p className="text-lg text-black-600/80 leading-relaxed">
                    We envision a future where a patient can receive their medical bill, check it on our site, 
                    and have the peace of mind that it will be disputed. Everyone deserves to be charged fairly 
                    for their medical bill.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimation>

        {/* Process Section */}
        <ScrollAnimation animation="fadeInUp" duration={0.7}>
          <div className="bg-black/5 rounded-3xl p-8 md:p-12 max-w-6xl mx-auto mb-24">
            <h2 className="text-3xl font-bold text-center mb-12 text-black-600">How We Help</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-teal-600">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-black-600">Upload Your Bill</h3>
                <p className="text-black-600/80">
                  Simply upload your medical bill and our AI system will instantly analyze it for errors and overcharges.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-teal-600">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-black-600">Automated Analysis</h3>
                <p className="text-black-600/80">
                  Our system identifies billing errors, coding mistakes, and overcharges automatically.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-teal-600">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-black-600">We Handle Everything</h3>
                <p className="text-black-600/80">
                  Let us handle the dispute process while you focus on what matters - your health.
                </p>
              </div>
            </div>
          </div>
        </ScrollAnimation>

        {/* CTA Section */}
        <ScrollAnimation animation="fadeInUp" duration={0.7}>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black-600">Ready to Get Started?</h2>
            <p className="text-lg text-black-600/80 mb-8">
              Join thousands of others who have already discovered the power of MediChecker.
            </p>
            <Button asChild size="lg" className="bg-black text-white hover:bg-teal-600 rounded-full px-12">
              <Link href="/get-started">Get Started Today</Link>
            </Button>
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