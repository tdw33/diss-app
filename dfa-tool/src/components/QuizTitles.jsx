import React, { useState, useEffect } from "react";
// allows fro the route to unique quiz id
import { Link } from "react-router-dom";
//components
import Loading from "./Loading";
//deals with deleting quizes
import axios from "axios";
// access global functions
import { useGlobalContext } from "./TestContext";
//icons used on the page
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { ImCross } from "react-icons/im";

function QuizTitle() {
  const { openModal, setLoading, isLoading } = useGlobalContext();
  const [quizes, setQuizes] = useState([
    {
      quiztitle: "",
      questions: [],
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

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

  // this will delete the quiz from the database
  function handleRemove(id) {
    axios.delete("https://dfa-quiz.herokuapp.com/delete/" + id);
    window.location.reload();
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
          .filter((quiz) => {
            if (searchTerm === "") {
              return quiz;
            } else if (
              quiz.quiztitle
                .toLocaleLowerCase()
                .includes(searchTerm.toLowerCase())
            ) {
              return quiz;
            }
          })
          .map((quiz, index) => {
            if (quiz) {
              return (
                <div className="qtitlecontainer" key={index}>
                  <h3>{quiz.quiztitle}</h3>
                  <div className="test">
                    <Link
                      to={`/SingleQuestion/${quiz._id}`}
                      className="quizbutton"
                    >
                      Open Quiz
                    </Link>
                    <ImCross
                      className="removeQuizBtn"
                      onClick={() => handleRemove(quiz._id)}
                    ></ImCross>
                  </div>
                </div>
              );
            }
          })}
      </div>
    </>
  );
}

export default QuizTitle;
