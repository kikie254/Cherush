'use client'

import Image from 'next/image'
import { useState } from 'react'

export function OptimizedImage({ src, alt, ...props }: any) {
  const [isLoading, setIsLoading] = useState(true)
  
  return (
    <div className="relative overflow-hidden w-full h-full">
      {isLoading && <div className="absolute inset-0 bg-primary/10 animate-pulse" />}
      <Image 
        src={src} 
        alt={alt} 
        onLoad={() => setIsLoading(false)} 
        className={`duration-700 ease-in-out ${isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0'} ${props.className || ''}`} 
        {...props} 
      />
    </div>
  )
}
