export const dateFormatter = (date_str) => {
  const date = new Date(date_str);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};
