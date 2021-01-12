import React from "react";
import { Transition } from "react-transition-group";
import axios from "axios";

function App() {
  const [states, setState] = React.useState({
    city: "",
    temp: "",
    feel: "",
    weather: "",
    icon: "",
  });
  const [value, setValue] = React.useState("");
  const [isVisible, setVisible] = React.useState(false);
  const date = new Date();
  let hour = date.getHours();
  let time = "";

  function setHour(hour) {
    time = hour > 17 ? "night" : "day";
  }

  setHour(hour);

  function getWeather(city) {
    const API = "cf0fb975d915c2a3c341e4965b6c219d";
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=metric&lang=ru`
      )
      .then((res) => {
        let weather = res.data.weather[0].description;
        weather = weather[0].toUpperCase() + weather.slice(1);
        setState({
          city: res.data.name,
          temp: Math.round(res.data.main.temp),
          feel: Math.round(res.data.main.feels_like),
          icon: res.data.weather[0].icon,
          weather: weather,
        });
      })
      .catch((err) => alert("Упс! Похоже такого города нет :("));
  }

  return (
    <div className={`app ${time}`}>
      <form
        className="app__form"
        onSubmit={(e) => {
          e.preventDefault();
          getWeather(value);
          setVisible(true);
        }}
      >
        <input
          className="app__input"
          onChange={(event) => setValue(event.target.value)}
        ></input>
        <button
          className="app__button"
          type="button"
          onClick={() => {
            getWeather(value);
            setVisible(true);
          }}
        >
          Найти
        </button>
      </form>
      <Transition in={isVisible} timeout={1000} mountOnEnter unmountOnExit>
        {(state) => (
          <div className={`weather ${state}`}>
            <h1>{states.city}</h1>
            <h2>{states.weather}</h2>
            <img
              src={`${states.icon}.png`}
              alt={states.weather}
              width="100px"
              height="100px"
            />
            <p>Температура сейчас: {states.temp}°</p>
            <p>Чувствуется как {states.feel}°</p>
          </div>
        )}
      </Transition>
    </div>
  );
}

export default App;
