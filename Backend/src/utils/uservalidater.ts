export const uservalidater = (username: string, password: string) => {
  if (!username || !password) {
    return { message: "Username and password are required", status: 411 };
  }
  if (username.length < 3) {
    return {
      message: "Username must be at least 3 characters long",
      status: 411,
    };
  }

  if (password.length < 8) {
    return {
      message: "Password must be at least 8 characters long",
      status: 411,
    };
  }
  if (!/[A-Z]/.test(password)) {
    return {
      message: "Password must contain at least one uppercase letter",
      status: 411,
    };
  }

  if (!/[a-z]/.test(password)) {
    return {
      message: "Password must contain at least one lowercase letter",
      status: 411,
    };
  }

  if (!/[0-9]/.test(password)) {
    return {
      message: "Password must contain at least one number",
      status: 411,
    };
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    return {
      message: "Password must contain at least one special character",
      status: 411,
    };
  }

  return null;
};
