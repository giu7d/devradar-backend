export default function formatTechsArray(techs) {
  return techs.map(tech => tech.toLowerCase().replace(" ", "-"));
}
