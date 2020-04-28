const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const main = require("../src/index").main;
const fileIO = require("../src/common/io_services");


describe('#Parking-lot test suites', function () {
  describe('happy cases:', function () {

    let stubFunc
    beforeEach(function () {
      stubFunc = sinon.stub(console, 'log');
    });
    afterEach(function () {
      stubFunc.restore();
    });

    it('should success when create a parking lot', function () {
      const stubs = sinon.stub(fileIO, "readInputFile").returns([["create_parking_lot", "6"]]);
      main();
      expect(stubFunc.calledOnce).to.be.true;
      expect(stubFunc.calledWith('Created parking lot with 6 slots')).to.be.true;
      stubs.restore();
    });

    it('should success when a car parks into the parking lot', function () {
      const stubs = sinon.stub(fileIO, "readInputFile").returns([["create_parking_lot", "6"], ["park", "60-B-0147"]]);
      main();
      expect(stubFunc.withArgs('Allocated slot number: 1').callCount).to.be.eq(1);
      stubs.restore();
    });

    it('should success when get status of parking lot', function () {
      const stubs = sinon.stub(fileIO, "readInputFile").returns([["create_parking_lot", "6"], ["park", "60-B-0147"], ["status"]]);
      main();
      expect(stubFunc.withArgs('Slot No. \t Registration No.').callCount).to.be.eq(1);
      expect(stubFunc.withArgs('1 \t 60-B-0147').callCount).to.be.eq(1);
      stubs.restore();
    });

    it('should success when a car leaves ', function () {
      const stubs = sinon.stub(fileIO, "readInputFile").returns([["create_parking_lot", "6"], ["park", "60-B-0147"], ["status"], ["leave", "60-B-0147", "4"]]);
      main();
      expect(stubFunc.withArgs('Registration number 60-B-0147 with Slot Number 1 is free with Charge 30').callCount).to.be.eq(1);
      stubs.restore();
    });


    it('should show message when a car not found in the parking lot', function () {
      const stubs = sinon.stub(fileIO, "readInputFile").returns([["create_parking_lot", "6"], ["leave", "60-B-0147", "4"]]);
      main();
      expect(stubFunc.withArgs('Registration number 60-B-0147 not found').callCount).to.be.eq(1);
      stubs.restore();
    });

    it('should show message when the parking lot is full', function () {
      const stubs = sinon.stub(fileIO, "readInputFile").returns([["create_parking_lot", "1"], ["park", "60-B-0147"], ["park", "60-B-0142"]]);
      main();
      expect(stubFunc.withArgs('Sorry, parking lot is full').callCount).to.be.eq(1);
      stubs.restore();
    });
  });


  describe('bad cases: ', function () {

    let stubFunc
    beforeEach(function () {
      stubFunc = sinon.stub(console, 'log');
    });
    afterEach(function () {
      stubFunc.restore();
    });

    it('park before init a parking lot', function () {
      const stubs = sinon.stub(fileIO, "readInputFile").returns([["park", "60-B-0147"]]);
      main();
      expect(stubFunc.withArgs('Something went wrong: please input the create parking lot first').callCount).to.be.eq(1);
      stubs.restore();
    });

    it('park 2 card with the same number is invalid', function () {
      const stubs = sinon.stub(fileIO, "readInputFile").returns([["create_parking_lot", "1"],["park", "60-B-0147"],["park", "60-B-0147"]]);
      main();
      expect(stubFunc.withArgs('Something went wrong: car already exist in parking lot').callCount).to.be.eq(1);
      stubs.restore();
    });

    it('init parking with invalid slots number', function () {
      const stubs = sinon.stub(fileIO, "readInputFile").returns([["create_parking_lot", "abc"]]);
      main();
      expect(stubFunc.withArgs('Something went wrong: Create the parking lot failed, capacity is invalid !!!').callCount).to.be.eq(1);
      stubs.restore();
    });

    it('init parking with 2 times', function () {
      const stubs = sinon.stub(fileIO, "readInputFile").returns([["create_parking_lot", "2"], ["create_parking_lot", "1"]]);
      main();
      expect(stubFunc.withArgs('Something went wrong: Parking lot has been created').callCount).to.be.eq(1);
      stubs.restore();
    });

    it('input invalid event', function () {
      const stubs = sinon.stub(fileIO, "readInputFile").returns([["out", "60-B-0147"]]);
      main();
      expect(stubFunc.withArgs('Something went wrong: please input a valid event: create_parking_lot | park | leave | status').callCount).to.be.eq(1);
      stubs.restore();
    });

    it('input invalid LEAVE hours', function () {
      const stubs = sinon.stub(fileIO, "readInputFile").returns([["create_parking_lot", "3"], ["park", "60-B-0147"], ["leave", "60-B-0147", "abc"]]);
      main();
      expect(stubFunc.withArgs('Something went wrong: invalid parking time').callCount).to.be.eq(1);
      stubs.restore();
    });

    it('input invalid PARK event', function () {
      const stubs = sinon.stub(fileIO, "readInputFile").returns([["create_parking_lot", "3"], ["park"]]);
      main();
      expect(stubFunc.withArgs('Something went wrong: invalid park event').callCount).to.be.eq(1);
      stubs.restore();
    });

    it('input invalid LEAVE event', function () {
      const stubs = sinon.stub(fileIO, "readInputFile").returns([["create_parking_lot", "3"], ["leave"]]);
      main();
      expect(stubFunc.withArgs('Something went wrong: invalid leave event').callCount).to.be.eq(1);
      stubs.restore();
    });

    it('input invalid CREATE PARKING LOT event', function () {
      const stubs = sinon.stub(fileIO, "readInputFile").returns([["create_parking_lot"]]);
      main();
      expect(stubFunc.withArgs('Something went wrong: invalid create parking lot event').callCount).to.be.eq(1);
      stubs.restore();
    });

    // it('', function () {

    // });
    // it('', function () {

    // });

    // it('', function () {

    // });
    // it('', function () {

    // });

  })
});
