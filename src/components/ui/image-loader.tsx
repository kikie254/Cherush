'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { ImageProps } from 'next/image'

// Omit className so we can type-safely handle it ourselves
type OptimizedImageProps = Omit<ImageProps, 'className'> & {
  className?: string
}

/**
 * OptimizedImage — Next/Image wrapper with a graceful blur-in reveal.
 *
 * CLS fix: no extra wrapping <div>. The blur is applied directly on the
 * <Image> element so the parent's layout box is not disturbed.
 * The parent MUST have `position: relative` and defined dimensions (fill mode)
 * or explicit width/height (fixed mode).
 */
export function OptimizedImage({ src, alt, className = '', ...props }: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <Image
      src={src}
      alt={alt}
      onLoad={() => setLoaded(true)}
      className={`transition-[filter,transform] duration-500 ease-in-out ${
        loaded ? 'blur-0 scale-100' : 'blur-sm scale-[1.02]'
      } ${className}`}
      {...props}
    />
  )
}
