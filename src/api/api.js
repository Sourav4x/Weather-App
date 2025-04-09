const apiKey = 'fb7edfef29499e66e1336189d0e00565';

const getWeather = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );
  const json = await response.json();
  return json;
};

export default getWeather;
