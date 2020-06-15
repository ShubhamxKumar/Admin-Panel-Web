const route = require("express").Router();
const fetch = require("node-fetch");
const axios = require("axios");
const { response } = require("express");

route.post("/", function (req, res) {
  let id = req.body.orderid;
  let curstatus = "";
  if (!id || id.length == 0) {
    res.send("No Order Id was Provided!!!");
  } else {
    fetch(
      `http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/order/items/${id}`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        let list = data["response"];
        if (list.length != 0) {
          fetch(
            `http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/orders`
          )
            .then(function (response) {
              return response.json();
            })
            .then(function (json) {
              var item = json["response"].find((obj) => obj.order_id == id);
              curstatus = item.status_of_order;
              console.log(`Current : ${curstatus}`);
              res.render("orderinfo", { id, list, curstatus });
            });
        } else {
          res.render("error", { id });
        }
      });
  }
});

route.post("/status", async function (req, res) {
  try {
    console.log(req.body.status);
    console.log(req.body.id);
    const response = await axios.put(
      `http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/orders/status/${req.body.id}`,
      {
        status: req.body.status,
      }
    );
    console.log(response.data);
    let id = req.body.id;
    let status = req.body.status;
    res.render('status', {id, status});
  } catch (err) {
    console.log(err);
    res.send(err);
  }

});

exports = module.exports = { route };
