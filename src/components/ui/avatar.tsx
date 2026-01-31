import React from 'react'

export interface AvatarProps {
  src?: string | null
  initials?: string
  alt?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Avatar({
  src,
  initials,
  alt = 'Avatar',
  size: _size = 'md',
  className = '',
}: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`rounded-full object-cover ${className}`}
      />
    )
  }

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300 font-medium ${className}`}
    >
      {initials}
    </div>
  )
}
