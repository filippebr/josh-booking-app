import { useEffect, useState } from 'react'
import Spinner from './Spinner'

function Menu() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000) // Set the desired delay in milliseconds (e.g., 3000 for 3 seconds)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div>{isLoading ? <Spinner /> : <div>Your actual content...</div>}</div>
  )
}

export default Menu
