import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import HTML from "../components/HTML";
import QuizModal from "../components/modals/QuizModal";
import MatchingModal from "../components/modals/MatchingModal";
import NonMatchingModal from "../components/modals/NonMatchingModal";
import ErrorModal from "../components/modals/ErrorModal";
import { useGlobalContext } from "../components/TestContext";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import info from "../components/modals/modalData";

function SingleQuestion() {
  const {
    openModal,
    regToDFA,
    decidability,
    testlist,
    openMatchModal,
    openNonmatchModal,
    openErrorModal,
  } = useGlobalContext();
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

  const { id } = useParams();
  const url = "https://dfa-quiz.herokuapp.com/singlequiz/";
  const url2 = `${url}${id}`;
  console.log(" the url is " + url2);

  //this will fetch the data
  try {
    useEffect(() => {
      fetch(url2)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((jsonRes) => setQuiz(jsonRes));
      console.log("i fire once");
      // setLoad(false);
    }, []);
  } catch (error) {
    console.log(error);
    alert(error);
  }

  // This sets up all the questions
  const [index, setIndex] = useState(0);
  const reg = quiz.questions[index].regEx;
  const hint = quiz.questions[index].hint;
  const alph = quiz.questions[index].alph.replace(",", "").split("");
  const quiztitle = quiz.quiztitle;

  // this handle the changing of questions
  const checkNumber = (number) => {
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
      let newIndex = index + 1;

      return checkNumber(newIndex);
    });
  };
  const prevQuestion = () => {
    setIndex((index) => {
      let newIndex = index - 1;
      return checkNumber(newIndex);
    });
  };

  //checks the drawn DFA to the regular expression
  const handleSubmit = (regex, alph) => {
    var drawnDFA = testlist();
    var questionDFA = regToDFA(regex, alph);
    try {
      if (decidability(drawnDFA, questionDFA)) {
        console.log("they are matching");
        var words = drawnDFA.find_equivalence_counterexamples(questionDFA);
        openMatchModal();
      } else {
        console.log("they are not matching ");
        words = drawnDFA.find_equivalence_counterexamples(questionDFA);
        console.log("these are the cpunter words: ", words);
        setword1(words[0]);
        setword2(words[1]);
        openNonmatchModal();
      }
    } catch (error) {
      openErrorModal();
    }
  };

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
              Please give the equivelent DFA for the following regular
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
              {/* <button onClick={handleSubmit(reg, alph)}>Check answer</button> */}
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
