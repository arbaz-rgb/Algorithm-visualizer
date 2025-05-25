import React, { Component } from "react";
import TextLoop from "./TextLoop";

import PathFindingVisualizer from "./PathFindingVisualizer/PathFindingVisualizer";
import SortingVisualizer from "./SortingVisualizer/SortingVisualizer";
import "./Visualizer.css";
import AIVisualizer from "./AIVisualizer/AIVisualizer";

import Dropdown from "react-bootstrap/Dropdown";

import "bootstrap/dist/css/bootstrap.min.css";

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
    this.setState({ rendering });
  }

  getFunctions(go, reset, setAlgo, algorithms) {
    this.setState({
      goFunction: go,
      resetFunction: reset,
      setAlgorithm: setAlgo,
      algorithms: algorithms,
    });
  }

  handleModeSwitch = (mode) => {
    if (!this.state.rendering) {
      this.setState({
        mode,
        currentAlgorithm: null,
        pathClicked: mode === "pathfinding",
        sortingClicked: mode === "sorting",
        AIClicked: mode === "ai",
      });
      this.state.setAlgorithm(-1);
    }
  };

  handleAlgorithmSelect = (algoId) => {
    this.state.setAlgorithm(algoId);
    this.setState({ currentAlgorithm: this.state.algorithms[algoId] });
  };

  render() {
    const {
      rendering,
      currentAlgorithm,
      algorithms,
      goFunction,
      resetFunction,
      mode,
    } = this.state;

    let renderObj = null;
    if (mode === "pathfinding") {
      renderObj = (
        <PathFindingVisualizer
          setVisualizerRendering={this.changeRenderingState}
          getFunctions={this.getFunctions}
        />
      );
    } else if (mode === "sorting") {
      renderObj = (
        <SortingVisualizer
          setVisualizerRendering={this.changeRenderingState}
          getFunctions={this.getFunctions}
        />
      );
    } else if (mode === "ai") {
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
              onClick={() => this.handleModeSwitch("pathfinding")}
              data-toggle={this.state.pathClicked ? "" : "modal"}
              data-target="#pathIntroModal"
            >
              <span></span>
              PATH FINDING
            </a>
            <a
              href="#"
              className="mainpage-b"
              onClick={() => this.handleModeSwitch("sorting")}
              data-toggle={this.state.sortingClicked ? "" : "modal"}
              data-target="#sortingIntroModal"
            >
              <span></span>
              SORTING
            </a>
            {/* <a
              href="#"
              className="mainpage-b"
              onClick={() => this.handleModeSwitch("ai")}
              data-toggle={this.state.AIClicked ? "" : "modal"}
              data-target="#aiIntroModal"
            >
              <span></span>
              ARTIFICIAL INTELLIGENCE
            </a> */}
          </div>
        </div>
      );
    }

    let invisibleOrNot = mode === "main" ? " invisible" : "";

    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-dark d-flex align-items-center">
          <button
            onClick={() => this.handleModeSwitch("main")}
            type="button"
            className="btn btn-dark navbtn"
            disabled={rendering}
          >
            Main
          </button>

          <button
            onClick={() => this.handleModeSwitch("pathfinding")}
            type="button"
            className="btn btn-dark navbtn"
            data-toggle={this.state.pathClicked ? "" : "modal"}
            data-target="#pathIntroModal"
            disabled={rendering}
          >
            Pathfinding
          </button>

          <button
            onClick={() => this.handleModeSwitch("sorting")}
            type="button"
            className="btn btn-dark navbtn"
            data-toggle={this.state.sortingClicked ? "" : "modal"}
            data-target="#sortingIntroModal"
            disabled={rendering}
          >
            Sorting
          </button>

          {/* <button
            onClick={() => this.handleModeSwitch("ai")}
            type="button"
            className="btn btn-dark navbtn"
            data-toggle={this.state.AIClicked ? "" : "modal"}
            data-target="#aiIntroModal"
            disabled={rendering}
          >
            AI
          </button> */}

          <Dropdown
            className={"dropdown " + invisibleOrNot}
            disabled={rendering}
          >
            <Dropdown.Toggle
              variant="secondary"
              id="dropdownMenuButton"
              disabled={rendering}
              className="navbtn"
            >
              {currentAlgorithm == null ? "Algorithms" : currentAlgorithm}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {algorithms.map((algorithm, algoId) => (
                <Dropdown.Item
                  key={algoId}
                  onClick={() => this.handleAlgorithmSelect(algoId)}
                >
                  {algorithm}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown
            className={"dropdown " + invisibleOrNot}
            disabled={rendering}
          >
            <Dropdown.Toggle
              variant="light"
              id="dropdownMenuButtonActions"
              disabled={rendering}
              className="navbtn"
            >
              Actions
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => goFunction()}
                disabled={mode === "ai" && currentAlgorithm === "Minimax"}
                data-toggle={currentAlgorithm === null ? "modal" : ""}
                data-target="#setAlgoModal"
              >
                Go!
              </Dropdown.Item>
              <Dropdown.Item onClick={() => resetFunction()}>
                Reset
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </nav>

        <div className="modal fade" id="setAlgoModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">No Algorithm Selected</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
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
