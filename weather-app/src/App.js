import { useState, useEffect } from 'react';
import styled from 'styled-components';
import weatherCodes from './weather-code';
import GlobalStyle from './GlobalStyle';

const BASE_WEATHER_URL = 'http://api.weatherstack.com';
const WEATHER_KEY = '86ca8648b874c1a2add4d0e181daff0b';

const Logo = styled.h1`
  font-size: 3rem;
  text-transform: uppercase;
  padding: 1rem 2rem;
  text-align: center;
  margin-bottom: 2rem;
`;

const CurrentWeather = styled.article`
  width: 85vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
`;

const WeatherInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const WeatherSummaryInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
`;

const WeatherTemperature = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const WeatherDetailInfoBox = styled.div`
  font-size: 1.4rem;
  display: flex;
  flex-direction: column;
  align-self: flex-end;
`;

const WeatherDetailInfoItem = styled.p`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  gap: 1.5rem;
`;

const Loader = styled.p`
  font-size: 2rem;
  text-align: center;
`;

const App = () => {
  const [currentWeather, setCurrentWeather] = useState(() => {
    return JSON.parse(localStorage.getItem('current_weather') ?? '{}');
  });

  // 2022.05.16 김명진
  // localStorage 에 현재 날짜가 저장되어 있지 않다면 weather api 를 통해 데이터를 불러오고
  // localStorage 에 저장한다.
  useEffect(() => {
    // 갱신 조건
    let isNeedRefresh = false;

    const isEmpty = Object.keys(currentWeather).length === 0;
    if (isEmpty) {
      // localStorage 에 저장된 데이터가 없거나
      isNeedRefresh = true;
    } else {
      // 저장된 날짜가 오늘 날짜가 아닌 경우,
      const date = new Date();
      const currentDate = date.getDate();

      const localDateInfo = currentWeather.location.localtime
        .split(' ')[0]
        .split('-');
      const savedDate = Number.parseInt(
        localDateInfo[localDateInfo.length - 1],
        10
      );

      if (currentDate !== savedDate) {
        isNeedRefresh = true;
      }
    }

    if (isNeedRefresh) {
      fetch(`${BASE_WEATHER_URL}/current?access_key=${WEATHER_KEY}&query=Seoul`)
        .then(response => response.json())
        .then(data => {
          setCurrentWeather(data);
          localStorage.setItem('current_weather', JSON.stringify(data));
        });
    }
  }, [currentWeather]);

  // 2022.05.16 김명진
  // current_weather 로부터 현재 날씨의 정보를 읽어온다.
  let findWeatherCode = null;
  if (currentWeather.current) {
    findWeatherCode = weatherCodes.find(weatherCode => {
      return weatherCode.overhead_code === currentWeather.current.weather_code;
    });
  }

  return (
    <>
      <GlobalStyle />
      <Logo>Devi Weather Cast</Logo>
      <main>
        <CurrentWeather>
          {currentWeather.location && (
            <h2>
              <span>{currentWeather.location.country}</span>
              <span>&#44;</span>
              <span>{currentWeather.location.name}</span>
            </h2>
          )}
          <WeatherInfo>
            <WeatherSummaryInfo>
              <img
                src={currentWeather.current?.weather_icons?.[0] ?? ''}
                alt='current-weather-icon'
              />
              <p>{findWeatherCode && findWeatherCode.trans_text_day}</p>
            </WeatherSummaryInfo>

            <WeatherTemperature>
              <p>
                {currentWeather.current?.temperature ?? 'Loading...'}&#8451;
              </p>
            </WeatherTemperature>

            <WeatherDetailInfoBox>
              <WeatherDetailInfoItem>
                <span>바람</span>
                <span>
                  {currentWeather.current?.wind_speed ?? 'loading...'} kmph
                </span>
              </WeatherDetailInfoItem>
              <WeatherDetailInfoItem>
                <span>강수량</span>
                <span>{currentWeather.current?.precip ?? 'loading...'} mm</span>
              </WeatherDetailInfoItem>
              <WeatherDetailInfoItem>
                <span>기압</span>
                <span>
                  {currentWeather.current?.pressure ?? 'loading...'} mb
                </span>
              </WeatherDetailInfoItem>
            </WeatherDetailInfoBox>
          </WeatherInfo>
        </CurrentWeather>
      </main>
    </>
  );
};

export default App;
