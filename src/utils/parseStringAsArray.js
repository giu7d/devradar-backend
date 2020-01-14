export default function parseStringAsArray(string) {
  return string.split(",").map(el => el.trim());
}
