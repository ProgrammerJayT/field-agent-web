const validateEmail = (email) => {
  // Check if the email is empty
  if (!email.trim()) {
    return "Email address is required.";
  }

  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check if the email matches the regular expression
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address.";
  }

  return "";
};

export default validateEmail;
