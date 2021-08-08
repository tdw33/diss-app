const info = [
  {
    id: 1,
    title: "Home Page",
    mainText:
      "This is the Home Page where you can search for pre-made quizzes to attempt. Simply enter the quiz title and look for the quiz. Then click the open quiz button and you will be taken to the quiz.",
    button: "Start Looking!",
  },
  {
    id: 2,
    title: "Question Page",
    mainText:
      "This is the Question Page where you can fill out the form to create a new quiz. You can add as many regular expressions as you want using the buttons. Make sure to match the alphabet with the expression entered and fill each field.",
    button: "Create Quiz",
  },
  {
    id: 3,
    title: "Matching",
    mainText:
      "Congratulations! That is the correct DFA for the regular expression",
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
    title: "Not A Valid DFA",
    mainText:
      "That is not a valid DFA for the regular expression. Make sure to only use the alphabet for the given regular expression and all DFA rules are followed. click on the help button to read more on DFA drawing for the canvas.",
    button: "Back to Quiz",
  },
  {
    id: 6,
    title: "Quiz Created",
    mainText:
      "Congratulations! You have created a new quiz. To see this quiz go to the home page and search for the quiz title.",
    button: "Back to Quiz Creator",
  },
];
export default info;
