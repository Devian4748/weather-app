import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body {
    line-height: 1;
    background-color: #3C4A90;
    color: #fff;
    position: relative;
    height: 100vh;
  }
`;
