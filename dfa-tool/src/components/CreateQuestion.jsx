import React, { useState, useRef, useEffect } from "react";
import {
  FormControl,
  TextField,
  makeStyles,
  IconButton,
  Button,
} from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import Icon from "@material-ui/core/Icon";

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

function CreateQuestion() {
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
  };
  const handleRemoveFields = (index) => {
    const values = [...inputTrans];
    values.splice(index, 1);
    setInputTrans(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const Quizquestions = [];
    inputTrans.forEach((quesiton) => {
      Quizquestions.push(quesiton);
    });
    //creat the new quiz
    const newQuiz = {
      quiztitle: quiztitle.title,
      quesitons: Quizquestions,
    };
    console.log(newQuiz);
  };

  return (
    <>
      <section className="questions">
        <h3>Create Questions</h3>
        <div className="underline"></div>
        <FormControl className={classes.root}>
          <TextField
            name="title"
            id="standard-full-width"
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
                id="standard-full-width"
                label="Regular Expression"
                value={inputTrans.Transistion}
                placeholder="(ab|b)b*"
                helperText="Regular Expression for the DFA"
                margin="normal"
                onChange={(event) => handleChangeInput(index, event)}
              />
              <TextField
                name="alph"
                id="standard-full-width"
                label="Alphabet"
                value={inputTrans.Transistion}
                placeholder="a,b"
                helperText="Alphabet for the Regular Expression"
                margin="normal"
                onChange={(event) => handleChangeInput(index, event)}
              />
              <TextField
                name="hint"
                id="standard-full-width"
                label="Hint"
                value={inputTrans.Transistion}
                placeholder="Check regular expression conversion lecture"
                helperText="Provide a hint to the potential DFA"
                margin="normal"
                onChange={(event) => handleChangeInput(index, event)}
              />
              <IconButton className="formBtn">
                <RemoveIcon
                  disabled={inputTrans.length === 1}
                  onClick={handleRemoveFields}
                />
              </IconButton>
              <IconButton>
                <AddIcon onClick={handleAddFields} />
              </IconButton>
            </div>
          ))}
        </FormControl>
        <div>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleSubmit}
          >
            Check Answer
          </Button>
        </div>
      </section>
    </>
  );
}

export default CreateQuestion;
