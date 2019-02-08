const moment = require('moment');

const getPrettyName = name => name.replace(/\W+/g, '-').toLowerCase();

const getArchiveAuthorUrl = author => `/author/${getPrettyName(author)}`;

const getArchiveMonthUrl = date => {
    const dateMoment = moment(date);
    return `/archive/${dateMoment.format("YYYY/MM")}`;
}

module.exports = {
    getPrettyName,
    getArchiveAuthorUrl,
    getArchiveMonthUrl
};