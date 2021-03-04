export const cutText = (text, limit) => {
  text = text.trim();
  if (text.length < limit) return text;
  else return text.slice(0, limit) + "...";
}