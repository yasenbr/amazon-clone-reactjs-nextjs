import { getSession } from "next-auth/react";
import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";

export default function Home({ products }) {
  return (
    <div className="bg-gray-100">
      <Head>Amazon 2.0</Head>
      <Header />
      <main className="max-w-screen-2xl mx-auto">
        {/**Banner */}
        <Banner />
        {/**Product feed */}
        <ProductFeed products={products} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  // process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
  const session = await getSession(context);
  const products = await fetch("http://fakestoreapi.com/products").then((res) =>
    res.json()
  );
  return {
    props: {
      products,
      session,
    },
  };
}
