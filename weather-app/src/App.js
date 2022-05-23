import styled from 'styled-components';
import GlobalStyle from './GlobalStyle';
import { Logo } from './ui';
import React from 'react';
import CurrentWeather from './CurrentWeather';

const Footer = styled.footer`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 1rem;

  width: 85vw;
  font-size: 1.2rem;
  color: #ecedf4;
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Logo>Devi Weather Cast</Logo>
      <main>
        <CurrentWeather />
      </main>
      <Footer>React version : {React.version}</Footer>
    </>
  );
};

export default App;
