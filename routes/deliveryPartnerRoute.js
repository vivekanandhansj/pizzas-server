const express = require("express");
const router = express.Router();
const DeliveryPartner = require("../models/deliveryPartner");

router.post("/register", (req, res) => {
  const { username, phoneNumber, password } = req.body;
  const deliveryPartner = new DeliveryPartner({
    username: username,
    phonenumber: phoneNumber,
    password: password,
  });
  deliveryPartner
    .save()
    .then((result) => {
      res.send("Regsitered successfully");
    })
    .catch((error) => {
      res.status(404).json({ message: error });
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  DeliveryPartner.find({ username, password })
    .then((result) => {
      const deliveryPartner = {
        username: result[0].username,
        phoneNumber: result[0].phonenumber,
      };
      //console.log(result[0].username);  --- for checking
      res.send(deliveryPartner);
    })
    .catch((error) => {
      res.status(404).json({ message: error });
    });
});

router.post("/getdp", (req, res) => {
  const { username } = req.body;
  //console.log(username);
  DeliveryPartner.find({ username })
    .then((result) => {
      res.send(result[0].phonenumber);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
