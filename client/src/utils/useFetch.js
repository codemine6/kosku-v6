import {useState, useEffect} from 'react'
import config from 'services/Config'

export default function useFetch(params) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const controller = new AbortController()
        async function fetchData() {
            try {
                const res = await fetch(`${config.API_URL}/${params}`, {
                    credentials: 'include',
                    signal: controller.signal
                })
                if (res.ok) {
                    setData(await res.json())
                    setLoading(false)
                } else {
                    setLoading(false)
                    const {message} = await res.json()
                    throw new Error(message)
                }
            } catch (err) {
                if (!controller.signal.aborted) {
                    setError(err.message)
                }
            }
        }
        fetchData()

        return () => controller.abort()
    }, [params])

    return [data, loading, error]
}