"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Shield, Lock, FileCheck, ChevronRight, ChevronLeft, Search, Upload, DollarSign, ChevronDown } from "lucide-react"
import InteractiveBill from "@/components/interactive-bill"
import { motion } from "framer-motion"
import { ScrollAnimation, ScrollAnimationGroup } from "@/components/scroll-animation"
import { SectionDivider } from "@/components/traveling-lines"

interface Testimonial {
  name: string;
  location: string;
  image: string;
  text: string;
}

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const testimonialRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const scrollTestimonials = (direction: "left" | "right") => {
    if (testimonialRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300
      testimonialRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  const testimonials: Testimonial[] = [
    {
      name: "Sarah T.",
      location: "Chicago",
      image: "/placeholder.svg?height=60&width=60",
      text: "MediChecker reduced my ER bill from $3,500 to $1,200!",
    },
    {
      name: "Michael R.",
      location: "New York",
      image: "/placeholder.svg?height=60&width=60",
      text: "After surgery, they saved me over $5,000 on confusing charges.",
    },
    {
      name: "Jennifer L.",
      location: "Los Angeles",
      image: "/placeholder.svg?height=60&width=60",
      text: "Easy process. Uploaded my bill, saved $1,200 within days.",
    },
    {
      name: "David K.",
      location: "Boston",
      image: "/placeholder.svg?height=60&width=60",
      text: "Reduced my medical debt by 40%. Finally have peace of mind.",
    },
    {
      name: "Emily W.",
      location: "Seattle",
      image: "/placeholder.svg?height=60&width=60",
      text: "With chronic illness, they've saved me thousands this year.",
    },
  ]

  return (
    <div className="min-h-screen">
      <motion.header
        className="container mx-auto py-4 md:py-6 flex justify-between items-center px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 md:h-8 md:w-8 text-black-600 stroke-current fill-none" />
          <h1 className="text-xl md:text-2xl font-bold text-black-600">MediChecker</h1>
        </div>
        <nav className="hidden md:flex gap-6">
          <Link href="/about" className="text-black-600/80 hover:text-black-600">
            About Us
          </Link>
          <a href="mailto:usemedichecker@gmail.com" className="text-black-600/80 hover:text-black-600">
            Contact
          </a>
        </nav>
        <Button variant="outline" size="sm" className="md:hidden border-black-600 text-black-600">
          Menu
        </Button>
      </motion.header>

      <main>
        <div className="blob w-[300px] h-[300px] top-[20%] right-[10%] opacity-30"></div>
        <div className="blob w-[400px] h-[400px] top-[50%] left-[5%] opacity-20 animation-delay-2000"></div>
        <div className="blob w-[350px] h-[350px] bottom-[10%] right-[15%] opacity-25 animation-delay-4000"></div>
        
        {/* Hero Section */}
        <section className="container mx-auto py-8 md:py-12 px-4">
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
                <Button asChild size="lg" className="bg-black text-white hover:bg-teal-600 rounded-full px-8">
                  <Link href="/get-started">Get Started</Link>
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

        {/* Add Traveling Lines Divider */}
        <SectionDivider className="my-8" />

        {/* How It Works Section */}
        <section id="how-it-works" className="relative bg-white py-12 md:py-20 rounded-t-[3rem]">
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

        {/* Secure. Compliant. Trusted Section */}
        <section className="relative py-12 md:py-20">
          <div className="container mx-auto px-4">
            <ScrollAnimation animation="fadeIn" duration={0.7}>
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-black">
                Secure. Compliant. Trusted.
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

        {/* Trusted by Thousands Section */}
        <section id="testimonials" className="relative bg-white py-12 md:py-20">
          <div className="container mx-auto px-4">
            <ScrollAnimation animation="fadeIn" duration={0.7}>
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-black-600">Trusted by Thousands</h2>
              <p className="text-center text-black-700 mb-8 md:mb-12 max-w-2xl mx-auto text-sm md:text-base">
                See what our clients say about their experience.
              </p>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInUp" duration={0.7}>
              <div className="relative">
                <button
                  onClick={() => scrollTestimonials("left")}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md border border-teal-100 text-black-600 hover:bg-teal-50"
                >
                  <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 stroke-current fill-none" />
                </button>

                <div
                  ref={testimonialRef}
                  className="flex overflow-x-auto gap-4 md:gap-6 pb-6 scrollbar-hide snap-x"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {testimonials.map((testimonial, index) => (
                    <div
                      key={index}
                      className="min-w-[250px] md:min-w-[300px] border border-black p-4 md:p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex-shrink-0 snap-center"
                    >
                      <div className="flex items-center gap-1 md:gap-2 mb-3 md:mb-4">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-4 h-4 md:w-5 md:h-5 text-black-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                      </div>
                      <p className="text-sm text-black-700 mb-4">"{testimonial.text}"</p>
                      <div className="flex items-center">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden mr-3">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-black-600 text-sm md:text-base">{testimonial.name}</p>
                          <p className="text-xs md:text-sm text-black-500">{testimonial.location}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => scrollTestimonials("right")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md border border-teal-100 text-black-600 hover:bg-teal-50"
                >
                  <ChevronRight className="h-5 w-5 md:h-6 md:w-6 stroke-current fill-none" />
                </button>
                <button
                  onClick={() => scrollTestimonials("right")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md border border-teal-100 text-black-600 hover:bg-teal-50"
                >
                  <ChevronRight className="h-5 w-5 md:h-6 md:w-6 stroke-current fill-none" />
                </button>
              </div>
            </ScrollAnimation>
          </div>
        </section>
        {/* <SectionDivider className="my-8" /> */}
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
                      Is Medichecker HIPAA compliant?
                    </h3>
                    <ChevronDown className="w-5 h-5 text-black-600 transition-all duration-500 chevron group-hover:text-teal-500 group-open:rotate-180" />
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-black-600/80 leading-relaxed">
                      MediChecker is committed to protecting your medical information and follows industry best practices 
                      to ensure security. For our medical bill analysis service, we do not record any PHI(Personal Health 
                      Information) and do not store any billing info. We continuously ensure that we are meeting the 
                      highest data protection standards.
                    </p>
                  </div>
                </details>

                <details className="group bg-white rounded-2xl cursor-pointer">
                  <summary className="flex items-center justify-between p-6 marker-hidden hover:text-teal-500 transition-colors">
                    <h3 className="text-xl font-semibold text-black-600 group-hover:text-teal-500 transition-colors">
                      How does Medichecker work?
                    </h3>
                    <ChevronDown className="w-5 h-5 text-black-600 transition-all duration-500 chevron group-hover:text-teal-500 group-open:rotate-180" />
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-black-600/80 leading-relaxed">
                      MediChecker helps users analyze medical bills for errors and overcharges. Simply upload your 
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
                      To use MediChecker, you need to provide a copy of your itemized medical bill. If you choose 
                      to work with an advocate, additional details like insurance information and a HIPAA release 
                      form may be required for negotiation purposes.
                    </p>
                  </div>
                </details>

                <details className="group bg-white rounded-2xl cursor-pointer">
                  <summary className="flex items-center justify-between p-6 marker-hidden hover:text-teal-500 transition-colors">
                    <h3 className="text-xl font-semibold text-black-600 group-hover:text-teal-500 transition-colors">
                      Can I use MediChecker even if I have insurance?
                    </h3>
                    <ChevronDown className="w-5 h-5 text-black-600 transition-all duration-500 chevron group-hover:text-teal-500 group-open:rotate-180" />
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-black-600/80 leading-relaxed">
                      Yes, MediChecker works for both insured and uninsured individuals. If your insurance hasn't 
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
      </main>

        {/* Call to Action Section */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-black-600">
              Start Saving on Your Medical Bills Today
            </h2>
            <Button asChild size="lg" className="bg-black text-white hover:bg-teal-900 rounded-full px-8">
              <Link href="/get-started">Get Started Now</Link>
            </Button>
          </div>
        </section>

       

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
           