// components/traveling-lines.tsx
"use client"

import React, { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface TravelingLinesProps {
  color?: string;
  width?: number;
  height?: number;
  speed?: number;
  className?: string;
}

export const TravelingLines: React.FC<TravelingLinesProps> = ({
  color = "#268E8E", // Teal color
  width = 3,
  height = 200,
  speed = 2,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas dimensions to match its display size
    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect()
      if (canvas.width !== width || canvas.height !== height) {
        const { devicePixelRatio: ratio = 1 } = window
        canvas.width = width * ratio
        canvas.height = height * ratio
        ctx.scale(ratio, ratio)
      }
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    // Line properties
    const lines: {x: number; y: number; length: number; speed: number}[] = []
    const numberOfLines = Math.floor(canvas.width / 100) // One line per 100px of width
    
    // Create initial lines
    for (let i = 0; i < numberOfLines; i++) {
      lines.push({
        x: Math.random() * canvas.width,
        y: 0,
        length: 50 + Math.random() * 50, // Random line length between 50-100px
        speed: (1 + Math.random()) * speed // Random speed variation
      })
    }
    
    // Animation loop
    let animationId: number
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw and update each line
      lines.forEach(line => {
        // Draw line
        ctx.beginPath()
        ctx.moveTo(line.x, line.y)
        ctx.lineTo(line.x, line.y + line.length)
        ctx.strokeStyle = color
        ctx.lineWidth = width
        ctx.stroke()
        
        // Update position
        line.y += line.speed
        
        // Reset if line goes out of canvas
        if (line.y > canvas.height) {
          line.y = -line.length
          line.x = Math.random() * canvas.width
        }
      })
      
      animationId = requestAnimationFrame(animate)
    }
    
    animate()
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [color, width, speed])
  
  return (
    <div className={`relative w-full ${className}`} style={{ height }}>
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  )
}

// SectionDivider component that uses TravelingLines
interface SectionDividerProps {
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ className = "" }) => {
  return (
    <div className={`relative w-full ${className}`}>
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent z-10"></div>
      <TravelingLines height={100} />
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent z-10"></div>
    </div>
  )
}