"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export default function InteractiveBill() {
  const [flipped, setFlipped] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleFlip = () => {
    setFlipped(!flipped)
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto h-[400px] md:h-[500px] flex flex-col items-center justify-center">
      {/* Bill Container - Now centered and larger */}
      <motion.div
        className="w-[300px] md:w-[350px] h-[350px] md:h-[400px] flex items-center justify-center"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -100 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <motion.div
          className="relative w-full max-w-[280px] md:max-w-[330px] h-[340px] md:h-[390px] cursor-pointer preserve-3d"
          animate={{ 
            rotateY: flipped ? 180 : 0,
            transition: { duration: 0.6, ease: "easeInOut" }
          }}
          onClick={handleFlip}
          whileHover={{ scale: 1.05 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front side - Corrected bill (now showing first) */}
          <motion.div
            className="absolute w-full h-full rounded-2xl p-3 md:p-5 shadow-xl bg-white border border-teal-600 flex flex-col"
            style={{
              boxShadow:
                "0 20px 25px -5px rgba(0, 238, 255, 0.44), 0 10px 10px -5px rgba(22, 151, 190, 0.3), 0 0 0 1px rgba(37, 170, 154, 0.14)",
              backfaceVisibility: "hidden",
              transform: "rotateY(0deg)",
            }}
          >
            <div className="flex justify-between items-start mb-2 md:mb-3">
              <div>
                <h3 className="text-base md:text-lg font-medium text-black-500">Medical Bill</h3>
                <p className="text-xs text-black-500">Invoice #: MED-20250315</p>
              </div>
              <div className="bg-teal-600 text-white text-xs font-medium px-2 py-0.5 rounded">CORRECTED</div>
            </div>

            <div className="flex-1 overflow-hidden">
              <div className="border-t border-b border-teal-200 py-1 md:py-1.5 mb-2 flex justify-between text-xs md:text-sm font-medium text-black-500">
                <span>Service</span>
                <span>Amount</span>
              </div>

              <div className="space-y-1 md:space-y-1.5 max-h-[160px] md:max-h-[180px] overflow-hidden">
                <div className="flex justify-between items-center text-xs md:text-sm">
                  <span className="text-black-500">Emergency Room Visit</span>
                  <span className="text-black-500 font-medium">$800</span>
                </div>
                <div className="flex justify-between items-center text-xs md:text-sm">
                  <span className="text-black-500">X-Ray (Chest)</span>
                  <span className="text-black-500 font-medium">$250</span>
                </div>
                <div className="flex justify-between items-center text-xs md:text-sm">
                  <span className="text-black-500">Blood Test Panel</span>
                  <span className="text-black-500 font-medium">$150</span>
                </div>
                <div className="flex justify-between items-center text-xs md:text-sm">
                  <span className="text-black-500">IV Administration</span>
                  <span className="text-black-500 font-medium">$120</span>
                </div>
                <div className="flex justify-between items-center text-xs md:text-sm">
                  <span className="text-black-500">Medication</span>
                  <span className="text-black-500 font-medium">$90</span>
                </div>
                <div className="flex justify-between items-center text-xs md:text-sm">
                  <span className="text-black-500">Physician Consultation</span>
                  <span className="text-black-500 font-medium">$200</span>
                </div>
              </div>
            </div>

            <div className="mt-2 md:mt-3 pt-2 md:pt-3 border-t border-teal-200">
              <div className="flex justify-between items-center font-bold">
                <span className="text-black-500 text-xs md:text-sm">Total Due:</span>
                <span className="text-base md:text-lg text-black-500">$1,760</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-black-500 font-medium">You Save:</span>
                <span className="text-xs text-black-500 font-medium">$1,420 (45%)</span>
              </div>
            </div>
          </motion.div>

          {/* Back side - Overcharged bill (shows when flipped) */}
          <motion.div
            className="absolute w-full h-full rounded-2xl p-3 md:p-5 shadow-2xl bg-white border border-black shadow-md flex flex-col"
            style={{
              boxShadow:
                "0 20px 25px -5px rgba(255, 0, 0, 0.33), 0 10px 10px -5px rgba(153, 30, 30, 0.04), 0 0 0 1px rgba(229, 37, 37, 0.78)",
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="flex justify-between items-start mb-2 md:mb-3">
              <div>
                <h3 className="text-base md:text-lg font-medium text-black-900">Medical Bill</h3>
                <p className="text-xs text-black-900 text-opacity-50 ">Invoice #: MED-20250315</p>
              </div>
              <div className="bg-red-900 text-white text-xs font-medium px-2 py-0.5 rounded">OVERCHARGED</div>
            </div>

            <div className="flex-1 overflow-hidden">
              <div className="border-t border-b border-red-900 py-1 md:py-1.5 mb-2 flex justify-between text-xs md:text-sm font-medium text-black-900">
                <span>Service</span>
                <span>Amount</span>
              </div>

              <div className="space-y-1 md:space-y-1.5 max-h-[160px] md:max-h-[180px] overflow-hidden">
                <div className="flex justify-between items-center text-xs md:text-sm">
                  <span className="text-black-900">Emergency Room Visit</span>
                  <span className="text-black-900 font-medium">$1,200.00</span>
                </div>
                <div className="flex justify-between items-center text-xs md:text-sm">
                  <span className="text-black-900">X-Ray (Chest)</span>
                  <span className="text-black-900 font-medium">$500.00</span>
                </div>
                <div className="flex justify-between items-center text-xs md:text-sm">
                  <span className="text-black-900">Blood Test Panel</span>
                  <span className="text-black-900 font-medium">$300.00</span>
                </div>
                <div className="flex justify-between items-center text-xs md:text-sm">
                  <span className="text-black-900">IV Administration</span>
                  <span className="text-black-900 font-medium">$250.00</span>
                </div>
                <div className="flex justify-between items-center text-xs md:text-sm">
                  <span className="text-black-900">Medication</span>
                  <span className="text-black-900 font-medium">$180.00</span>
                </div>
                <div className="flex justify-between items-center text-xs md:text-sm">
                  <span className="text-black-900">Physician Consultation</span>
                  <span className="text-black-900 font-medium">$400.00</span>
                </div>
              </div>
            </div>

            <div className="mt-2 md:mt-3 pt-2 md:pt-3 border-t border-red-900">
              <div className="flex justify-between items-center font-bold">
                <span className="text-black-900 text-xs md:text-sm">Total Due:</span>
                <span className="text-base md:text-lg text-black-600">$3,180.00</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Text below the bill */}
      <motion.div
        className="text-center mt-4 md:mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <h2
          className={`text-lg md:text-xl font-medium ${
            flipped ? "text-black-900" : "text-black-500"
          } mb-2`}
        >
          {flipped ? (
            <div className="flex justify-center items-center">
              <span className="mr-2">Without</span>
              <Image
                src="/Veyra_Logo_Primary_H_Aura500.png"
                alt="Veyra"
                width={80}
                height={24}
                className="h-6 w-auto"
                priority
              />
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <span className="mr-2">With</span>
              <Image
                src="/Veyra_Logo_Primary_H_Aura500.png"
                alt="Veyra"
                width={80}
                height={24}
                className="h-6 w-auto"
                priority
              />
            </div>
          )}
        </h2>
        <p className="text-xs text-black-400">Click to flip the bill</p>
      </motion.div>
    </div>
  )
}