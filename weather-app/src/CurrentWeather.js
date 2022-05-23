import styled from 'styled-components';
import { Loader, RefreshIcon } from './ui';
import weatherCodes from './weather-code';
import { useState, useEffect } from 'react';
import { BASE_WEATHER_URL, WEATHER_KEY } from './weatherApi';

const StyledCurrentWeather = styled.article`
  width: 85vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
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
  gap: 1rem;
`;

const WeatherTemperature = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const WeatherDetailInfoBox = styled.div`
  font-size: 1.4rem;
  display: flex;
  flex-direction: column;
`;

const WeatherDetailInfoItem = styled.p`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  gap: 1.5rem;
`;

const WeatherLocationBox = styled.h2`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  svg {
    cursor: pointer;
  }
`;

const CurrentWeather = () => {
  const [currentWeather, setCurrentWeather] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${BASE_WEATHER_URL}/forecast?access_key=${WEATHER_KEY}&query=Seoul&forcast_days=1&hourly=1`
        );
        const data = await response.json();
        setCurrentWeather(data);
      } catch (error) {
        alert(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handleRefreshClick = () => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${BASE_WEATHER_URL}/forecast?access_key=${WEATHER_KEY}&query=Seoul&forcast_days=1&hourly=1`
        );
        const data = await response.json();
        setCurrentWeather(data);
      } catch (error) {
        alert(error);
      } finally {
        setIsLoading(false);
      }
    })();
  };

  if (!currentWeather || isLoading) {
    return <Loader>Loading...</Loader>;
  }

  let findWeatherCode = null;
  if (currentWeather.current) {
    findWeatherCode = weatherCodes.find(weatherCode => {
      return weatherCode.overhead_code === currentWeather.current.weather_code;
    });
  }

  return (
    <StyledCurrentWeather>
      {currentWeather.location && (
        <WeatherLocationBox>
          <span>{currentWeather.location.country}</span>
          <span>&#44;</span>
          <span>{currentWeather.location.name}</span>
          <RefreshIcon onRefreshClick={handleRefreshClick} />
        </WeatherLocationBox>
      )}
      <WeatherInfo>
        <WeatherSummaryInfo>
          <img
            src={currentWeather.current.weather_icons}
            alt='current-weather-icon'
          />
          <p>{findWeatherCode.trans_text_day}</p>
        </WeatherSummaryInfo>

        <WeatherTemperature>
          <p>{currentWeather.current.temperature}&#8451;</p>
        </WeatherTemperature>

        <WeatherDetailInfoBox>
          <WeatherDetailInfoItem>
            <span>바람</span>
            <span>{currentWeather.current.wind_speed} kmph</span>
          </WeatherDetailInfoItem>
          <WeatherDetailInfoItem>
            <span>강수량</span>
            <span>{currentWeather.current.precip} mm</span>
          </WeatherDetailInfoItem>
          <WeatherDetailInfoItem>
            <span>기압</span>
            <span>{currentWeather.current.pressure} mb</span>
          </WeatherDetailInfoItem>
        </WeatherDetailInfoBox>
      </WeatherInfo>
    </StyledCurrentWeather>
  );
};

export default CurrentWeather;
