import React, { useState } from "react";
import styles from "../styles/Featured.module.css";
import Image from "next/image";

const Featured = () => {
  const [index, setIndex] = useState(0);
  const images = [
    "/img/featured1.png",
    "/img/featured2.png",
    "/img/featured3.png",
  ];

  const handleArrow = (direction) =>{
    if(direction==="l"){
        setIndex(index !== 0 ? index-1 : 2)
    }
    if(direction==="r"){
        setIndex(index !== 2 ? index+1 : 0)
    }
}
  return (
    <div
      className={styles.container}
      style={{ left: 0 }}
      onClick={() => handleArrow("l")}
    >
      <div className={styles.arrowContainer}>
        <Image
          src="/img/left-arrow.png"
          alt=""
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div
        className={styles.wrapper}
        style={{ transform: `translateX(${-100 * index}vw)` }}
      >
        {images.map((img, i) => (
          <div className={styles.imgContainer} key={i}>
            <Image
              src={img}
              alt=""
              layout="fill"
              objectFit="contain"
              priority="true"
            />
          </div>
        ))}
      </div>

      <div
        className={styles.arrowContainer}
        style={{ right: 0 }}
        onClick={() => handleArrow("r")}
      >
        <Image
          src="/img/right-arrow.png"
          alt=""
          layout="fill"
          objectFit="contain"
        />
      </div>
    </div>
  );
};

export default Featured;
