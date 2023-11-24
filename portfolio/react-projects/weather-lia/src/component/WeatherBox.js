import React from "react";
import "../App.css";

const WeatherBox = (props) => {
  return (
    <div className="WeaterBox">
      <div className="weatherState">
        {/* 현재위치는 {props.state.name}입니다.
        <br />
        현재위치의 날씨정보는 {props.state.weather}입니다. */}
      </div>
      <div className="locationBtn">
        <WeatherBox />
        <WeatherBox />
      </div>
    </div>
  );
};

export default WeatherBox;
