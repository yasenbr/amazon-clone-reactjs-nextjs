const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  console.log(req.body);
  const { items, email } = req.body;

  const transformedItems = items.map((item) => ({
    description: item.description,
    quantity: item.qty,
    price_data: {
      currency: "eur",
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        images: [item.image],
      },
    },
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_rates: ["shr_1KsvIoD8fw3hZhoiuGAPkC7v"],
    shipping_address_collection: {
      allowed_countries: ["GB", "FR", "BG", "IT"],
    },
    line_items: transformedItems,
    mode: "payment",
    success_url: `${process.env.HOST}/SUCCESS`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item) => item.image)),
    },
  });
  console.log("20", session.id);
  res.status(200).json({ id: session.id });
};
