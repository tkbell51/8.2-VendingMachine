const expect = require('chai').expect;
const request = require('supertest');
const app = require('./app');
const VendingMachine = require('./models/vendingMachine');

describe("basic api endpoint data test for vending machine", ()=>{
  beforeEach(done=>{
    VendingMachine.insertMany([
      {name: "Nike hat", price: 10.00, quantity: 6, description: "Hide the despair on your face", },
      {name: "Headphones", price: 20.00, quantity: 5, description: "To get away from it all", },
      {name: "TIY shirt", price: 15.00, quantity: 10, description: "People will know your owner if you get lost", },
      {name: "Notebook", price: 10.00, quantity: 20, description: "Isn't one required if your in school??", },
      {name: "Ballpoint Pen", price: 3.00, quantity: 40, description: "I thought a MacBook was the only requirement...", }
    ])
  })

  it("customer endpoint should be able to get all information as json", (done)=>{
    request(app)
    .get("/api/customer/items")
    .expect(200)
    .expect()
  })
})

  it("customer endpoint should purchase an item", (done)=>{
    request(app)
    .post("/api/customer/:itemId/purchases")
    .expect(201)
    .expect(res=>{
      VendingMachine.count().then(count=>{
        expect(count).to.equal(4);
      })
    })

  })

  it("vendor endpoint should get a list of all purchases with their item and date/time", (done)=>{
    request(app)
    .get("/api/vendor/purchases")
    .expect(200)
    .expect(res =>{
      VendingMachine.find
    }).end(done);
  })

  it("vendor endpoint should get a total amount of money accepted by the machine", (done)=>{
    request(app)
    .get("/api/vendor/money")
    .expect(200)
    .expect(res=> {

    })
  })

  it("vendor endpoint should add a new item not previously existing in the machine", (done)=>{
    request(app)
    .post("/api/vendor/items")
    .expect(201)
    .expect(res=>{

    })
  })
  it("vendor endpoint should update item quantity, description, and cost", (done)=>{
    request(app)
    .put("/api/vendor/items/:itemId")
    .expect(200)
    .expect(res=>{

    })
  })

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
