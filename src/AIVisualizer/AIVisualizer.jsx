import React, { Component } from "react";
import { initNetworkAnimation } from "./networkAnimation"; // Keep as is

import PtronVisualizer from "./Perceptron/PtronVisualizer";
import PongVisualizer from "./PongVisualizer/PongVisualizer";
import ConnectFour from "./ConnectFourVisualizer/ConnectFour";
import NNSnakeVisualizer from "./NNSnakeVisualizer/NNSnakeVisualizer";
import "./AIVisualizer.css";

export default class AIVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAlgorithm: -1,
      algorithms: ["Perceptron", "Approximate Q", "Minimax"],
      visualizeAI: () => {},
      reset: () => {},
    };

    this.getAIFunctions = this.getAIFunctions.bind(this);
    this.setAlgorithm = this.setAlgorithm.bind(this);
  }

  componentDidMount() {
    initNetworkAnimation();

    // Pass the AI algorithms and dummy go/reset/setAlgo functions to Visualizer
    this.props.getFunctions(
      () => {
        // This will be updated by specific AI visualizers later via getAIFunctions
        if (this.state.visualizeAI) this.state.visualizeAI();
      },
      () => {
        if (this.state.reset) this.state.reset();
      },
      this.setAlgorithm,
      this.state.algorithms
    );
  }

  componentDidUpdate(prevProps, prevState) {
    // When algorithms or functions change, update Visualizer again (optional)
    if (prevState.algorithms !== this.state.algorithms) {
      this.props.getFunctions(
        () => {
          if (this.state.visualizeAI) this.state.visualizeAI();
        },
        () => {
          if (this.state.reset) this.state.reset();
        },
        this.setAlgorithm,
        this.state.algorithms
      );
    }
  }

  getAIFunctions(run, reset) {
    this.setState({
      visualizeAI: run,
      reset: reset,
    });
  }

  setAlgorithm(algoId) {
    this.setState({ currentAlgorithm: algoId });
  }

  render() {
    let renderObj;
    switch (this.state.currentAlgorithm) {
      case -1:
        renderObj = (
          <div>
            <div className="textcontainer">
              <div className="typewriter">
                <h1>Welcome to the Future.</h1>
              </div>
            </div>
            <div
              id="large-header"
              className="large-header"
              style={{ marginTop: "-18em" }}
            >
              <canvas id="demo-canvas"></canvas>
            </div>
          </div>
        );
        break;
      case 0:
        renderObj = (
          <PtronVisualizer
            setVisualizerRendering={this.props.setVisualizerRendering}
            getFunctions={this.getAIFunctions}
          />
        );
        break;
      case 1:
        renderObj = (
          <PongVisualizer
            setVisualizerRendering={this.props.setVisualizerRendering}
            getFunctions={this.getAIFunctions}
          />
        );
        break;
      case 2:
        renderObj = (
          <ConnectFour
            setVisualizerRendering={this.props.setVisualizerRendering}
            getFunctions={this.getAIFunctions}
          />
        );
        break;
      case 3:
        renderObj = (
          <NNSnakeVisualizer
            setVisualizerRendering={this.props.setVisualizerRendering}
            getFunctions={this.getAIFunctions}
          />
        );
        break;
      default:
        renderObj = null;
    }

    return <div>{renderObj}</div>;
  }
}
