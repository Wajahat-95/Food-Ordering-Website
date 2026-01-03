import React from 'react'
import styles from "../styles/Add.module.css"
import axios from "axios";
import { useState } from 'react';
import { useRouter } from 'next/router';

const Add = ({ setClose }) => {
    const [file, setFile] = useState(null)
    const [title, setTitle] = useState(null)
    const [desc, setDesc] = useState(null)
    const [prices, setPrices] = useState([])
    const [extra, setExtra] = useState(null)
    const [extraOptions, setExtraOptions] = useState([])

    const handleExtraInput = (e) => {
        setExtra({...extra, [e.target.name]: e.target.value});
    };
    const handleExtra = (e) => {
        setExtraOptions(prev => [...prev, extra]);
    };
    const changePrice = (e, index) => {
        const currentPrices = prices;
        currentPrices[index] = e.target.value
        setPrices(currentPrices)
    }
    const handleCreate = async () => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "uploads")
        try {
            const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dyzj2vkzi/image/upload", data);
            
            const {url} = uploadRes.data;
            const newProduct = {
                title,
                desc,
                prices,
                extraOptions,
                img:url,
            };
      await axios.post("/api/products", newProduct);
            setClose(true);
        } catch (err) {
      console.error(err);
      alert("Error creating product");
        }
    }
  return (
    <div onClick={() => setClose(false)} className={styles.container}>
        <div className={styles.wrapper}>
            <span onClick={() => setClose(true)} className={styles.close}>X</span>
            <h1>Add a New Product</h1>
            <div className={styles.item}>
                <label className={styles.label}>Choose an image</label>
                <input type="file" onChange={(e) => setFile(e.target.files[0])}/>
            </div>
            <div className={styles.item}>
                <label className={styles.label}>Title</label>
                <input 
                    type="text"
                    onChange={(e => setTitle(e.target.value))}
                    className={styles.input} 
                />
            </div>
            <div className={styles.item}>
                <label className={styles.label}>Description</label>
                <textarea
                    rows={4} 
                    type="text"
                    onChange={(e => setDesc(e.target.value))} 
                />
            </div>
            <div className={styles.item}>
                <label className={styles.label}>Prices</label>
                <div className={styles.priceContainer}>
                <input 
                type="number" 
                placeholder='Small' 
                onChange={(e) => changePrice(e, 0)} 
                className={`${styles.input} ${styles.inputSm} `}
                />
                <input 
                type="number" 
                placeholder='Regular' 
                onChange={(e) => changePrice(e, 1)} 
                className={`${styles.input} ${styles.inputSm} `}
                />
                <input 
                type="number" 
                placeholder='Large' 
                onChange={(e) => changePrice(e, 2)} 
                className={`${styles.input} ${styles.inputSm} `}
                />
                </div>
            </div>
            <div className={styles.item}>
                <label className={styles.label}>Extra</label>
                <div className={styles.extra}>
                    <input 
                        type="text" 
                        name="text"
                        placeholder='Item'
                        onChange={handleExtraInput}
                        className={`${styles.input} ${styles.inputSm}`}  
                    
                    />
                    <input 
                        type="number" 
                        name="price"
                        placeholder='Price'
                        onChange={handleExtraInput}
                        className={`${styles.input} ${styles.inputSm}`}  
                    
                    />
                    <button className={styles.extraButton} onClick={handleExtra}>Add</button>
                </div>
                <div className={styles.extraItems}>
                    {extraOptions.map(option => (
                        <span key={option.text} className={styles.extraItem}>{option.text}</span>
                    ))}
                </div>
            </div>
            <button className={styles.addButton} onClick={handleCreate}>Create</button>

        </div>
      
    </div>
  )
}

export default Add
