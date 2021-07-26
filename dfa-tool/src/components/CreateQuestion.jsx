import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "../index.css";
import {
  FormControl,
  TextField,
  makeStyles,
  IconButton,
  Button,
} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import Container from "@material-ui/core/Container";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { useGlobalContext } from "./TestContext";
import { AiOutlineQuestionCircle } from "react-icons/ai";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex center",
    flexWrap: "wrap",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#b2cdb1",
      dark: "#688967",
    },
    secondary: {
      light: "#0066ff",
      main: "#b2cdb1",
      dark: "#688967",
      contrastText: "#ffffff",
    },
  },
});

//this start the fucntion

function CreateQuestion() {
  const { openModal } = useGlobalContext();
  const [qLength, setQLength] = useState(1);
  const classes = useStyles();
  const [inputTrans, setInputTrans] = useState([
    {
      regEx: "",
      alph: "",
      hint: "",
    },
  ]);
  const [quiztitle, setQuiztitle] = useState({ title: "" });

  function handleTitle(event) {
    const { name, value } = event.target;
    setQuiztitle((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  const handleChangeInput = (index, event) => {
    const values = [...inputTrans];
    values[index][event.target.name] = event.target.value;
    setInputTrans(values);
  };

  const handleAddFields = () => {
    setInputTrans([
      ...inputTrans,
      {
        regEx: "",
        alph: "",
        hint: "",
      },
    ]);
    setQLength(qLength + 1);
  };
  const handleRemoveFields = (index) => {
    const values = [...inputTrans];
    values.splice(index, 1);
    setInputTrans(values);
    setQLength(qLength - 1);
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    const Quizquestions = [];
    inputTrans.forEach((quesiton) => {
      Quizquestions.push(quesiton);
    });
    //creat the new quiz
    const newQuiz = {
      quiztitle: quiztitle.title,
      questions: Quizquestions,
    };
    console.log(newQuiz);

    // send quiz to server
    axios.post("https://dfa-quiz.herokuapp.com/newquiz", newQuiz);
    window.location.reload();
    alert("you have created a quiz");
  };

  return (
    <>
      <section className="questions">
        <button onClick={openModal} className="btn">
          <AiOutlineQuestionCircle></AiOutlineQuestionCircle>
        </button>
        <h3 className="qtitle">Create Questions</h3>
        <div className="underline"></div>
        <MuiThemeProvider theme={theme}>
          <FormControl className={classes.root}>
            <TextField
              InputProps={{
                className: classes.multilineColor,
              }}
              name="title"
              id="full-width"
              label="Quiz title"
              placeholder="Regular Expression Quiz 1"
              helperText="Give your Quiz a Unique title"
              margin="normal"
              onChange={handleTitle}
            />
            {inputTrans.map((inputTrans, index) => (
              <div className={classes.root} key={index}>
                <TextField
                  name="regEx"
                  id="full-width"
                  label="Regular Expression"
                  value={inputTrans.Transistion}
                  placeholder="(ab|b)b*"
                  helperText="Regular Expression for the DFA"
                  margin="normal"
                  onChange={(event) => handleChangeInput(index, event)}
                />
                <TextField
                  name="alph"
                  id="full-width"
                  label="Alphabet"
                  value={inputTrans.Transistion}
                  placeholder="a,b"
                  helperText="Alphabet for the Regular Expression"
                  margin="normal"
                  onChange={(event) => handleChangeInput(index, event)}
                />
                <TextField
                  name="hint"
                  id="full-width"
                  label="Hint"
                  value={inputTrans.Transistion}
                  placeholder="Check regular expression conversion lecture"
                  helperText="Provide a hint to the potential DFA"
                  margin="normal"
                  onChange={(event) => handleChangeInput(index, event)}
                />
                <IconButton
                  className="formBtn"
                  disabled={qLength === 1}
                  onClick={handleRemoveFields}
                >
                  <RemoveIcon />
                </IconButton>
                <IconButton onClick={handleAddFields}>
                  <AddIcon />
                </IconButton>
              </div>
            ))}
          </FormControl>
          <div>
            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
              type="submit"
              onClick={handleSubmit}
            >
              Create Quiz
            </Button>
          </div>
        </MuiThemeProvider>
      </section>
    </>
  );
}

export default CreateQuestion;
