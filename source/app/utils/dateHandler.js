const moment = require('moment');
const enumerateDaysBetweenDates = (startDate, endDate) => {
    var dates = [];

    var currDate = moment(startDate).startOf('day');
    var lastDate = moment(endDate).startOf('day');

    while (currDate.add(1, 'days').diff(lastDate) < 0) {
        dates.push(currDate.clone().toDate());
    }
    return dates;
};
module.exports = {
    enumerateDaysBetweenDates
}