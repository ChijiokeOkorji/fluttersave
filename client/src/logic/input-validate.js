function isEmailValid(input) {
  if ((/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(input)) {
    return true;
  }

  return false;
}

function isPhoneNumberValid(input) {
  if ((/^[(][+][0-9]{1,3}[)][\s][0-9]{10}$/).test(input)) {
    return true;
  }

  return false;
}

function isValueEntered(input) {
  if ((/^.+$/).test(input)) {
    return true;
  }

  return false;
}

function isAmountValid(input) {
  if (isValueEntered(input) && (Number(input) >= 100) && (Number(input) <= 500_000)) {
    return true;
  }

  return false;
}

function doesItMatch(input1, input2) {
  if (input1 === input2) {
    return true;
  }

  return false;
}

export { 
  isNameValid,
  isEmailValid,
  isPhoneNumberValid,
  isValueEntered,
  isAmountValid,
  doesItMatch
};