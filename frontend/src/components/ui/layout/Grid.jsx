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
      `md:grid-cols-${Math.min(cols, 2)}`,
      `ipad-landscape:grid-cols-${Math.min(cols, 3)}`,
      `lg:grid-cols-${Math.min(cols, 3)}`,
      `xl:grid-cols-${cols}`, // Ensure one row for desktop view
      `2xl:grid-cols-${cols}`, // Ensure one row for desktop view
      `3xl:grid-cols-${cols}`, // Ensure one row for desktop view
      `gap-${gap}`,
      'my-4', // Margin
      'place-items-center', // Center items in the grid
      className
    )}>
      {children}
    </div>
  )
}

export default Grid;

