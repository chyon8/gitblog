"use client"

import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { CSSProperties } from 'react';
import { typography } from './themeValue.js';



const theme = createTheme({
  typography: {
    fontFamily: 'Pretendard',
    fontSize: 12,
    color:'rgb(255,255,255)',
    fontWeightLight: typography.weight.light,
    fontWeightRegular: typography.weight.regular,
    fontWeightMedium: typography.weight.medium,
    fontWeightBold: typography.weight.bold,
    h1: {
      color: '#FFFFFF',
      fontFamily: 'Pretendard',
      fontWeight: typography.weight.bold,
      fontSize: '25px',
      lineHeight: -1,
      letterSpacing: 0,
      textAlign: 'left',
    },
    question:{
      color: '#FFFFFF',
      fontSize:'22px',
      display:'block'
     
  
      
    },
    bodyText:{
      textAlign:"left",
      fontSize:14,
      fontWeight:400,
      color:'#FFFFFF'
    },
    answer:{
      color:'#DDDDDD',
      fontSize:'14px',
          display:'block',
          letterSpacing: '0.04rem', 
          lineHeight: '1.2rem'
   
    },
    timeSincePost: {
      color: 'rgb(168, 168, 168)',
      fontSize: typography.size.lg,
      fontWeight: typography.weight.light,
      lineHeight: typography.lineHeight.sm,
      letterSpacing: '-4%',
      textAlign: 'left',
      alignContent: 'center',
    },
  },
  palette: {
    background: {
      default: '#191919',
      //default: 'rgb(0, 0, 0)',
    },
    text: {
      primary: '#FFFFFF',
      //primary: 'white'
    },
    primary: {
      main: '#FFFFFF',
    },
    white: {
      main: 'rgb(255,255,255)',
    },
    grey: {
      main: 'rgb(168,168,168)',
      light: 'rgb(215,215,215)',
      dark: 'rgb(86,87,87)',
    },
    star: {
      main: 'rgb(255, 196, 3)',
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          lineHeight: 1,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color:"#FFFFFF",
          backgroundColor:'#252525',
          textTransform: 'none',
          paddingTop:'10px'
          ,paddingRight:'20px'
          ,paddingBottom:'10px',
          paddingLeft:'20px',
          borderRadius: 20,
      
          '&:hover': {
            color:'#0A0A0A',
            backgroundColor: '#00FF66',
          },
      
       
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          border: '1px solid',
          borderColor: 'rgb(52, 52, 52)',
          borderRadius: '16px',
          outline: 'none',
          background: 'rgb(22, 22, 22)',
          color: 'white',
          height: '46px',
          padding: '15px',
          '&::before': {
            content: 'none',
          },
          '&::after': {
            content: 'none',
          },
          fontSize: '14px',
        },
        input: { padding: '0px', lineHeight: '1', '&::placeholder': { color: 'white' } },
      },
    },

    MuiSelect: {
      styleOverrides: {
        root: {
          border: '1px solid',
          borderColor: 'rgb(52, 52, 52)',
          borderRadius: '16px',
          outline: 'none',
          background: 'rgb(22, 22, 22)',
          height: '46px',
          color: 'white',
          '&:hover': {
            '&& fieldset': {
              border: 'rgb(22, 22, 22)',
            },
          },
          fontSize: '14px',
        },
      },
    },
    
    MuiPagination: {
      styleOverrides: {
        root: {
       justifyContent:'center',
       '& .Mui-selected': {
    color: '#00FF66', // Change this to the text color you want for the selected page
  
  },
        },
      },
    },
  

    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: '1350px',
         
          //marginLeft:'35px',
          //marginRight:'35px',
       

          '@media (min-width:600px)': {
            paddingLeft: '35px',
            paddingRight: '35px',
          },
        },
      },
    },
  },
});

export default responsiveFontSizes(theme);
