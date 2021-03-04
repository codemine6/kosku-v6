import {useHistory} from 'react-router-dom'
import styles from './NavbarChat.module.css'

import {ChevronLeft, More} from 'Icons'

export default function NavChat({user, toggleMenu}) {
    let history = useHistory()

    return (
        <nav className={styles.navbar}>
            <i onClick={() => history.goBack()}><ChevronLeft/></i>
            {user && <div className={styles.user}>
                <img src={user.profileImage} alt="" onClick={() => history.push(`/user/${user._id}`)}/>
                <div>
                    <h4>{user.username}</h4>
                    <p>{user.userType === 'owner' ? 'Pemilik kost' : 'Penyewa kost'}</p>
                </div>
            </div>}
            <i className={styles.more} onClick={toggleMenu}><More/></i>
        </nav>
    )
}