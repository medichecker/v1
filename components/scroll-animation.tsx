// components/scroll-animation.tsx
"use client"

import { useEffect, useRef, useState, ReactNode } from "react"
import { motion } from "framer-motion"

interface ScrollAnimationProps {
  children: ReactNode;
  animation?: "fadeIn" | "fadeInUp" | "fadeInDown" | "fadeInLeft" | "fadeInRight" | "zoomIn" | "slideUp";
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
}

export const ScrollAnimation: React.FC<ScrollAnimationProps> = ({ 
  children, 
  animation = "fadeIn", 
  delay = 0, 
  duration = 0.5, 
  className = "",
  threshold = 0.1,
  once = true
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const animations = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration, delay } }
    },
    fadeInUp: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { duration, delay } }
    },
    fadeInDown: {
      hidden: { opacity: 0, y: -50 },
      visible: { opacity: 1, y: 0, transition: { duration, delay } }
    },
    fadeInLeft: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0, transition: { duration, delay } }
    },
    fadeInRight: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0, transition: { duration, delay } }
    },
    zoomIn: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1, transition: { duration, delay } }
    },
    slideUp: {
      hidden: { y: 100 },
      visible: { y: 0, transition: { duration, delay } }
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when intersection status changes
        if (entry.isIntersecting) {
          setIsVisible(true)
          // If animation should only happen once, unobserve after it becomes visible
          if (once && entry.isIntersecting) {
            observer.unobserve(entry.target)
          }
        } else if (!once) {
          // If not "once", we can toggle visibility state
          setIsVisible(false)
        }
      },
      { 
        threshold, // Trigger when this percentage of element is visible
        rootMargin: "0px 0px -100px 0px" // Negative bottom margin means it triggers before element fully enters viewport
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [once, threshold])

  const selectedAnimation = animations[animation] || animations.fadeIn

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={selectedAnimation}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// For animating multiple children with staggered effect
interface ScrollAnimationGroupProps {
  children: (AnimatedItem: React.FC<AnimatedItemProps>) => ReactNode;
  animation?: "fadeIn" | "fadeInUp" | "fadeInDown" | "fadeInLeft" | "fadeInRight";
  staggerDelay?: number;
  baseDelay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
}

interface AnimatedItemProps {
  children: ReactNode;
  className?: string;
}

export const ScrollAnimationGroup: React.FC<ScrollAnimationGroupProps> = ({ 
  children, 
  animation = "fadeIn", 
  staggerDelay = 0.1,
  baseDelay = 0, 
  duration = 0.5,
  className = "",
  threshold = 0.1,
  once = true
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const containerAnimations = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { 
          staggerChildren: staggerDelay,
          delayChildren: baseDelay
        }
      }
    },
    fadeInUp: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { 
          staggerChildren: staggerDelay,
          delayChildren: baseDelay
        }
      }
    },
    fadeInDown: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { 
          staggerChildren: staggerDelay,
          delayChildren: baseDelay
        }
      }
    },
    fadeInLeft: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { 
          staggerChildren: staggerDelay,
          delayChildren: baseDelay
        }
      }
    },
    fadeInRight: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { 
          staggerChildren: staggerDelay,
          delayChildren: baseDelay
        }
      }
    }
  }

  const itemAnimations = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration } }
    },
    fadeInUp: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { duration } }
    },
    fadeInDown: {
      hidden: { opacity: 0, y: -50 },
      visible: { opacity: 1, y: 0, transition: { duration } }
    },
    fadeInLeft: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0, transition: { duration } }
    },
    fadeInRight: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0, transition: { duration } }
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) {
            observer.unobserve(entry.target)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { 
        threshold,
        rootMargin: "0px 0px -100px 0px"
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [once, threshold])

  const selectedContainerAnimation = containerAnimations[animation] || containerAnimations.fadeIn
  const selectedItemAnimation = itemAnimations[animation] || itemAnimations.fadeIn

  // Create a child component that can be used within the group
  const AnimatedItem: React.FC<AnimatedItemProps> = ({ children, className = "" }) => (
    <motion.div variants={selectedItemAnimation} className={className}>
      {children}
    </motion.div>
  )

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={selectedContainerAnimation}
      className={className}
    >
      {children(AnimatedItem)}
    </motion.div>
  )
}