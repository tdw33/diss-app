import React from "react";

//components
import QuizTitles from "../components/QuizTitles";
import HelpModal from "../components/modals/HelpModal";
import info from "../components/modals/modalData";

function Home() {
  // first returns the search field and list of quizes. then helpmodal upon clicking
  return (
    <>
      <QuizTitles />
      <HelpModal
        title={info[0].title}
        mainText={info[0].mainText}
        btn={info[0].button}
      />
    </>
  );
}

export default Home;
