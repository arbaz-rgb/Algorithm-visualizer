import React, { Component } from "react";
import TextLoop from "./TextLoop";

import PathFindingVisualizer from "./PathFindingVisualizer/PathFindingVisualizer";
import SortingVisualizer from "./SortingVisualizer/SortingVisualizer";
import "./Visualizer.css";
import AIVisualizer from "./AIVisualizer/AIVisualizer";

export default class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "main",
      rendering: false,
      algorithms: [],
      currentAlgorithm: null,
      goFunction: () => {},
      resetFunction: () => {},
      setAlgorithm: () => {},
      sortingClicked: false,
      pathClicked: false,
      AIClicked: false,
      aicount: 0,
    };
    this.getFunctions = this.getFunctions.bind(this);
    this.changeRenderingState = this.changeRenderingState.bind(this);
  }

  changeRenderingState(rendering) {
    this.setState({ rendering: rendering });
  }

  getFunctions(go, reset, setAlgo, algorithms) {
    this.setState({
      goFunction: go,
      resetFunction: reset,
      setAlgorithm: setAlgo,
      algorithms: algorithms,
    });
  }

  render() {
    let renderObj = null;
    if (this.state.mode === "pathfinding") {
      renderObj = (
        <PathFindingVisualizer
          setVisualizerRendering={this.changeRenderingState}
          getFunctions={this.getFunctions}
        />
      );
    } else if (this.state.mode === "sorting") {
      renderObj = (
        <SortingVisualizer
          setVisualizerRendering={this.changeRenderingState}
          getFunctions={this.getFunctions}
        />
      );
    } else if (this.state.mode === "ai") {
      renderObj = (
        <AIVisualizer
          count={this.state.aicount}
          setVisualizerRendering={this.changeRenderingState}
          getFunctions={this.getFunctions}
        />
      );
    } else {
      renderObj = (
        <div className="welbotron">
          <div className="container welc">
            <h1 className="welcome">
              Hello, algorithms.
              <div className="quote">
                <TextLoop
                  interval={3800}
                  springConfig={{ stiffness: 200 }}
                  adjustingSpeed={300}
                >
                  <div className="quoteText">
                    "An algorithm must be seen to be believed."
                  </div>
                  <div className="quoteText">
                    "Algorithms are central objects of study in Computer
                    Science."
                  </div>
                  <div className="quoteText">
                    "Algorithms are apprehensible magics."
                  </div>
                  <div className="quoteText">
                    "An algorithm is like a recipe."
                  </div>
                </TextLoop>
              </div>
              <p className="lead">
                This website might help you understand algorithms better by
                visualizing them.
              </p>
              <p className="secondline lead">
                Click on one of the categories below to visualize algorithms.
              </p>
            </h1>
            <a
              href="#"
              className="mainpage-b"
              onClick={() => {
                if (!this.state.rendering) {
                  this.setState({
                    mode: "pathfinding",
                    currentAlgorithm: null,
                    pathClicked: true,
                  });
                }
              }}
              data-toggle={this.state.pathClicked ? "" : "modal"}
              data-target="#pathIntroModal"
            >
              <span></span>
              PATH FINDING
            </a>
            <a
              href="#"
              className="mainpage-b"
              onClick={() => {
                if (!this.state.rendering) {
                  this.setState({
                    mode: "sorting",
                    currentAlgorithm: null,
                    sortingClicked: true,
                  });
                }
              }}
              data-toggle={this.state.sortingClicked ? "" : "modal"}
              data-target="#sortingIntroModal"
            >
              <span></span>
              SORTING
            </a>
            <a
              href="#"
              className="mainpage-b"
              onClick={() => {
                if (!this.state.rendering) {
                  this.setState({
                    mode: "ai",
                    currentAlgorithm: null,
                    AIClicked: true,
                  });
                }
              }}
              data-toggle={this.state.AIClicked ? "" : "modal"}
              data-target="#aiIntroModal"
            >
              <span></span>
              ARTIFICIAL INTELLIGENCE
            </a>
          </div>
        </div>
      );
    }
    let invisibleOrNot = "";
    if (this.state.mode === "main") invisibleOrNot = " invisible";
    let algorithms = this.state.algorithms;
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-dark">
          <button
            onClick={() => {
              if (!this.state.rendering) {
                this.setState({ mode: "main" });
              }
            }}
            type="button"
            className="btn btn-dark navbtn"
            disabled={this.state.rendering}
          >
            Main
          </button>

          <button
            onClick={() => {
              if (!this.state.rendering) {
                this.setState({
                  mode: "pathfinding",
                  currentAlgorithm: null,
                  pathClicked: true,
                });
                this.state.setAlgorithm(-1);
              }
            }}
            type="button"
            className="btn btn-dark navbtn"
            data-toggle={this.state.pathClicked ? "" : "modal"}
            data-target="#pathIntroModal"
            disabled={this.state.rendering}
          >
            Pathfinding
          </button>

          <button
            onClick={() => {
              if (!this.state.rendering) {
                this.setState({
                  mode: "sorting",
                  currentAlgorithm: null,
                  sortingClicked: true,
                });
                this.state.setAlgorithm(-1);
              }
            }}
            type="button"
            className="btn btn-dark navbtn"
            data-toggle={this.state.sortingClicked ? "" : "modal"}
            data-target="#sortingIntroModal"
            disabled={this.state.rendering}
          >
            Sorting
          </button>

          <button
            onClick={() => {
              if (!this.state.rendering) {
                this.setState({
                  mode: "ai",
                  currentAlgorithm: null,
                  AIClicked: true,
                });
                this.state.setAlgorithm(-1);
              }
            }}
            type="button"
            className="btn btn-dark navbtn"
            data-toggle={this.state.AIClicked ? "" : "modal"}
            data-target="#aiIntroModal"
            disabled={this.state.rendering}
          >
            AI
          </button>

          <div className={"dropdown" + invisibleOrNot}>
            <button
              className="btn btn-secondary dropdown-toggle navbtn"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              disabled={this.state.rendering}
            >
              {this.state.currentAlgorithm == null
                ? "Algorithms"
                : this.state.currentAlgorithm}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                {algorithms.map((algorithm, algoId) => (
                  <button
                    key={algoId}
                    type="button"
                    className="btn btn-light navbtn"
                    onClick={() => {
                      this.state.setAlgorithm(algoId);
                      this.setState({
                        currentAlgorithm: this.state.algorithms[algoId],
                      });
                    }}
                  >
                    {algorithm}
                  </button>
                ))}
              </li>
            </div>
          </div>

          <div className={"dropdown" + invisibleOrNot}>
            <button
              className="btn btn-light dropdown-toggle navbtn"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              disabled={this.state.rendering}
            >
              Actions
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <button
                  type="button"
                  className="btn btn-light navbtn"
                  onClick={() => this.state.goFunction()}
                  data-toggle={
                    this.state.currentAlgorithm === null ? "modal" : ""
                  }
                  data-target="#setAlgoModal"
                  disabled={
                    this.state.mode === "ai" &&
                    this.state.currentAlgorithm === "Minimax"
                  }
                >
                  Go!
                </button>
                <button
                  type="button"
                  className="btn btn-light navbtn"
                  onClick={() => this.state.resetFunction()}
                >
                  Reset
                </button>
              </li>
            </div>
          </div>

          <a
            href="https://github.com/JasonFengGit"
            style={{ marginLeft: "32%" }}
          >
            <img
              className="githubimg"
              src="https://github.com/JasonFengGit/Visualizer/raw/master/src/Github_icon.png"
              width="40px"
              height="40px"
              style={{ opacity: "0.7" }}
              alt="GitHub repository link"
            />
          </a>
        </nav>

        <div className="modal fade" id="setAlgoModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">No Algorithm Selected</h5>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>

              <div className="modal-body-alert">
                <p>Please select an algorithm first.</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-dark"
                  data-dismiss="modal"
                  style={{ width: "100px" }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Other modals remain unchanged */}

        <div>{renderObj}</div>
      </>
    );
  }
}
