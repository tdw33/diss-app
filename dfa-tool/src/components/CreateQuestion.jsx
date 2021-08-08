import React, { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";
import {
  FormControl,
  TextField,
  makeStyles,
  IconButton,
  Button,
} from "@material-ui/core";
// import Icon from "@material-ui/core/Icon";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
// import Container from "@material-ui/core/Container";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { useGlobalContext } from "./TestContext";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import info from "./modals/modalData";
import ErrorModal from "../components/modals/ErrorModal";

// setup the syling for materuial UI
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
    [theme.breakpoints.down("md")]: {
      display: "inline block",
    },
  },
  button: {
    margin: theme.spacing(2),
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
  const { openModal, openErrorModal } = useGlobalContext();
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
  const [errors, setErrors] = useState({
    title: "",
    regex: "",
    alpg: "",
    hint: "",
  });
  const [quizes, setQuizes] = useState([
    {
      quiztitle: "",
      questions: [],
    },
  ]);

  //this will fetch the data, based on code from: https://github.com/marinamuse/my-mern-app/blob/master/client/src/App.js
  try {
    useEffect(() => {
      fetch("https://dfa-quiz.herokuapp.com/quizes")
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((json) => setQuizes(json));
    }, []);
    console.log(quizes);
  } catch (error) {
    console.log(error);
    alert(error);
  }

  // handle inputs, additional Qs
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

  // handles the form validation
  const validation = () => {
    let titleError = "";
    let regexError = "";
    let alphError = "";
    let hintError = "";

    if (quiztitle.title === "") {
      titleError = "This field is required";
    }
    quizes.forEach((val) => {
      if (val.quiztitle === quiztitle.title) {
        titleError = "There is a quiz with that title already";
      }
    });
    inputTrans.forEach((val) => {
      if (val.regEx === "") {
        regexError = "This field is required";
      }
      if (val.alph === "") {
        alphError = "This field is required";
      }
      if (val.hint === "") {
        hintError = "This field is required";
      }
    });
    if (titleError || regexError || alphError || hintError) {
      setErrors({
        title: titleError,
        regex: regexError,
        alph: alphError,
        hint: hintError,
      });
      return false;
    }
    return true;
  };

  // handle submission
  const handleSubmit = (e) => {
    if (validation()) {
      setErrors({
        title: "",
        regex: "",
        alph: "",
        hint: "",
      });
      const Quizquestions = [];
      inputTrans.forEach((quesiton) => {
        Quizquestions.push(quesiton);
      });
      //creat the new quiz
      const newQuiz = {
        quiztitle: quiztitle.title,
        questions: Quizquestions,
      };
      // send quiz to server
      axios.post("https://dfa-quiz.herokuapp.com/newquiz", newQuiz);
      //using error modal for quiz creation
      openErrorModal();
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
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
              label="Quiz title"
              placeholder="Regular Expression Quiz 1"
              error={Boolean(errors?.title)}
              helperText={errors?.title}
              margin="normal"
              onChange={handleTitle}
            />
            {inputTrans.map((inputTrans, index) => (
              <div className={classes.root} key={index}>
                <TextField
                  name="regEx"
                  label="Regular Expression"
                  value={inputTrans.Transistion}
                  placeholder="(ab|b)b*"
                  error={Boolean(errors?.regex)}
                  helperText={errors?.regex}
                  margin="normal"
                  onChange={(event) => handleChangeInput(index, event)}
                />
                <TextField
                  name="alph"
                  label="Alphabet"
                  value={inputTrans.Transistion}
                  placeholder="a,b"
                  error={Boolean(errors?.alph)}
                  helperText={errors?.alph}
                  margin="normal"
                  onChange={(event) => handleChangeInput(index, event)}
                />
                <TextField
                  name="hint"
                  label="Hint"
                  value={inputTrans.Transistion}
                  placeholder="Check regular expression conversion lecture"
                  error={Boolean(errors?.hint)}
                  helperText={errors?.hint}
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
      <ErrorModal
        title={info[5].title}
        mainText={info[5].mainText}
        button={info[5].button}
      />
    </>
  );
}

export default CreateQuestion;
