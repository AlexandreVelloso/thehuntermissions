module.exports = (weapons) => {
    return weapons.length === 0|| weapons.some(w => w.have_weapon);
}