import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import Add from "../components/Add";
import AddButton from "../components/AddButton";
import Featured from "../components/Featured";
import ProductList from "../components/ProductList";

export default function Home({ productList, admin }) {
  const [close, setClose] = useState(true);
  return (
    <div>
      <Head>
        <title>Fries Startup</title>
        <meta name="description" content="Best Fries shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      {admin && <AddButton setClose={setClose} />}
      <ProductList productList={productList}/>
      {!close && <Add setClose={setClose} />}
    </div>
  );
}
export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if(myCookie.token === process.env.TOKEN){
    admin = true;
  }
  const res = await axios.get(`${process.env.API_URL || 'http://localhost:3000'}/api/products`);
  return{
    props:{
      productList: res.data,
      admin
    }
  }
}