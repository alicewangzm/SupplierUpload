import "react-app-polyfill/ie11";
import {useState} from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LogoUpload from "./LogoDrop";
import styled from "styled-components";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import {
  createTheme,
  ThemeProvider,
  Theme,
  useTheme,
} from "@mui/material/styles";
import AddressFill from "./AddressFill";

/*
const addSupplierInfo = async () => {
  try {
    const docRef = await addDoc(collection(db, "suppliers"), {
      name: "Supplier 1",
    });
    console.log("Supplier written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
*/
const customTheme = (outerTheme: Theme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "--TextField-brandBorderColor": "#e2e0e7",
            "--TextField-brandBorderHoverColor": "#c889e4",
            "--TextField-brandBorderFocusedColor": "#9c27b0",
            "& label.Mui-focused": {
              color: "var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: "var(--TextField-brandBorderColor)",
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderHoverColor)",
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            "&:before, &:after": {
              borderBottom: "2px solid var(--TextField-brandBorderColor)",
            },
            "&:hover:not(.Mui-disabled, .Mui-error):before": {
              borderBottom: "2px solid var(--TextField-brandBorderHoverColor)",
            },
            "&.Mui-focused:after": {
              borderBottom:
                "2px solid var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            "&:before": {
              borderBottom: "2px solid var(--TextField-brandBorderColor)",
            },
            "&:hover:not(.Mui-disabled, .Mui-error):before": {
              borderBottom: "2px solid var(--TextField-brandBorderHoverColor)",
            },
            "&.Mui-focused:after": {
              borderBottom:
                "2px solid var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
    },
  });

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const SupplierForm = () => {
  const outerTheme = useTheme();
  const [data, setData] = useState({});

  const handleInput = (event:any) => {
    console.log(event.target);
    const {id, value} = event.target;
      setData({...data, [id]:value});
  }
  const handleAddress = (event:any) => {
    console.log(event.target);
    const {id, inputValue} = event.target;
      setData({...data, [id]:inputValue});
  }
  const handleSubmit = async(event:any) => {
    fetch("./submit", {
      method: "POST",
      body: JSON.stringify(data),
      headers:{
        "Content-Type" : "application/json"
      }
    })
    /*
    event.preventDefault()
    try{
      const res = await addDoc(collection(db,"suppliers"),{
      name: "name",
      address: "22"
    })
    console.log(res.id);
  } catch(err){
    console.log(err);
  }
  */
  
  }
  return (
    <ThemeProvider theme={customTheme(outerTheme)}>
      <StyledForm>
        <h1>Supplier Record</h1>
        <LogoUpload/>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "30ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="supplier-name"
            label="Name"
            defaultValue=""
            variant="standard"
            size="small"
            onChange={handleInput}
          />
        </Box>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "30ch" },
          }}
          noValidate
          autoComplete="off"
          onChange={handleAddress}
        >
          <AddressFill/>
        </Box>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 2, width: "15ch" },
          }}
          noValidate
          autoComplete="off"
          color="secondary"
        >
          <Button variant="contained" color="secondary" endIcon={<SendIcon />} onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </StyledForm>
    </ThemeProvider>
  );
};
