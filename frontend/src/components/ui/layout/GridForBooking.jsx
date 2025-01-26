import React from 'react';
import { cn } from '@/lib/utils'

const Grid = ({ 
  children, 
  className,
  gap = 4
}) => {
  const childCount = React.Children.count(children);
  const cols = Math.min(childCount, 6);

  return (
    <div className={cn(
      'grid',
      'grid-cols-1',
      `md:grid-cols-1`,
      // `ipad-landscape:grid-cols-${Math.min(cols, 2)}`,
      `lg:grid-cols-2`,
      `xl:grid-cols-3`,
      `2xl:grid-cols-3`,
      `3xl:grid-cols-5`,
      `gap-${gap}`,
      'my-4',
      className
    )}>
      {children}
    </div>
  )
}

export default Grid;