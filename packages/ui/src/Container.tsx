import type { HTMLAttributes } from 'react'
import { cn } from './cn'

type Size = 'sm' | 'md' | 'lg' | 'xl'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: Size
  as?: 'div' | 'section' | 'article' | 'header' | 'footer' | 'main'
}

const sizeMap: Record<Size, string> = {
  sm: 'max-w-2xl',
  md: 'max-w-3xl',
  lg: 'max-w-5xl',
  xl: 'max-w-7xl',
}

export function Container({
  size = 'xl',
  as: Tag = 'div',
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <Tag className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', sizeMap[size], className)} {...rest}>
      {children}
    </Tag>
  )
}
