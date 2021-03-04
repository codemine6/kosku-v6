import {Suspense, lazy} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {AuthContextProvider} from 'contexts/AuthContext'
import {RoomFormContextProvider} from 'contexts/RoomFormContext'
import {CustomerRoute, OwnerRoute, ProtectRoute} from 'services/Routes'
import Loader from 'components/Loader/Loader'

const AddRoom = lazy(() => import('pages/AddRoom/AddRoom'))
const BookingDetail = lazy(() => import('pages/BookingDetail/BookingDetail'))
const BookingFinish = lazy(() => import('pages/BookingFinish/BookingFinish'))
const BookingList = lazy(() => import('pages/BookingList/BookingList'))
const ChatDetail = lazy(() => import('pages/ChatDetail/ChatDetail'))
const ChatList = lazy(() => import('pages/ChatList/ChatList'))
const Dashboard = lazy(() => import('pages/Dashboard/Dashboard'))
const EditProfile = lazy(() => import('pages/EditProfile/EditProfile'))
const EditRoom = lazy(() => import('pages/EditRoom/EditRoom'))
const Favorites = lazy(() => import('pages/Favorites/Favorites'))
const Home = lazy(() => import('pages/Home/Home'))
const Login = lazy(() => import('pages/Login/Login'))
const MyReview = lazy(() => import('pages/MyReview/MyReview'))
const NearestLocation = lazy(() => import('pages/NearestLocation/NearestLocation'))
const NewBooking = lazy(() => import('pages/NewBooking/NewBooking'))
const NotFound = lazy(() => import('pages/NotFound/NotFound'))
const Profile = lazy(() => import('pages/Profile/Profile'))
const Promo = lazy(() => import('pages/Promo/Promo'))
const PromoDetail = lazy(() => import('pages/PromoDetail/PromoDetail'))
const Recovery = lazy(() => import('pages/Recovery/Recovery'))
const Register = lazy(() => import('pages/Register/Register'))
const ReviewList = lazy(() => import('pages/ReviewList/ReviewList'))
const RoomBooking = lazy(() => import('pages/RoomBooking/RoomBooking'))
const RoomDetail = lazy(() => import('pages/RoomDetail/RoomDetail'))
const RoomList = lazy(() => import('pages/RoomList/RoomList'))
const RoomLocation = lazy(() => import('pages/RoomLocation/RoomLocation'))
const RoomReview = lazy(() => import('pages/RoomReview/RoomReview'))
const Search = lazy(() => import('pages/Search/Search'))
const SetPosition = lazy(() => import('pages/SetPosition/SetPosition'))
const Settings = lazy(() => import('pages/Settings/Settings'))
const UserDetail = lazy(() => import('pages/UserDetail/UserDetail'))
const Verification = lazy(() => import('pages/Verification/Verification'))

export default function App() {
    return (
        <AuthContextProvider>
        <RoomFormContextProvider>
            <BrowserRouter>
                <Suspense fallback={<Loader/>}>
                    <Switch>
                        <ProtectRoute path='/bookings'><BookingList/></ProtectRoute>
                        <ProtectRoute path='/booking/:id'><BookingDetail/></ProtectRoute>
                        <ProtectRoute path='/chats'><ChatList/></ProtectRoute>
                        <ProtectRoute path='/chat/:id'><ChatDetail/></ProtectRoute>
                        <ProtectRoute path='/profile'><Profile/></ProtectRoute>
                        <ProtectRoute path='/edit-profile'><EditProfile/></ProtectRoute>
                        <ProtectRoute path='/settings'><Settings/></ProtectRoute>

                        <OwnerRoute path='/set-position'><SetPosition/></OwnerRoute>
                        <OwnerRoute path='/dashboard'><Dashboard/></OwnerRoute>
                        <OwnerRoute path='/rooms'><RoomList/></OwnerRoute>
                        <OwnerRoute path='/add-room'><AddRoom/></OwnerRoute>
                        <OwnerRoute path='/edit-room/:id'><EditRoom/></OwnerRoute>
                        <OwnerRoute path='/reviews'><ReviewList/></OwnerRoute>
                        <OwnerRoute path='/room/:id/bookings'><RoomBooking/></OwnerRoute>

                        <CustomerRoute path='/room/:id/my-review'><MyReview/></CustomerRoute>
                        <CustomerRoute path='/new-booking'><NewBooking/></CustomerRoute>
                        <CustomerRoute path='/booking-finish'><BookingFinish/></CustomerRoute>
                        <CustomerRoute path='/favorites'><Favorites/></CustomerRoute>

                        <Route path='/login'><Login/></Route>
                        <Route path='/register'><Register/></Route>
                        <Route path='/verification'><Verification/></Route>
                        <Route path='/' exact><Home/></Route>
                        <Route path='/user/:id'><UserDetail/></Route>
                        <Route path='/room/:id' exact><RoomDetail/></Route>
                        <Route path='/room/:id/reviews'><RoomReview/></Route>
                        <Route path='/room/:id/location'><RoomLocation/></Route>
                        <Route path='/promo' exact><Promo/></Route>
                        <Route path='/promo/:id'><PromoDetail/></Route>
                        <Route path='/search'><Search/></Route>
                        <Route path='/nearest'><NearestLocation/></Route>
                        <Route path='/recovery'><Recovery/></Route>
                        <Route path='*'><NotFound/></Route>
                    </Switch>
                </Suspense>
            </BrowserRouter>
        </RoomFormContextProvider>
        </AuthContextProvider>
    )
}