const Band = require('./Band')
const Musician = require('./Musician')

Musician.belongsTo(Band, { as: 'band' });
Band.hasMany(Musician, { as: 'musicians' });


module.exports = {
    Band,
    Musician
};
