function getOtp() {
  return Math.floor(100000 + (Math.random() * 900000));
}

module.exports = {
  getOtp,
};
