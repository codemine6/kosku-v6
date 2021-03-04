import {useReducer, useEffect, useContext, createContext} from 'react'

const initialState = {
    availableRooms: 0,
    customerType: 'all',
    description: '',
    facilities: [],
    images: [],
    location: {
        address: '',
        city: '',
        coords: [-6.917464, 107.619125]
    },
    name: '',
    pricing: {
        price: 0,
        type: 'bulan'
    },
    roomType: 'kost',
    rules: ''
}

function reducer(state, action) {
    switch (action.type) {
        case 'SET_AVAILABLE':
            return {...state, availableRooms: action.payload}
        case 'SET_ADDRESS':
            return {...state, location: {...state.location, address: action.payload}}
        case 'SET_CITY':
            return {...state, location: {...state.location, city: action.payload}}
        case 'SET_COORDS':
            return {...state, location: {...state.location, coords: action.payload}}
        case 'SET_CUSTOMER':
            return {...state, customerType: action.payload}
        case 'SET_DESCRIPTION':
            return {...state, description: action.payload}
        case 'SET_FACILITIES':
            return {...state, facilities: action.payload}
        case 'SET_IMAGES':
            return {...state, images: action.payload}
        case 'SET_NAME':
            return {...state, name: action.payload}
        case 'SET_PRICE':
            return {...state, pricing: {...state.pricing, price: action.payload}}
        case 'SET_PRICING_TYPE':
            return {...state, pricing: {...state.pricing, type: action.payload}}
        case 'SET_ROOM_TYPE':
            return {...state, roomType: action.payload}
        case 'SET_RULES':
            return {...state, rules: action.payload}
        case 'SET_ALL':
            return action.payload
        case 'SET_DEFAULT':
            localStorage.removeItem('form-data')
            return initialState
        default:
            return state
    }
}

const RoomFormContext = createContext()

export function useFormContext() {
    return useContext(RoomFormContext)
}

export function RoomFormContextProvider(props) {
    const [form, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        const storage = JSON.parse(localStorage.getItem('form-data'))
        storage && dispatch({type: 'SET_ALL', payload: storage})
    }, [])

    useEffect(() => {
        form !== initialState && localStorage.setItem('form-data', JSON.stringify(form))
    }, [form])

    return (
        <RoomFormContext.Provider value={{form, dispatch}}>
            {props.children}
        </RoomFormContext.Provider>
    )
}