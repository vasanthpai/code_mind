// hooks/useIntersectionObserver.js
'use client'

import { useCallback, useRef } from 'react'

export function useIntersectionObserver(callback, options = {}) {
  const observer = useRef()
  
  const elementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect()
      
      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback()
        }
      }, {
        threshold: 0.1,
        rootMargin: '100px',
        ...options
      })
      
      if (node) observer.current.observe(node)
    },
    [callback, options]
  )

  return elementRef
}
