export default function toTitleCase({ text }) {
  return text.replace(/\b\w/g, (char) => {
    return char.toUpperCase();
  });
}
