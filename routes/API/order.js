const route = require("express").Router();
const fetch = require("node-fetch");

route.post("/", function (req, res) {
  let id = req.body.orderid;
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
        if(list.length != 0){
            res.render("orderinfo", { id, list });
        }
        else{
            res.render("error", {id});
        }
      });
  }
});

exports = module.exports = { route };
