import styled from 'styled-components';

export const Logo = styled.h1`
  font-size: 3rem;
  text-transform: uppercase;
  padding: 1rem 2rem;
  text-align: center;
  margin-bottom: 2rem;
`;

export const Loader = styled.p`
  font-size: 2rem;
  text-align: center;
`;

export const Icon = styled.svg`
  width: 24px;
  height: 24px;
  border: 1px solid #fff;
  border-radius: 50%;
`;

export const RefreshIcon = ({ onRefreshClick }) => {
  return (
    <Icon
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={2}
      onClick={onRefreshClick}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
      />
    </Icon>
  );
};
