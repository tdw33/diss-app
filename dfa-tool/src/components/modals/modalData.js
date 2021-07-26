const info = [
  {
    id: 1,
    title: "Home Page",
    mainText:
      "This is the home page where you can search for pre-made quizes to attmept. Simply enter the quiz title and click open quiz",
    button: "Start Looking!",
  },
  {
    id: 2,
    title: "Question Page",
    mainText:
      "This is the the question page where you can fill out the form to create a new quiz. You can add as many regualar expressions as you want using the buttons. Make sure to match the alphabet with the expression entered",
    button: "Create Quiz",
  },
  {
    id: 3,
    title: "Matching",
    mainText:
      "congratulations! That is the correct DFA for the regular expression",
    button: "Back to Quiz",
  },
  {
    id: 4,
    title: "Not Matching",
    mainText: "That is incorrect, the two DFA's do not match together",
    button: "Back to Quiz",
  },
  {
    id: 5,
    title: "Not a valid DFA",
    mainText:
      "That is not a valid DFA for the regualar rexpression. Make sure to only use the alphabet for the regular expression and click on the help button to read more on DFA drawing",
    button: "Back to Quiz",
  },
];
export default info;
