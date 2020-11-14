const router = require('express').Router();
const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const stripe = require("stripe")("sk_test_51Hn21bJDJbmlLgF3iGnEdU2w6W6vrpz61a7cv5p5zGhl15Y0LgUN9q1wvsZ4BsjyGkJGLuEkqfGRpsIIM62xlLCN004XHBJENE");
const { v4: uuidv4 } = require('uuid');
// uuidv4();

router.post("/checkout", async (req, res) => {
    console.log("Request:", req.body);
    let status = '';
    try {
      const { checkout, token } = req.body;
      console.log(checkout);
  
      const customer = await stripe.customers.create({
        email: token.email,
        source: token.id
      });
  
      const idempotencyKey = uuidv4();
      const charge = await stripe.charges.create(
        {
          amount: checkout.fee,
          description: checkout.name,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          shipping: {
            name: token.card.name,
            address: {
              line1: token.card.address_line1,
              city: token.card.address_city,
              country: token.card.address_country,
              postal_code: token.card.address_zip
            }
          }
        },
        {
          idempotencyKey
        }
      );
      console.log("Charge:", { charge });
      status = "success";
    } catch (error) {
      console.error("Error:", error);
      status = "failure";
    }
  
    res.json({status});
  });


  router.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'T-shirt',
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
    });
  
    res.json({ id: session.id });
  });



module.exports = router;