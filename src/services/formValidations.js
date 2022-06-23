function validateCredentials(email, password) {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const minPasswordLength = 7;

  if (!emailRegex.test(email)) throw new Error('Email is not valid.');
  if (!password) throw new Error('Password is required');
  if (password.length < minPasswordLength) throw new Error('Password need to have at least 7 characters.');
}

export function validateRegister(email, name, password, confirmPassword) {
  validateCredentials(email, password);

  if (!name) throw new Error('Name is required.');
  if (password !== confirmPassword) throw new Error('Passwords does not match.');
}

export function validateLogin(email, password) {
  validateCredentials(email, password);
}
