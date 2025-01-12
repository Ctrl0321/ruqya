import { cn } from '@/lib/utils'

export const Grid = ({ 
  children, 
  className,
  cols = 3,
  gap = 4 
}) => {
  return (
    <div className={cn(
      'grid',
      `grid-cols-1 md:grid-cols-${cols}`,
      `gap-${gap}`,
      className
    )}>
      {children}
    </div>
  )
}