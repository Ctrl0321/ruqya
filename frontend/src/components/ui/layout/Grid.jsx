import React from 'react';
import { cn } from '@/lib/utils'
import '@/styles/animations.css'; // Import the animations CSS

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
      `xl:grid-cols-${Math.min(cols, 4)}`, 
      `2xl:grid-cols-${Math.min(cols, 4)}`,
      `3xl:grid-cols-${cols}`, 
      `4xl:grid-cols-${cols}`,
      `5xl:grid-cols-${cols}`,
      `gap-${gap}`,
      'my-4', 
      'place-items-center', 
      className
    )}>
      {React.Children.map(children, (child, index) => (
        <div className="animate-fade-in" style={{ animationDelay: `${index * 500}ms` }}>
          {child}
        </div>
      ))}
    </div>
  )
}

export default Grid;

