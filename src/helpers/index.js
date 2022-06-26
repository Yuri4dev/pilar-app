export const formatDate = (date) => {
  const data = new Date(date);
  return data.getDate() + "/" + data.getMonth() + 1 + "/" + data.getFullYear();
};
export const slugify = (text) => {
  return text.toString().normalize("NFKD").trim();
};
