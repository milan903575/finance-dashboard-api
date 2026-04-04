function rupeesToPaise(amount) {
  const paise = Math.round((amount + Number.EPSILON) * 100);
  return paise;
}

function paiseToRupees(amount) {
  const rupees = (amount / 100).toFixed(2);
  return rupees;
}

const convertMoney = {
  rupeesToPaise,
  paiseToRupees
}

export default convertMoney;