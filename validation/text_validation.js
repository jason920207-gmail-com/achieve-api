const validText = (str) => {
  console.log(typeof str === 'string' && str.trim().length > 0)
  return typeof str === 'string' && str.trim().length > 0;
};

module.exports = validText;
