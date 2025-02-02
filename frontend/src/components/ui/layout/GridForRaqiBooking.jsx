import React from 'react';
import { cn } from '@/lib/utils'

const Grid = ({ 
  children, 
  className,
  gap = 4,
  minWidth = '150px' // Add minWidth prop for auto-fit
}) => {
  return (
    <div className={cn(
      'grid',
      'w-full',
      `gap-${gap}`,
      className
    )}
    style={{
      gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}, 1fr))`
    }}>
      {children}
    </div>
  )
}

export default Grid;

