import styles from './styles/DataList.module.css'

export default function DataList( {productsArr} ) {
    return (
        <aside className={styles.dataListContainer}>
            <h1>Products <span>({productsArr.length} items)</span></h1>
            <div className={styles.dataList__List} style={productsArr?.length > 0 ? {justifyContent: "flex-start"} : {justifyContent: "center"}}>

                {
                    productsArr?.length > 0 ?
                    productsArr.map((elem, i) => (
                        <div key={elem.name + i} className={styles.productContainer}>
                            <abbr title={elem.name}>
                                <h1>{elem.name}</h1>
                            </abbr>
                            <h2>${elem.price.toFixed(2)}</h2>
                            <button>Add ocurrences</button>
                        </div> 
                    ))
                    :
                    <p>No products were added... </p>
                }

            </div>
        </aside>
    )
}