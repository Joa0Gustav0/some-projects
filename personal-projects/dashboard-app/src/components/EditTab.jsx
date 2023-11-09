import styles from './styles/EditTab.module.css'
import { useState } from 'react'

export default function EditTab( {productsArr, editProductI, closeNClear, saveChanges} ) {

    const [buttonState, setButtonState] = useState('deactivated')

    const validateInputs = () => {
        const pNameInput = document.getElementById("product-input-edit")
        const pPriceInput = document.getElementById("price-input-edit")

        if (pNameInput.value !== "" && pPriceInput.value !== "" && Number(pPriceInput.value) >= 0){
            setButtonState('activated')
        }else {
            setButtonState('deactivated')
        }
    }

    const postNewChanges = () => {
        const pNameInput = document.getElementById("product-input-edit")
        const pPriceInput = document.getElementById("price-input-edit")

        saveChanges(pNameInput.value, Number(pPriceInput.value), editProductI)
        
        pNameInput.value = ""
        pPriceInput.value = ""
    }

    return (
        <>
            <div className={editProductI !== null ? `${styles.safeLayer} ${styles.active}` : styles.safeLayer}></div>
            <div className={editProductI !== null ? `${styles.editTabContainer} ${styles.active}` : styles.editTabContainer}>
                <h1>Edit Product</h1>
                <p>The product you are editing is: <br /><span>{productsArr[editProductI]?.name}</span></p>
                <label htmlFor="product-input-edit">Product:</label>
                <input type="text" id="product-input-edit" onChange={() => validateInputs()} placeholder={productsArr[editProductI]?.name}/>
                <label htmlFor="price-input-edit">Price:</label>
                <input type="number" id="price-input-edit" onChange={() => validateInputs()} placeholder={productsArr[editProductI]?.price}/>
                <button className={buttonState !== 'activated' ? styles.scButton : `${styles.scButton} ${styles.enabled}`} onClick={() => {
                    if (buttonState === 'activated'){
                        postNewChanges()
                    }
                }}>Save Changes</button>
                <button className={styles.delButton}
                onClick={() => {
                    const pNameInput = document.getElementById("product-input-edit")
                    const pPriceInput = document.getElementById("price-input-edit")

                    pNameInput.value = ""
                    pPriceInput.value = ""

                    closeNClear('del', editProductI)
                }}><ion-icon name="trash"></ion-icon></button>
                <ion-icon name="close" onClick={() => {
                    const pNameInput = document.getElementById("product-input-edit")
                    const pPriceInput = document.getElementById("price-input-edit")

                    pNameInput.value = ""
                    pPriceInput.value = ""

                    closeNClear()
                }}></ion-icon>
            </div>
        </>
    )
}