import {createGlobalStyle} from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset};
    a{
        text-decoration:none;
        color:black;
    }

    *{
        box-sizing:border-box;
    }
`;

export default GlobalStyles;