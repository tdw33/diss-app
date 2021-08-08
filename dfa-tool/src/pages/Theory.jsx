import React from "react";
// allows for accesing the home page from home icon
import { useHistory } from "react-router-dom";
//all the pictures used on the page
import DFA from "./Pictures/DFA.png";
import NFA from "./Pictures/NFA.png";
import regab from "./Pictures/regab.png";
import union from "./Pictures/union.png";
import kleene from "./Pictures/kleene.png";
import NFADFA from "./Pictures/NFADFA.png";
// the Home icon used on the page
import { AiFillHome } from "react-icons/ai";

const Theory = () => {
  //routes the Home icon to the hompe page
  const history = useHistory();
  const handleHistory = () => {
    history.push("/");
  };

  //This will handle the buttons at the top
  const handleClick = (e) => {
    e.preventDefault();
    const target = e.target.getAttribute("href");
    const location = document.querySelector(target).offsetTop;

    // using the location made the page will scroll to it
    window.scrollTo({
      top: location,
    });
  };

  //This is what is rendered to the page
  return (
    <>
      <div className="theory-container">
        <button className="home-btn" onClick={handleHistory}>
          <AiFillHome></AiFillHome>
        </button>
        <div className="theory-button-container">
          <a className="theory-button" href="#DFA" onClick={handleClick}>
            DFA
          </a>
          <a className="theory-button" href="#NFA" onClick={handleClick}>
            NFA
          </a>
          <a className="theory-button" href="#RegExp" onClick={handleClick}>
            Regular Expression to NFA
          </a>
          <a className="theory-button" href="#NFA-DFA" onClick={handleClick}>
            NFA to DFA
          </a>
        </div>
        <section className="DFA" id="DFA">
          <h2>DFA</h2>
          <div className="underline2"></div>
          <p>
            The simplest form of finite automata is the deterministic finite
            automata (DFA), where there are states with transitions from one to
            another, matching with the required input. To fully understand DFAs
            without uncertainty, a formal definition is required which also
            helps with the notion in designing them. From this the 5 tuples can
            be formed as follows:
          </p>
          <div>
            <li className="list">𝑄 are states and are finite</li>
            <li className="list">Σ is a finite alphabet</li>
            <li className="list"> 𝛿: 𝑄 × Σ → 𝑄 is the transition function</li>
            <li className="list">𝑞0 ∈ 𝑄 is the start state</li>
            <li className="list">𝐹 ⊆ Q is the set of accepting states</li>
          </div>
          <img src={DFA} alt="DFA" />
          <p>The figure shows the DFA for the regular expression: (a|ab)*</p>
        </section>
        <section className="NFA" id="NFA">
          <h2>NFA</h2>
          <div className="underline2"></div>
          <p>
            Following DFAs there are nondeterministic finite automata (NFA)
            which differ through the idea that when the next input symbol from
            the language is read, there will be the possibility for more than
            one option for the machine to travel to from that state.
          </p>
          <p>
            An NFA can have 0 to 𝑛 arrows leaving it. Second, the NFA can have
            another transition arrow noted 𝜀 which allows the machine to jump
            from one state to another without the input of a symbol from the
            alphabet. The NFA also has a formal description similar to the DFA
            with 5-tuples. The difference seen is in the transition function.
            The NFA transition functions will take the input symbol or empty
            string and create all the possible next states. The 5-tuples are
            noted as followed:
          </p>
          <div>
            <li className="list">𝑄 are states and are finite</li>
            <li className="list">Σ is a finite alphabet</li>
            <li className="list">
              𝛿: 𝑄 × Σ𝜀 → 𝑃(𝑄) is the transition function{" "}
            </li>
            <li className="list">𝑞0 ∈ 𝑄 is the start state</li>
            <li className="list">𝐹 ⊆ Q is the set of the accepting states</li>
          </div>
          <img src={NFA} alt="NFA" />
          <p>The figure shows the NFA for the regular expression: (a|ab)*</p>
        </section>
        <section className="RegExp" id="RegExp">
          <h2>Regular Expression to NFA</h2>
          <div className="underline2"></div>
          <p>
            Regular expressions can be used to describe both equivalent DFAs and
            NFAs. These expressions can be converted into DFAs through a few
            steps. First, they are converted into an equivalent NFA.
          </p>
          <p>
            If you take the example (a|ab)*, you can first generate the small
            NFAs as shown below, with the (ab) being further simplified. You
            should aim to simplify as much as possible throughout the process.
          </p>
          <img src={regab} alt="Regex"></img>
          <p>
            Using these we then start to formulate the full expression which
            uses union and Kleene star. The first figure shows the union of (a)
            and (ab) with a further simplified version. Next, the Kleene star of
            the Union is created and simplified into the final NFA. Often you
            can draw the NFA without following each step strictly.
          </p>
          <img src={union} alt="union"></img>
          <img src={kleene} alt="kleene"></img>
        </section>
        <section className="NFA-DFA" id="NFA-DFA">
          <h2>NFA to DFA</h2>
          <div className="underline2"></div>
          <p>
            The final step is converting this NFA into the DFA. To achieve this
            you can follow these steps:
          </p>
          <div>
            <li className="list">
              Handle the epsilon arrows by joinig the two states
            </li>
            <li className="list">
              For each state follow where the arrows go based on the NFA and
              note down the new state. This should produce a table as shown
              below
            </li>
            <li className="list">
              The accepting states will be any of the new states that contain
              accepting states from the NFA
            </li>
            <li className="list">
              Remember to include the empty state if required
            </li>
          </div>
          <div className="table">
            <table>
              <tbody>
                <tr>
                  <th></th>
                  <th>a</th>
                  <th>b</th>
                </tr>
                <tr>
                  <td>1</td>
                  <td>1,2</td>
                  <td>Empty</td>
                </tr>
                <tr>
                  <td>1,2</td>
                  <td>1,2</td>
                  <td>1</td>
                </tr>
                <tr>
                  <td>Empty</td>
                  <td>Empty</td>
                  <td>Empty</td>
                </tr>
              </tbody>
            </table>
          </div>
          <img src={NFADFA} alt="NFA-DFA"></img>
          <p>
            This figure shows the conversion of the NFA to the DFA based on the
            table produced.
          </p>
        </section>
      </div>
    </>
  );
};

export default Theory;
