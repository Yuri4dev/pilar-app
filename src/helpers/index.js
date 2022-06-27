export const formatDate = (date) => {
  const data = new Date(date);
  return (
    data.getDate().toString().padStart(2, "0") +
    "/" +
    String(data.getMonth() + 1).padStart(2, "0") +
    "/" +
    data.getFullYear()
  );
};
export const slugify = (text) => {
  return text.toString().normalize("NFKD").trim();
};
