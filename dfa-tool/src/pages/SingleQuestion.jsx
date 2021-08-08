import React, { useState, useEffect } from "react";
//route for unique quiz page
import { useParams } from "react-router-dom";
//components
import HTML from "../components/HTML";
import QuizModal from "../components/modals/QuizModal";
import MatchingModal from "../components/modals/MatchingModal";
import NonMatchingModal from "../components/modals/NonMatchingModal";
import ErrorModal from "../components/modals/ErrorModal";
import info from "../components/modals/modalData";
//access the global context for its functions
import { useGlobalContext } from "../components/TestContext";
// importing all the icons used on the page
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function SingleQuestion() {
  // this retrieves all the elements (e.g functions) required from the global context
  const {
    openModal,
    regToDFA,
    decidability,
    testlist,
    openMatchModal,
    openNonmatchModal,
    openErrorModal,
  } = useGlobalContext();

  //these below are setting up empty fields to be filled in
  const [quiz, setQuiz] = useState({
    quiztitle: "",
    questions: [
      {
        regEx: "",
        alph: "",
        hint: "",
      },
    ],
  });
  const [word1, setword1] = useState("");
  const [word2, setword2] = useState("");

  //this retrieves the unique quiz id passed into this compenent and sets up the url for fetch
  const { id } = useParams();
  const url = "https://dfa-quiz.herokuapp.com/singlequiz/";
  const url2 = `${url}${id}`;
  console.log(" the url is " + url2);

  //this will fetch the data, based on code from: https://github.com/marinamuse/my-mern-app/blob/master/client/src/App.js
  try {
    useEffect(() => {
      fetch(url2)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((json) => setQuiz(json));
    }, []);
  } catch (error) {
    console.log(error);
    alert(error);
  }

  // This sets up all the questions from the fetched data according to index
  const [index, setIndex] = useState(0);
  const reg = quiz.questions[index].regEx;
  const hint = quiz.questions[index].hint;
  // the alphabet input splices any commas or spaces the user might input
  const alph = quiz.questions[index].alph.replace(/,| /g, "").split("");
  const quiztitle = quiz.quiztitle;

  // FUNCTIONS

  // Below handles the changing of questions through adding to the index
  //and checking the number is in the index range for the quiz
  // This code is based on elements from here https://github.com/john-smilga/react-projects/blob/master/03-reviews/final/src/Review.js
  const checkIndex = (number) => {
    if (number > quiz.questions.length - 1) {
      return 0;
    }
    if (number < 0) {
      return quiz.questions.length - 1;
    }
    return number;
  };

  const nextQuestion = () => {
    setIndex((index) => {
      return checkIndex(index + 1);
    });
  };
  const prevQuestion = () => {
    setIndex((index) => {
      return checkIndex(index - 1);
    });
  };

  //checks the drawn DFA to the regular expression
  const handleSubmit = (regex, alph) => {
    var drawnDFA = testlist();
    var questionDFA = regToDFA(regex, alph);

    //each result will cause an open of a modal using a global context function
    try {
      if (decidability(drawnDFA, questionDFA)) {
        var words = drawnDFA.find_equivalence_counterexamples(questionDFA);
        openMatchModal();
      } else {
        // if not matching find the counter words accepted by each DFA and set words
        words = drawnDFA.find_equivalence_counterexamples(questionDFA);
        setword1(words[0]);
        setword2(words[1]);
        openNonmatchModal();
      }
    } catch (error) {
      //this is an invalid DFA fro the regex
      openErrorModal();
    }
  };

  //this is waht is returned to the page
  return (
    <>
      <section>
        <div className="qcontainer">
          <button onClick={openModal} className="btn">
            <AiOutlineQuestionCircle></AiOutlineQuestionCircle>
          </button>
          <h2 className="title">{quiztitle}</h2>
          <section className="questions">
            <h3 className="questionnumber">Question {index + 1}</h3>
            <div className="underline"></div>
            <h4 className="regex">
              Please give the equivalent DFA for the following regular
              expression: {reg}
            </h4>
            <h4 className="regex hint">Hint: {hint} </h4>
            <div className="button-container">
              <button className="prev-btn" onClick={prevQuestion}>
                <FaChevronLeft />
              </button>
              <button className="next-btn" onClick={nextQuestion}>
                <FaChevronRight />
              </button>
            </div>
            <button
              className="quizbutton"
              onClick={() => handleSubmit(reg, alph)}
            >
              Check Answer
            </button>
          </section>
        </div>
      </section>
      {/* These are the other components that are rendered on the page */}
      <div className="canvasContainer">
        <HTML />
      </div>
      <QuizModal />
      <MatchingModal
        title={info[2].title}
        mainText={info[2].mainText}
        button={info[2].button}
      />
      <NonMatchingModal
        title={info[3].title}
        mainText={info[3].mainText}
        drawnDFA={word1}
        questionDFA={word2}
        button={info[3].button}
      />
      <ErrorModal
        title={info[4].title}
        mainText={info[4].mainText}
        button={info[4].button}
      />
    </>
  );
}

export default SingleQuestion;
