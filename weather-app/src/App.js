import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CurrentWeather from './CurrentWeather';
import GlobalStyle from './GlobalStyle';
import { Loader, Logo } from './ui';

const BASE_WEATHER_URL = 'http://api.weatherstack.com';
const WEATHER_KEY = '86ca8648b874c1a2add4d0e181daff0b';

const Footer = styled.footer`
  width: 85vw;
  margin: 0 auto;
  font-size: 1.2rem;
  color: #ecedf4;
`;

const App = () => {
  const [currentWeather, setCurrentWeather] = useState(() => {
    return JSON.parse(localStorage.getItem('current_weather') ?? '{}');
  });

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

  useEffect(() => {
    if (isNeedRefresh) {
      fetch(`${BASE_WEATHER_URL}/current?access_key=${WEATHER_KEY}&query=Seoul`)
        .then(response => response.json())
        .then(data => {
          setCurrentWeather(data);
          localStorage.setItem('current_weather', JSON.stringify(data));
        });
    }
  }, [isNeedRefresh]);

  return (
    <>
      <GlobalStyle />
      <Logo>Devi Weather Cast</Logo>
      <main>
        {!isNeedRefresh && <CurrentWeather currentWeather={currentWeather} />}
        {isNeedRefresh && <Loader>Loading...</Loader>}
      </main>
      <Footer>React version : {React.version}</Footer>
    </>
  );
};

export default App;
