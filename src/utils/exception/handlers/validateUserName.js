const validateUserName = (name, alias) => {
  // Check if the name is empty
  if (!name.trim()) return "Name is required.";

  // Check if the name contains only alphabetic characters and spaces
  if (!/^[A-Za-z\s]+$/.test(name))
    return `${alias.toUpperCase()} must only have alphabetic values`;

  return ""; // Return empty string if the name is valid
};

export default validateUserName;
