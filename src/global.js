import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    outline:0;
    box-sizing: border-box;
    font-family: "Roboto", Arial, Helvetica, sans-serif;
}

html, body, #root{
    min-height: 100%;
}

body{
    background: #F4F4F4;
    font-size: 14px;
    -webkit-font-smoothing: antialiased !important;
}

body, input, button{
    color: #182436;
    font-size: 14px;
    font-family: "Roboto", Arial, Helvetica, sans-serif;
}

button{
    cursor: pointer;
}

a{
    text-decoration: none;
    color: #F4F4F4;
    text-transform: capitalize;
    width: 100%;
}

ul, li{
    list-style: none;

}

.button-main{
    font-family: 'Source Sans Pro';
    font-weight: 900;
    font-size: 16px;
    line-height: 20px;
    border-radius: 24px;
    width: 100%;
    padding: 10px;
    background-color: #2ADB86;
    border: none;
    font-style: bold;
    text-transform: capitalize;
    color: black;
}

.button-disabled{
    font-family: 'Source Sans Pro';
    font-weight: 900;
    font-size: 16px;
    line-height: 20px;
    border-radius: 24px;
    width: 100%;
    padding: 10px;
    background-color: #D4DAD9;
    border: none;
    font-style: bold;
    text-transform: capitalize;
}

.button-main:hover{
    background-color: #6de7ad;

}

.button-empty{
    font-family: 'Source Sans Pro';
    font-weight: 900;
    font-size: 16px;
    line-height: 20px;
    border-radius: 24px;
    width: 100%;
    padding: 10px;
    border: 1px solid #2ADB86;
    
}

.button-empty:hover{
    background-color: #2ADB86;
    border: 1px solid #2ADB86;
}


.button-cancel{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #FB4B4B;
    padding: 10px;
    border:none;
    background: none;
    text-transform: capitalize;
}

.button-link{
    text-transform: capitalize;
    margin: 0;
    padding: 0;
    color: white;
    justify-content: left;
}

.button-link:hover{
    background: none;

}

.profile-img{
    border-radius: 50%;
    width: 100%;
}

/* .active {
    font-weight: bold;
    background-color:  gray;
    padding: 10px;
    
  } */


`;
