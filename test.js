const expect = require('chai').expect;
const request = require('supertest');
const app = require('./app');
const VendingMachine = require('./models/vendingMachine');
const CustomerItem = require('./models/customers');

describe("basic api endpoint data test for vending machine", ()=>{

  beforeEach(done=>{
    VendingMachine.insertMany([
      {id: 1, description: "Nutty Buddy Bar", quantity: 10, price: 50},
      {id: 2, description: "Oatmeal Pie", quantity: 10, price: 25},
      {id: 3, description: "Snickers", quantity: 10, price: 50},
      {id: 4, description: "BBQ Chips", quantity: 10, price: 35},
      {id: 5, description: "Mr. Goodbar", quantity: 10, price: 50},
      {id: 6, description: "Peanuts", quantity: 10, price: 35},
      {id: 7, description: "M&M's", quantity: 10, price: 35}
    ]).then(done());
  })

  afterEach(done=>{
    VendingMachine.deleteMany({}).then(done());
  });
afterEach(done=>{
  CustomerItem.deleteMany({}).then(done());
})

  it("customer endpoint should be able to get all information as json", (done)=>{
    request(app)
    .get("/api/customer/items")
    .expect(200)
    .expect(res=>{
      expect(res.body[0].id).to.equal(1);
      expect(res.body[1].id).to.equal(2);
      expect(res.body[2].id).to.equal(3);
      expect(res.body[3].id).to.equal(4);
      expect(res.body[4].id).to.equal(5);
      expect(res.body[5].id).to.equal(6);
      expect(res.body[6].id).to.equal(7);
    }).end(done);
  })
})

it("customer endpoint should see purchase of an item", (done)=>{
  request(app)
  .post("/api/customer/items/:itemId/purchases")
  .send({
    id: 1,
    description: "Nutty Buddy Bar",
    quantity: 1,
    money_required: 50,
    money_given: 50})
  .expect(201)
  .expect(res=>{
    CustomerItem.count().then(count=> {
      expect(count).to.equal(1);
    })
  })
  .end(done);
});



it("vendor endpoint should get a list of all purchases with their item and date/time", (done)=>{
  request(app)
  .get("/api/vendor/purchases")
  .expect(200)
  .expect(res =>{
    expect(res.body[0].id).to.equal(1)
  }).end(done);
})

it("vendor endpoint should get a total amount of money accepted by the machine", (done)=>{
  request(app)
  .get("/api/vendor/money")
  .expect(200)
  .expect(res=> {
    expect(res.body).to.equal(50)
  }).end(done);
})

it("vendor endpoint should add a new item not previously existing in the machine", (done)=>{
  request(app)
  .post("/api/vendor/items")
  .send({id: 8, description: "Starburst", quantity: 10, price: 25})
  .expect(201)
  .expect(res=>{
    VendingMachine.count().then(count=> {
      expect(count).to.equal(1);
  })
})
.end(done);
})
// it("vendor endpoint should update item quantity, description, and cost", (done)=>{
//   request(app)
//   .put("/api/vendor/items/:itemId")
//   .expect(200)
//   .expect(res=>{
//
//   })
// })

describe("basic api endpoint test", () =>{
  it("can access api endpoint and get success back", (done)=>{
    request(app)
    .get("/api/sanity")
    .expect(200, {hello: 'tim'}, done);
  });
});

describe("sanity test", ()=>{
  it("should run test", ()=>{
    expect(1).to.not.equal(2);
  });
});
