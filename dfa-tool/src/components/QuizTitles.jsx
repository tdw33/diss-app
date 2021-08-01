import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "./TestContext";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import Loading from "./Loading";

function QuizTitle() {
  const { openModal, setLoading, isLoading } = useGlobalContext();
  const [quizes, setQuizes] = useState([
    {
      quiztitle: "",
      questions: [],
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  //fetch the quiz titles
  try {
    useEffect(() => {
      fetch("https://dfa-quiz.herokuapp.com/quizes")
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((jsonRes) => setQuizes(jsonRes));
      setLoading();
    }, []);
    console.log(quizes);
  } catch (error) {
    console.log(error);
    alert(error);
  }

  // this will run until the data is fetched
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="search">
        <button onClick={openModal} className="btn">
          <AiOutlineQuestionCircle></AiOutlineQuestionCircle>
        </button>
        <h4 className="search-title">Search for a quiz</h4>
        <input
          className="search-form"
          type="text"
          placeholder="example quiz"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      </div>
      <div className="question-title">
        <h2 className="title">Quiz Selection</h2>
        {quizes
          .filter((val) => {
            if (searchTerm === "") {
              return val;
            } else if (
              val.quiztitle
                .toLocaleLowerCase()
                .includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          })
          .map((quiz, index) => {
            if (quiz) {
              return (
                <div className="qtitlecontainer" key={index}>
                  <h3>{quiz.quiztitle}</h3>
                  <Link
                    to={`/SingleQuestion/${quiz._id}`}
                    className="quizbutton"
                  >
                    Open Quiz
                  </Link>
                </div>
              );
            }
          })}
      </div>
    </>
  );
}

export default QuizTitle;
