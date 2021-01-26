import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`

.bg-blue{
  background-color: #7799ff;

}
.container {
    margin-top: 50px;
}

.trainer {
    min-height: 250px;
    min-width: 250px;
    border: 1px solid black;
}

.infinite-scroll {
    height: 200px;
    overflow: auto;
}

.pokemon{
    float: left;
    max-width: 150px;
}
.trade-info{
    float: left;
}
.exchangeArrow{
    width: 40px;
    height: 40px;
}
`;
