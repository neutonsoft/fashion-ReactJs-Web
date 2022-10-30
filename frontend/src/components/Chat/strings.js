const pad = (string, length) => {
  const newString = "0000000000" + string;
  return newString.substr(newString.length - length);
};

export const getFullTime = time => {
  const timestamp = new Date(time);
  const currentTimestamp = new Date();

  const timestring = `${pad(timestamp.getHours(), 2)}:${pad(
    timestamp.getMinutes(),
    2
  )}`;

  if (currentTimestamp.toDateString() === timestamp.toDateString()) {
    return timestring;
  }
  timestamp.setHours(0);
  timestamp.setMinutes(0);
  timestamp.setSeconds(0);

  currentTimestamp.setHours(0);
  currentTimestamp.setMinutes(0);
  currentTimestamp.setSeconds(0);

  const daysDiff = Math.round(
    (currentTimestamp.getTime() - timestamp.getTime()) / 86400000
  );

  if (daysDiff === 1) {
    return `Yesturday ${timestring}`;
  }

  return `${pad(timestamp.getDate(), 2)}/${pad(timestamp.getMonth(), 2)}/${pad(
    timestamp.getFullYear(),
    4
  )} ${timestring}`;
};
