import { cn } from '@/lib/utils'

export const Card = ({ children, className }) => {
  return (
    <div className={cn(
      'rounded-lg border bg-card p-4 shadow-sm',
      className
    )}>
      {children}
    </div>
  )
}