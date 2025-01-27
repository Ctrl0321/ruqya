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
      `grid-cols-${Math.min(cols, 1)}`,
      `md:grid-cols-3`,
      `lg:grid-cols-4`,
      `xl:grid-cols-${cols}`, // Ensure one row for desktop view
      `2xl:grid-cols-${cols}`, // Ensure one row for desktop view
      `3xl:grid-cols-${cols}`, // Ensure one row for desktop view
      `gap-${gap}`,
      'my-4', // Margin
      className
    )}>
      {children}
    </div>
  )
}

export default Grid;