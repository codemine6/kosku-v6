import config from 'services/Config'
export const useAuth = null
export const useDb = null

export const getData1 = async (params) => {
    try {
        const res = await fetch(`${config.API_URL}/${params}`, {
            credentials: 'include'
        })
        if (res.ok) {
            const data = await res.json()
            return [data, null]
        } else {
            const {message} = await res.json()
            throw new Error(message)
        }
    } catch (err) {
        return [null, err.message]
    }
}

export const getData = async (params, controller = {signal: {aborted: false}}) => {
    try {
        const res = await fetch(`${config.API_URL}/${params}`, {
            credentials: 'include',
            signal: controller.signal
        })
        if (res.ok) {
            const data = await res.json()
            return [data, null]
        } else {
            const {message} = await res.json()
            throw new Error(message)
        }
    } catch (err) {
        if (!controller.signal.aborted) {
            return [null, err.message]
        } else {
            return [null, null]
        }
    }
}