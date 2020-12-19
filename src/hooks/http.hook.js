import { useCallback, useState } from 'react'

export const useHttp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const request = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setLoading(true)
      try {
        if (body) {
          body = JSON.stringify(body)
          headers['Content-Type'] = 'application/json'
        }
        const response = await fetch(url, {
          method,
          body,
          headers,
        })
        let data = await response.json()
        if (!response.ok) {
          throw new Error(data.error.message)
        }

        setLoading(false)
        return data
      } catch (e) {
        setLoading(false)
        setError(e.message)
        return false
      }
    },
    []
  )

  const clearError = useCallback(() => setError(null), [])

  return { loading, request, error, clearError }
}
