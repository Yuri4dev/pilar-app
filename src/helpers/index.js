export const formatDate = (date) => {
  const data = new Date(date);
  return data.getDate() + "/" + data.getMonth() + "/" + data.getFullYear();
};
export const slugify = (text) => {
  return text.toString().normalize("NFKD").trim();
};
