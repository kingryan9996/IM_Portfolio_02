import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherBox from "./component/WeatherBox";
import WeatherBtn from "./component/WeatherBtn";

function App() {
  // const [data, setData] = useState([]);

  const getCurrentLocation = () => {
    console.log("getCurre");
    navigator.geolocation.getCurrentPosition(showPosition);
  };

  const showPosition = (position) => {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    console.log(lat);
    console.log(lon);
    getWeatherByCurrentLocation(lat, lon);
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let APIkey = "f07758540fae0603dbb22c2388dd2bdd";
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    // console.log(data.weather);
    // console.log(data.name);

    // setState(data);

    // console.log(state.weather[0].main, "이게");
  };

  // getCurrentLocation();

  // console.log(state && state, "이게");
  // console.log(state.name, "이게");
  return (
    <div className="App">
      ddd
      {/* 여기는{state.name} */}
      {/* {state && state} */}
      {/* 1.현재 위치기반의 정보를 받아옴
  2. 날씨정보 : 도시명,섭씨,화씨,날씨상태
  3. 5개의 버튼 ( 1개는 현재위치, 4개는 다른도시)
  4. 도시버튼을 클릭할때 마다 도시별 날씨가 나온다.
  5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다.
  6. 데이터가 로딩되는 동안 로딩스피너가 돈다.
  */}
      <WeatherBox />
      <WeatherBtn />
    </div>
  );
}

export default App;
