import React from 'react'
import { Spinner } from './ui/spinner'

function LoadingFallback() {
  return (
     <div className="flex items-center flex-col gap-4 justify-center h-screen">
    <Spinner size="lg" /> <span>Loading...</span>
  </div>
  )
}

export default LoadingFallback