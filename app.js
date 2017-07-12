const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const VendingMachine = require('./models/vendingMachine');
const CustomerItem = require('./models/customers');
const nodeEnv = process.env.NODE_ENV || 'development';
const config = require('./config.json')[nodeEnv];

mongoose.Promise = require('bluebird');
mongoose.connect(config.mongoURL);

app.use(bodyParser.json());


// app.delete("/api/vendingMachine/:id", (req, res)=>{
//   VendingMachine.delete({where: {id: req.params.id}}).save().then(items=>{
//     res.json(items);
//   })
// })

app.get("/api/customer/items", (req, res)=>{
  VendingMachine.find({}).then(items=>{
    res.json(items);
  });
});

app.post("/api/customer/items/:itemId/purchases", (req, res)=>{
  const newPurchase = new CustomerItem (req.body).save().then(item=>{
    res.status(201).json({});
  });
});

app.get("/api/vendor/purchases", (req, res)=>{
CustomerItem.find({}).then(items=>{
  res.json(items);
});
});

app.get("/api/vendor/money", (req, res)=>{
  CustomerItem.find({}).select('money_required -_id').then(items=>{
    for (var i = 0; i < items.length; i++) {
      var stuff = items[i]
      var total = stuff.money_required
    }
    res.json(total);
  })
})

app.post("/api/vendor/items", (req, res)=>{
  const newItem = new VendorMachine (req.body).save().then(item=>{
    res.status(201).json({});
  })
})

app.put("/api/vendor/items/:itemId", (req, res)=>{

})










app.get("/api/sanity", (req, res)=>{
  res.json({hello: "tim"});
});

app.listen(3000);

module.exports = app
