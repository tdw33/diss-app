const questions = [
  {
    id: 1,
    title: "quiz1",
    regex: "(a|b)*",
    alphabet: ["a", "b"],
  },
  {
    id: 2,
    title: "quiz1",
    regex: "(ab)b*",
    alphabet: ["a", "b"],
  },
  {
    id: 3,
    title: "quiz2",
    regex: "abba",
    alphabet: ["a", "b"],
  },
  {
    id: 4,
    title: "quiz2",
    regex: "(a|b)(ab)*",
    alphabet: ["a", "b"],
  },
];

export default questions;
