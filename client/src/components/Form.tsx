import "react-app-polyfill/ie11";
import { useState } from "react";
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
import { uploadRecord, RecordProps } from "../services/UploadService";

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
  const [data, setData] = useState<RecordProps>({} as RecordProps);
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  const getFilledAddress = (inputValue: string) => {
    setData({ ...data, ["address"]: inputValue });
    if (inputValue != "") {
      setHasSubmitted(false);
    }
  };

  const getUploadedImage = (file: File) => {
    if (file) {
      var filereader = new FileReader();
      filereader.readAsDataURL(file);
      filereader.onload = function (evt) {
        var base64 = evt?.target?.result as string;
        setData({ ...data, ["logo"]: base64 });
        setHasSubmitted(false);
      };
    }
  };

  const handleInput = (event: any) => {
    const { id, value } = event.target;
    setData({ ...data, [id]: value });
    setName(value);
    if (value != "") {
      setHasSubmitted(false);
    }
  };

  const handleSubmit = async () => {
    await uploadRecord(data);
    window.alert(`You successfully submitted supplier: ${name}`);
    setName("");
    setHasSubmitted(true);
  };

  return (
    <ThemeProvider theme={customTheme(outerTheme)}>
      <StyledForm>
        <h1>Supplier Record</h1>
        <LogoUpload getUploadedImage={getUploadedImage} hasSubmitted={hasSubmitted} />
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "30ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="name"
            label="Name"
            variant="standard"
            size="small"
            value={name}
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
        >
          <AddressFill getFilledAddress={getFilledAddress} hasSubmitted={hasSubmitted} />
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
          <Button
            variant="contained"
            color="secondary"
            endIcon={<SendIcon />}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </StyledForm>
    </ThemeProvider>
  );
};
