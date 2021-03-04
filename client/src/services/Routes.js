import {Route, Redirect} from 'react-router-dom'
import {useAuthContext} from 'contexts/AuthContext'

import Loader from 'components/Loader/Loader'

export function CustomerRoute({children, ...rest}) {
    const {auth} = useAuthContext()

    return auth !== undefined ? (
        <Route {...rest} render={({location}) =>
            auth ? (auth.type === 'customer' ? children : <Redirect to='/404'/>)
            : <Redirect to={{pathname: '/login', state: {from: location.pathname}}}/>
        }/>
    ) : <Loader/>
}

export function OwnerRoute({children, ...rest}) {
    const {auth} = useAuthContext()

    return auth !== undefined ? (
        <Route {...rest} render={({location}) =>
            auth ? (auth.type === 'owner' ? children : <Redirect to='/404'/>)
            : <Redirect to={{pathname: '/login', state: {from: location.pathname}}}/>
        }/>
    ) : <Loader/>
}

export function ProtectRoute({children, ...rest}) {
    const {auth} = useAuthContext()

    return auth !== undefined ? (
        <Route {...rest} render={({location}) =>
            auth ? children : <Redirect to={{pathname: '/login', state: {from: location.pathname}}}/>
        }/>
    ) : <Loader/>
}