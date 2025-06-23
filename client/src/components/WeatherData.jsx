const WeatherData = ({ city, temperature, humidity, condition }) => {
  return (
    <div
      style={{
        backgroundColor: "#f0f0f0",
        padding: "10px 20px",
        textAlign: "left",
        width: "100%",
      }}
    >
      <h3>{city}</h3>
      <p>Temperature: {temperature.toFixed(1)}°C</p>
      <p>Humidity: {humidity}%</p>
      <p>Condition: {condition}</p>
    </div>
  );
};

export default WeatherData;
