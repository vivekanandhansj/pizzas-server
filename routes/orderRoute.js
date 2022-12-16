const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
require("dotenv").config;
const stripe = Stripe(
  "sk_test_51LRDdQI6WesfoGHtcY6ITG7KD4lJEnSOb9vUxWF2gNX7Gl7dUs5v3kBL3r2Y7DQWPC13VrS0Kwht2fyGUuIXwq6700BIfbTICG"
);
const { v4: uuidv4 } = require("uuid");
const Order = require("../models/orderModel");

//-------------The charges api will not work if the stripe account is registerd in India.
//-------------Better register the stripe account in United State.

//------------- If not use this paymentIntents 3D secure transaction code.
/*router.post('/placeorder',(req,res)=>{
    const{token,amount,user,cartItem} = req.body;
    console.log(user)
    stripe.customers.create({
        email:token.email,
        source:token.id
    },(error,customer)=>{
        if(customer){
            stripe.paymentIntents.create({
                amount:amount*100,
                currency:'INR',
                customer:customer.id,
                payment_method_types: ['card'],
            },(err,result)=>{
                if(result){
                    const id =result.id;
                    console.log(id);
                    stripe.paymentIntents.confirm(
                        id,
                        {payment_method: 'pm_card_visa'},
                    ).then((e,r)=>{
                        if(e)
                            console.log(e);
                        if(r){
                            stripe.paymentIntents.capture(result.id,(er,re)=>{
                                if(er){
                                    console.log(er);
                                }
                                if(re){
                                    console.log(re);
                                }
                            })
                        }
                    })
                    res.send("Payment Done");
                }
                if(err){
                    console.log(err);
                    return res.status(400).json({message:"PaymentIndenet"});
                }
            })
        }
        if(error){
            console.log(error);
            return res.status(400).json({message:"create customers"});
        }
    })

});*/

router.post("/placeorder", async (req, res) => {
  const { token, amount, user, cartItem } = req.body;
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: amount * 100,
        currency: "inr",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );
    if (payment) {
      const order = new Order({
        userid: user._id,
        name: user.username,
        email: user.email,
        orderItem: cartItem,
        orderAmount: amount,
        shippingAddress: {
          street: token.card.address_line1,
          city: token.card.address_city,
          country: token.card.address_country,
          pincode: token.card.address_zip,
        },
        transactionId: payment.source.id,
      });
      order.save();
      res.send("Order placed successfully");
    } else {
      res.send("Payment failed");
    }
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" + error });
  }
});

router.post("/userorders", (req, res) => {
  const { userid } = req.body;
  Order.find({ userid: userid })
    .sort({ createdAt: -1 })
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      return res.status(400).json({ message: "Results not found" + error });
    });
});

router.get("/allorders", (req, res) => {
  Order.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(400).json({ message: "Error" });
    });
});

router.post("/updateorder", (req, res) => {
  const { id, dp } = req.body;
  console.log(dp);
  Order.findByIdAndUpdate(id, { dp: dp })
    .then((result) => {
      //console.log(result);
      res.send(result);
    })
    .catch((error) => {
      res.status(400).json({ message: "Error" });
    });
});

router.post("/updatestatus", (req, res) => {
  const { id, status } = req.body;
  Order.findByIdAndUpdate(id, { isDelivered: status })
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(400).json({ message: error });
    });
});

module.exports = router;
