 export function getGreeting(hours) {
  if (hours < 4 || hours >= 19) {
    return "Good Night";
  }
  if (hours < 9) {
    return "Good morning";
  }
  if (hours < 16) {
    return "good afternoon";
  }
  return "good evening";
}
//ESM
// export default getGreeting 
