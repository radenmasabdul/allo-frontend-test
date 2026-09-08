export function generateLocaleId() {
  return Date.now() + Math.floor(Math.random() * 1000);
};