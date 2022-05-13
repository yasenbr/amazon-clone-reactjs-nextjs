import moment from "moment";
import { getSession, useSession } from "next-auth/react";
import Header from "../components/Header";
import React from "react";
import db from "../../firebase";
import Order from "../components/order";

function Orders({ orders }) {
  const { data: session } = useSession();
  console.log(orders);
  return (
    <div>
      <Header />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>
        {session ? (
          <h2>X Orders</h2>
        ) : (
          <h2>Please signe in to see your orders</h2>
        )}
      </main>
      <div className="mt-5 space-y-4">
        {orders?.map((order) => (
          <Order />
        ))}
      </div>
    </div>
  );
}

export default Orders;

export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  //Get user credentiel if logged
  const session = await getSession(context);
  if (!session) {
    return {
      props: {},
    };
  }
  //get info on front end from firebase confg
  //firebase db
  const stripeOrders = await db
    .collection("users")
    .doc(session.user.email)
    .collection("orders")
    .orderBy("timestamp", "desc")
    .get();

  //stripe orders

  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );

  return {
    props: {
      orders,
    },
  };
}
