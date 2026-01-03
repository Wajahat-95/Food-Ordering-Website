import React from "react";
import styles from "../styles/ProductList.module.css";
import ProductCard from "./ProductCard";

const ProductList = ({ productList }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE BEST FRIES IN TOWN</h1>
      <p className={styles.desc}>
        Experience the crunch of our hand-cut, double-fried potatoes. Seasoned with our secret blend of spices and served with love. Best enjoyed with friends and family.
      </p>
      <div className={styles.wrapper}>
        {productList && productList.map((product) => (
          <ProductCard key={product._id} product={product}/>
        ))}
        
     </div>
    </div>
  );
};

export default ProductList;
