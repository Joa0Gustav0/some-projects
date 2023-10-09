import whiteLogo from '../media/aurora-logo-white.png'
import styles from './styles/FavoritesContainer.module.css'

export default function FavoritesContainer({favoritesArray, favTabState, closeEvent}){

    return (
        <div className={`${styles.favcontainer} ${favTabState}`}>
            <h1 className={styles.favTitle}><ion-icon name="heart"></ion-icon>Favorites:</h1>
            <div className={`favoritesList ${styles.favList}`}>
                {favoritesArray.length === 0 && (
                    <>
                        <img className={styles.nofavImage} src={whiteLogo} alt="aurora-logo"/>
                        <h1 className={styles.nofavText}>It seens you do not have any favorites...</h1>
                    </>
                )}
            </div>
            <ion-icon name="close" onClick={closeEvent}></ion-icon>
        </div>
    )
}