const validatePassword = (password, intention) => {
  // Check if the password is empty
  if (!password.trim()) {
    return "Password is required.";
  }

  // If the intention is for registration
  if (intention === "registration") {
    // Check if the password meets criteria for registration
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return "Password must be at least 8 characters long and contain at least one digit, one uppercase letter, one lowercase letter, and one special character.";
    }
  }

  return "";
};

export default validatePassword;
