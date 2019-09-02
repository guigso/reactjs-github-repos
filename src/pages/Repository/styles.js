import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    height: 128px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.div`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;
  }

  & + li {
    margin-top: 10px;
  }

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid #eee;
  }

  div {
    flex: 1;
    margin-left: 15px;

    strong {
      font-size: 16px;

      a {
        text-decoration: none;
        color: #333;

        &:hover {
          color: #7159c1;
        }
      }
      span {
        background: #eee;
        color: #333;
        border-radius: 2px;
        font-size: 12px;
        font-weight: 600;
        height: 20px;
        padding: 3px 4px;
        margin-left: 10px;
      }
    }
  }

  p {
    margin-top: 5px;
    font-size: 12px;
    color: #999;
  }
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
  align-items: center;
  max-width: 300px;
  justify-content: space-between;
  margin: 0 auto;

  div {
    width: 75px;
    border-radius: 2px;
    text-align: center;
    border: 2px solid black;
    color: #eee;
    cursor: pointer;
  }
  .open {
    background-color: green;
    border-color: darkgreen;
    cursor: ${props =>
      props.selectedState === 'open' ? 'not-allowed' : 'pointer'};
  }

  .closed {
    background-color: red;
    border-color: darkred;
    cursor: ${props =>
      props.selectedState === 'closed' ? 'not-allowed' : 'pointer'};
  }

  .all {
    background-color: blue;
    border-color: darkblue;
    cursor: ${props =>
      props.selectedState === 'all' ? 'not-allowed' : 'pointer'};
  }
`;

export const Paginator = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 5%;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 115px;
    height: 46px;
    border-radius: 46px;
    color: #eee;
    background-color: #7159c1;
    cursor: pointer;
  }

  div:first-child {
    background-color: ${props => (!props.disabled ? '#7159c1' : 'grey')};
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  }
`;
