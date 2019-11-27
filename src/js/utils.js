export const getMoscowTime = () => {
  const dt = new Date();
  const timeString = dt.toLocaleTimeString('ru-RU', { timeZone: 'Europe/Moscow' });
  return Date.parse(`${getDate(dt)} ${timeString}`);
}

export const getDate = (dt = new Date()) => {
  return `${dt.getFullYear()}/${two(dt.getMonth() + 1)}/${two(dt.getDate())}`;
}

export const two = (num) => {
  return parseInt(num) > 9 ? num : `0${num}`;
}