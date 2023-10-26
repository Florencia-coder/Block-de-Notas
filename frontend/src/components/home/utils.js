export default function formatDate(dateString) {
  const dateObj = new Date(dateString);
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return dateObj.toLocaleDateString("es-ES", options);
}
