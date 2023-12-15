import styledCom from "styled-components";
import {Button, styled, TextField} from "@mui/material";

export const BodyDiv = styledCom.div({
    margin:'2%'
});

export const MainDiv = styledCom.div({
    width: "100%",
    textAlign: "left",
    backgroundColor: "white",
    borderRadius: "12px",
    display: 'block'
});

export const CoreTextField = styled(TextField)({
    marginTop: '1%',
    marginBottom: '1%',
    width:'50%'
})

export const CoreButton = styled(Button)({
    marginTop: '1%',
    marginBottom: '1%',
})
