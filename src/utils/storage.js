export const getTheme = () => {
  try {
    return localStorage.getItem('theme') ?? 'light';
  } catch {
    return 'light';
  }
};

export const setTheme = (value) => {
  try {
    localStorage.setItem('theme', value);
  } catch {
    // localStorage unavailable (private browsing, etc.)
  }
};
