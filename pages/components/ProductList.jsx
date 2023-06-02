import React from "react";
import styles from "../../styles/ProductList.module.css";
import ProductCard from "./ProductCard";

const ProductList = ({ productList }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE BEST FRIES IN TOWN</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit
        aperiam officia corporis laudantium obcaecati! Laborum quia enim, sint,
        placeat accusantium consectetur maiores cum explicabo error cupiditate
        id. Exercitationem, voluptatem sit?
      </p>
      <div className={styles.wrapper}>
        {productList.map((product) => (
          <ProductCard key={product._id} product={product}/>
        ))}
        
     </div>
    </div>
  );
};

export default ProductList;
