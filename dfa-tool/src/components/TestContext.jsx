import React, { useContext, useState } from "react";

const TestContext = React.createContext();

const GlobalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);
  const [isNonmatchModalOpen, setIsNonmatchModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // This takes elelemt needed from dfa-lib package: https://www.npmjs.com/package/dfa-lib
  var lib = require("dfa-lib");
  var regex = require("dfa-lib/regex");
  var NFA = lib.NFA;
  var DFA = lib.DFA;

  // used to open various modals
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openMatchModal = () => {
    setIsMatchModalOpen(true);
  };
  const closeMatchModal = () => {
    setIsMatchModalOpen(false);
  };
  const openNonmatchModal = () => {
    setIsNonmatchModalOpen(true);
  };
  const closeNonmatchModal = () => {
    setIsNonmatchModalOpen(false);
  };
  const openErrorModal = () => {
    setIsErrorModalOpen(true);
  };
  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  const setLoading = () => {
    setIsLoading(false);
  };

  //this changes the question regex tgo a DFA
  function regToDFA(a, b) {
    var newNFA = regex(a, b);
    var newDFA = newNFA.to_DFA().minimized();
    return newDFA;
  }

  //this handle if they are matching
  function decidability(DFAa, DFAb) {
    const testb = DFAa.find_equivalence_counterexamples(DFAb);
    if (testb[0] === null && testb[1] === null) {
      return true;
    } else {
      console.log("false");
      return false;
    }
  }

  //this is function to change drawn dfa to text  version

  function testlist() {
    // all the values
    if (!localStorage || !JSON) {
      return;
    }
    try {
      var rawData = JSON.parse(localStorage["fsm"]);
      var alphabet = [];
      var acceptingStates = [];
      var startState = "";
      var states = [];
      var trans = {};

      //get the states
      rawData.nodes.forEach((element, index) => {
        if (element.isAcceptState === true) {
          acceptingStates.push(JSON.stringify(index));
        }
        states.push(index);
      });
      states.forEach((e) => {
        trans[e] = {};
      });

      // loop to look into links between nodes
      rawData.links.forEach((element) => {
        // this will aquire the unfiltered alphabet
        if (element.text !== "") {
          alphabet.push(element.text);
          //this will get the other links
          states.forEach((state) => {
            if (state === element.nodeA) {
              // trans[state] = { [element.text]: JSON.stringify(element.nodeB) };
              let newTrans = Object.assign(trans[state], {
                [element.text]: JSON.stringify(element.nodeB),
              });
            }
            if (state === element.node) {
              let newTrans = Object.assign(trans[state], {
                [element.text]: JSON.stringify(element.node),
              });
            }
          });
        }
        // this will get the starting state
        if (element.type === "StartLink") {
          startState = JSON.stringify(element.node);
        }
      });

      alphabet = [...new Set(alphabet)];
      // create the DFA
      var testDFA = new DFA(alphabet, trans, startState, acceptingStates);
      console.log(testDFA);
      return testDFA;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <TestContext.Provider
      value={{
        isModalOpen,
        openModal,
        closeModal,
        regToDFA,
        decidability,
        testlist,
        openMatchModal,
        closeMatchModal,
        isMatchModalOpen,
        openNonmatchModal,
        closeNonmatchModal,
        isNonmatchModalOpen,
        openErrorModal,
        closeErrorModal,
        isErrorModalOpen,
        isLoading,
        setLoading,
      }}
    >
      {children}
    </TestContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(TestContext);
};

export { TestContext, GlobalProvider };
