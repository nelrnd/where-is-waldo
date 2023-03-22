// Get hours, minutes and seconds from seconds
function getTime(seconds) {
  const units = [
    { name: 'hours', nbOfSeconds: 3600, value: 0 },
    { name: 'seconds', nbOfSeconds: 60, value: 0 },
  ];

  units.forEach((unit) => {
    while (seconds >= unit.nbOfSeconds) {
      unit.value++;
      seconds -= unit.nbOfSeconds;
    }
  });

  return [
    ...units.map((u) => ({ name: u.name, value: u.value })),
    { name: 'seconds', value: seconds },
  ];
}

// Get time in long format (e.g 1 hour, 2 minutes and 3 seconds)
export function getLongFormatTime(seconds) {
  const time = getTime(seconds);
  const convert = (unit) =>
    unit.value + ' ' + (unit.value > 1 ? unit.name : unit.name.slice(0, -1));
  const converted = time.filter((u) => u.value !== 0).map((t) => convert(t));
  return converted.slice(0, -1).join(', ').concat(' and ', converted.slice(-1));
}

// Get time in short format (e.g 01:02:03)
export function getShortFormatTime(seconds) {
  const time = getTime(seconds);
  const convert = (value) => value.toString().padStart(2, '0');
  return time.map((u) => convert(u.value)).join(':');
}
