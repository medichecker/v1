"use client"

import React, { useEffect, useState } from "react"
import { createPortal } from "react-dom"


interface CursorPosition {
  x: number;
  y: number;
}

export default function CustomCursor(): React.JSX.Element | null {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
    
    const updateCursorPosition = (e: MouseEvent): void => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = (): void => setIsVisible(true)
    const handleMouseLeave = (): void => setIsVisible(false)

    // Add cursor styling to body
    document.body.style.cursor = "none"
    
    // Add event listeners
    window.addEventListener("mousemove", updateCursorPosition)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)

    // Cleanup on unmount
    return () => {
      document.body.style.cursor = "auto"
      window.removeEventListener("mousemove", updateCursorPosition)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  // Handle client-side rendering only
  if (!isMounted) return null

  // Create portal to render the cursor
  return createPortal(
    <div
      className="fixed pointer-events-none z-50 transition-opacity duration-150"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        opacity: isVisible ? 1 : 0,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="relative w-8 h-8">
        {/* Piggy Bank Base */}
        <svg 
          width="32" 
          height="32" 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Piggy Bank Body */}
          <ellipse cx="16" cy="18" rx="12" ry="10" fill="#6AB0B0" />
          
          {/* Piggy Bank Ears */}
          <circle cx="6" cy="13" r="2" fill="#6AB0B0" />
          <circle cx="26" cy="13" r="2" fill="#6AB0B0" />
          
          {/* Piggy Bank Snout */}
          <ellipse cx="16" cy="20" rx="3" ry="2.5" fill="#FFD1DC" />
          <circle cx="15" cy="20" r="0.7" fill="#555" />
          <circle cx="17" cy="20" r="0.7" fill="#555" />
          
          {/* Piggy Bank Legs */}
          <rect x="8" y="24" width="2" height="4" rx="1" fill="#6AB0B0" />
          <rect x="22" y="24" width="2" height="4" rx="1" fill="#6AB0B0" />
          
          {/* Coin Slot */}
          <rect x="14" y="12" width="4" height="1.5" rx="0.75" fill="#555" />
          
          {/* Medical Cross */}
          <rect x="22" y="6" width="8" height="2" rx="1" fill="#6AB0B0" />
          <rect x="25" y="3" width="2" height="8" rx="1" fill="#6AB0B0" />
        </svg>
      </div>
    </div>,
    document.body
  )
}