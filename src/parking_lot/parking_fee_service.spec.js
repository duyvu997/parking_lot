const assert = require("assert");
const sinon = require("sinon");
const expect = require("chai").expect;
const calculateCharge =  require("../parking_lot/parking_fee_services").calculateCharge;


describe('#calculateCharge', function () {

  it('using celi to calculate charge', function () {
    const result = calculateCharge(3.4);
    expect(result).to.eq(30);
  });

  it('normal calculate charge', function () {
    const result = calculateCharge(3);
    expect(result).to.eq(20);
  });
  
});
