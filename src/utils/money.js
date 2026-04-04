function rupeesToPaise(amount) {
  const paise = amount * 100;
  return paise;
}

function paiseToRupees(amount) {
  const rupees = amount / 100;
  return paise;
}

const convertMoney = {
  rupeesToPaise,
  paiseToRupees
}

export default convertMoney;