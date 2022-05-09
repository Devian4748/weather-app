const BASE_WEATHER_URL = 'http://api.weatherstack.com';
const WEATHER_KEY = '86ca8648b874c1a2add4d0e181daff0b';
const FETCH_CURRENT_WEATHER = `${BASE_WEATHER_URL}/current?access_key=${WEATHER_KEY}&query=Seoul`;

const App = () => {
  return (
    <>
      <h1>Devi Weather</h1>
      <main>
        {/** 현재 날씨 */}
        <div>
          {/** 현재 날씨 - 요약 */}
          <div>
            {/** 날씨 이미지 : weather-current-weather_icons */}
            <img
              src='https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0008_clear_sky_night.png'
              alt='current-weather'
            />
            {/** 날씨 상태 : weather-current-weather_code */}
            <p>113</p>
          </div>

          {/** 현재 날씨 - 온도 */}
          <div>
            {/** 현재 날씨 - 측정 온도 */}
            <p>14 &#8451;</p>
            {/** 현재 날씨 - 온도 측정 시간대 */}
            <p>03:25 PM</p>
          </div>

          {/** 현재 날씨 - 상세 */}
          <div>
            <span>Wind : 4 kmph</span> {/** 현재 날씨 - 상세 - 바람 */}
            <span>Precip : 0 mm</span> {/** 현재 날씨 - 상세 - 강수량 */}
            <span>Pressure : 1018 mb</span> {/** 현재 날씨 - 상세 - 기압 */}
          </div>
        </div>
        {/** 1주일간의 날씨들 List */}
      </main>
    </>
  );
};

export default App;
