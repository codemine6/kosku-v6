import {useState, useEffect, useContext, createContext} from 'react'
import config from 'services/Config'

const AuthContext = createContext()

export function useAuthContext() {
    return useContext(AuthContext)
}

export function AuthContextProvider(props) {
    const [auth, setAuth] = useState()
    console.log('Context', auth)

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`${config.API_URL}/auth/status`, {
                method: 'GET',
                credentials: 'include'
            })
            const result = await res.json()
            setAuth(result)
        }
        fetchData()
    }, [])

    return (
        <AuthContext.Provider value={{auth, dispatch: setAuth}}>
            {props.children}
        </AuthContext.Provider>
    )
}