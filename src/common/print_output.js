const SlotStatus = require("../common/constant").SlotStatus
const initParkinglot = function (capacity) {
    console.log(`Created parking lot with ${capacity} slots`);
}
const allocatedCar = function (slotToBeAllocated) {
    console.log(`Allocated slot number: ${slotToBeAllocated}`);
}
const carLeaves = function (carId, slot, charge) {
    console.log(`Registration number ${carId} with Slot Number ${slot} is free with Charge ${charge}`);
}
const parkingStatus = function (parkArea) {
    console.log("Slot No. \t Registration No.");
    parkArea.parkingLotData.forEach(element => {
        if (element.status != SlotStatus.AVAILABLE) {
            console.log(`${element.position} \t ${element.status}`)
        }
    });
}
const carNotFound = function (carId) {
    console.log(`Registration number ${carId} not found`);
}

const parkingLotIsFull = function () {
    console.log("Sorry, parking lot is full");
}


module.exports.initParkinglot = initParkinglot;
module.exports.allocatedCar = allocatedCar;
module.exports.carLeaves = carLeaves;
module.exports.parkingStatus = parkingStatus;
module.exports.carNotFound = carNotFound;
module.exports.parkingLotIsFull = parkingLotIsFull;




