const constant = require('./common/constant')
const fileService = require("./common/io_services");
const parkingLot = require("../src/parking_lot/service")

const main = function () {
    try {
        const dataProcessed = fileService.readInputFile(process.argv[2]);
        let isCreated = false;
        let parkArea = {};
        dataProcessed.forEach(event => {
            const eventType = event[0];
            if (![constant.INIT, constant.PARK, constant.LEAVE, constant.STATUS].includes(eventType)) {
                throw new Error("please input a valid event: create_parking_lot | park | leave | status");
            }

            if (eventType == constant.INIT) {
                parkArea = parkingLot.init(event, isCreated);
                isCreated = true;
                return parkArea;
            }

            if (!isCreated) {
                throw new Error("please input the create parking lot first");
            }

            if (eventType == constant.PARK) {
                parkArea = parkingLot.park(event, parkArea);
                return parkArea;
            }

            if (eventType == constant.LEAVE) {
                parkArea = parkingLot.leave(event, parkArea);
                return parkArea;
            }

            if (eventType == constant.STATUS) {
                parkingLot.status(parkArea);
                return parkArea;
            }
        });
    } catch (error) {
        console.log(`Something went wrong: ${error.message}`)
    }
}
module.exports.main = main;