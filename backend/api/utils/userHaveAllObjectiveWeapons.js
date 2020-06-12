module.exports = (weapons) => {
    return weapons === [] || weapons.every(w => w.have_weapon);
}