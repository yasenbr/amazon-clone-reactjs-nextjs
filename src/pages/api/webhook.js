import { buffer } from "micro";
import * as admin from "firebase-admin";

//secure connection to firebase BK

const serviceAccount = require("../../../permission.json");

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

//establish stripe connection
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfilOrder = async (session) => {
  // console.log("order", session);
  return app
    .firestore()
    .collection("users")
    .doc(session.metadate.email)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_detail.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log(`SUCCESS: Order ${session.id} has been registred in the DB`);
    });
};

export default async (req, res) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];
    console.log(payload, sig, endpointSecret);

    let event;
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.log("ERROR", err.message);
      return res.status(400).send(`webhook error: ${err.message}`);
    }

    //handle the chekout session if it complete.
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      return fulfilOrder(session)
        .then(() => res.status(200))
        .catch((err) =>
          res.status(400).send(`Webhook Error: ${session.message}`)
        );
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
