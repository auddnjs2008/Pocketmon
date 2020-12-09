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
    body{
      
         
        &::-webkit-scrollbar{
            display:none;
        }
    }

    h1{
        font-size:25px;
    }
`;

export default GlobalStyles;