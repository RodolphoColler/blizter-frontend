function validateCredentials(email, password) {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const minPasswordLength = 7;

  if (!emailRegex.test(email)) throw new Error('Email is not valid.');
  if (!password) throw new Error('Password is required');
  if (password.length < minPasswordLength) throw new Error('Password need to have at least 7 characters.');
}

export function validateSignUp(email, name, password, confirmPassword) {
  validateCredentials(email, password);

  if (!name) throw new Error('Name is required.');
  if (password !== confirmPassword) throw new Error('Passwords does not match.');
}

export function validateSignIn(email, password) {
  validateCredentials(email, password);
}

export function validateExpenditure(description, value, date) {
  if (!description) throw new Error('Description cannot be empty.');
  if (!value) throw new Error('Value cannot be empty.');
  if (value === '0') throw new Error('Value cannot be zero.');
  if (!date) throw new Error('Date cannot be empty.');
}
