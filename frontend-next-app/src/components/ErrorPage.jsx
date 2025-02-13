export default function ErrorPage({ errorMessage, statusCode, children }) {
  return (
    <div className='w-full  p-10 flex justify-start items-center flex-col'>
      <div className='w-2/3 p-4 flex flex-col gap-10'>
        <h1 className='text-6xl font-bold text-destructive'>Wystąpił problem!</h1>
        <div>
          <h1 className='text-2xl font-bold'>
            {errorMessage} {statusCode && `(${statusCode})`}
          </h1>
          {children}
        </div>
      </div>
    </div>
  )
}
