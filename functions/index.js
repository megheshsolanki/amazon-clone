/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51NBtNDSDJVqAknE0vQ8UCOIKx3lfc8Nf0k0tXb9x4wvkiL3GkVL39geoB2LszcZp9lFRaVeULgSS1QtfSzfbJUOZ009Hv4KpgP"
);

//App Config
const app = express();

//Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

//API Routes
app.get("/", (req, res, next) => {
  res.status(200).send("hello world!");
});

// app.post("/payments/create", async (req, res, next) => {
//   try {
//     const total = req.query.total;
//     console.log("total amount is", total);

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: total, //subunits of currency
//       currency: "usd",
//       automatic_payment_methods: {
//         enabled: true,
//       },
//     });

//     res.status(201).send({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (e) {
//     console.log(e.message);
//   }
// });

// const storeItems = new Map([
//   [1, { priceInCents: 10000, name: "Learn React Today" }],
//   [2, { priceInCents: 20000, name: "Learn CSS Today" }],
// ]);

app.post("/payments/create", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.title,
            },
            unit_amount: item.price * 100,
          },
          quantity:1,
        };
      }),
      success_url: `http://localhost:3000/`,
      cancel_url: `http://localhost:3000/checkout`,
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//Listen command
exports.api = onRequest(app);
