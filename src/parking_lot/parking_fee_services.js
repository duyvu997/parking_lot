const calculateCharge = function (parkingTime) {
    const feeForFirst2Hour = 10;
    let totalCharge = feeForFirst2Hour
    if (parkingTime > 2) {
        const feeForAdditionalHour = 10 * Math.ceil((parkingTime - 2));
        totalCharge = totalCharge + feeForAdditionalHour;
    }
    return totalCharge;
}

module.exports.calculateCharge = calculateCharge;