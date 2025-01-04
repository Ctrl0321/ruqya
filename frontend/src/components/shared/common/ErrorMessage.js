
export const ErrorMessage = ({ message = 'Something went wrong' }) => {
  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-md">
      <p className="text-red-600">{message}</p>
    </div>
  )
}