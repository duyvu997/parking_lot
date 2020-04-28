const constant = require("../common/constant");

const isValidCapacity = function (capacity) {
    const numberParsed = parseInt(capacity, 10)
    return numberParsed > 0 && numberParsed < constant.MAX_ACCEPTABLE_CAPACITY
}

const isValidParkingTime = function(parkingTime){
    const numberParsed = parseFloat(parkingTime, 10)
    return numberParsed > 0 && numberParsed < constant.MAX_PARKING_TIME_ACCEPTABLE
}

const transformAndValidateInitEvent = function (event) {
    if (event.length < 2) {
        throw new Error("invalid create parking lot event");
    };
    const capacity = event[1];
    if (!isValidCapacity(capacity)) {
        throw new Error("Create the parking lot failed, capacity is invalid !!!")
    }
    return capacity;
}

const transformAndValidateParkEvent = function (event) {
    // event  = [ 'park' , 'KA-01-P-333' ];
    if (event.length < 2) {
        throw new Error("invalid park event");
    };
    return event[1];
}

const transformAndValidateLeaveEvent = function (event) {
    // event  = ['leave' , 'KA-01-HH-3141' , '4']
    if (event.length < 3) {
        throw new Error("invalid leave event");
    };
    const carId = event[1];
    const parkingTime = event[2];
    if (!isValidParkingTime(parkingTime)) {
        throw new Error("invalid parking time")
    }
    return { carId, parkingTime };
}

module.exports.isValidCapacity = isValidCapacity;
module.exports.transformAndValidateInitEvent = transformAndValidateInitEvent;
module.exports.transformAndValidateParkEvent = transformAndValidateParkEvent;
module.exports.transformAndValidateLeaveEvent = transformAndValidateLeaveEvent;

