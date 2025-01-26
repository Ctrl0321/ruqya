import React from 'react';
import { cn } from '@/lib/utils'

const Grid = ({ 
  children, 
  className,
  gap = 4 
}) => {
  const childCount = React.Children.count(children);
  const cols = Math.min(childCount, 6); // Limit to a maximum of 6 columns

  return (
    <div className={cn(
      'grid',
      'grid-cols-1',
      `md:grid-cols-${Math.min(cols, 1)}`,
      `lg:grid-cols-${Math.min(cols, 1)}`,
      `xl:grid-cols-${Math.min(cols, 3)}`,
      `2xl:grid-cols-${Math.min(cols, 4)}`,
      `3xl:grid-cols-${Math.min(cols, 5)}`,
      `gap-${gap}`,
      // 'mx-auto', // Center alignment
      'my-4', // Margin
      className
    )}>
      {children}
    </div>
  )
}

export default Grid;