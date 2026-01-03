import React from "react";
import styles from "../styles/Footer.module.css";
import Image from "next/image";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src="/img/footerimg.jpg" alt="" layout="fill" />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>
            OH YES, WE DID. THE FRIES VERSE, THE BEST FRIES IN TOWN
          </h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>FIND OUR RESTURAUNT</h1>
          <p className={styles.text}>
            Judicial Society 3 DHA EME.
            <br /> Lahore, 53711
            <br /> +92-312-3577654
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>WORKING HOURS</h1>
          <p className={styles.text}>
            MONDAY - FRIDAY
            <br /> 12:00PM - 10:00PM
          </p>
          <p className={styles.text}>
            SATURDAY - SUNDAY
            <br /> 12:00PM - 07:00PM
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
