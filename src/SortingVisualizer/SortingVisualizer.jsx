import React, { Component } from "react";
import "./SortingVisualizer.css";
import Pile from "./Pile/Pile";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  selectionSort,
  bubbleSort,
  insertionSort,
  mergeSort,
  quickSort,
} from "../Algorithm/sortingAlgorithms";

export default class SortingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      piles: [],
      numPiles: 30,
      finished: false,
      maxPile: 80,
      changingPiles: [],
      pileDelayTimes: [30, 40, 40, 80, 80],
      DelayTimesSizeBased: {
        fast: [15, 20, 20, 40, 40],
        median: [30, 40, 40, 80, 80],
        slow: [60, 80, 80, 160, 160],
      },
      colorSetIndex: getRandomInt(0, 3),
      currentAlgorithm: -1,
      descriptions: [
        "Selection Sort: Repeatedly find the minimum element from the unsorted part and append it to the sorted part.",
        "Bubble Sort: Repeatedly swap the adjacent elements if they are in wrong order, until the largest element is at last.",
        "Insertion Sort: Repeatedly place value from the unsorted part at the correct position in the sorted part (by finding the closest left-side element that is smaller than it).",
        "Merge Sort: Divide the array into two halves, sort them recursively using merge sort, and then merge the two halves.",
        "Quick Sort: Choose an element as pivot, arrange the array such that the elements smaller than pivot are on its left and others are on its right, sort the two halves recursively.",
      ],
      unsortedPiles: [],
      speed: "median",
      size: "median",
      algorithms: [
        "Selection Sort",
        "Bubble Sort",
        "Insertion Sort",
        "Merge Sort",
        "Quick Sort",
      ],
      sortingAlgorithms: [
        selectionSort,
        bubbleSort,
        insertionSort,
        mergeSort,
        quickSort,
      ],
    };

    this.randomizePiles = this.randomizePiles.bind(this);
    this.visualizeSorting = this.visualizeSorting.bind(this);
    this.setAlgorithm = this.setAlgorithm.bind(this);
    this.setSpeed = this.setSpeed.bind(this);
    this.setSize = this.setSize.bind(this);

    this.props.getFunctions(
      this.visualizeSorting,
      this.randomizePiles,
      this.setAlgorithm,
      this.state.algorithms
    );
  }

  componentDidMount() {
    const piles = this.initializePiles(this.state.numPiles);
    this.setState({
      piles: piles,
      unsortedPiles: piles.slice(),
    });
  }

  setAlgorithm(algoId) {
    if (this.state.unsortedPiles.length !== 0) {
      this.setState({
        finished: false,
        changingPiles: [],
        piles: this.state.unsortedPiles,
        pivot: -1,
      });
    }
    this.setState({ currentAlgorithm: algoId });
  }

  initializePiles(numPiles = this.state.numPiles) {
    let piles = [];
    for (let i = 0; i < numPiles; i++) {
      piles.push(i + 5);
    }

    for (let i = 0; i < numPiles; i++) {
      let j = getRandomInt(0, i);
      let temp = piles[i];
      piles[i] = piles[j];
      piles[j] = temp;
    }

    piles.push(numPiles + 5); // dummy pile
    return piles;
  }

  visualizeSorting() {
    if (this.state.currentAlgorithm === -1 || this.state.rendering) return;

    if (this.state.finished) {
      this.setState({
        finished: false,
        changingPiles: [],
        piles: this.state.unsortedPiles,
      });
    }

    this.setState({ rendering: true });
    this.props.setVisualizerRendering(true);
    const piles = this.state.piles.slice();

    const statesInOrder =
      this.state.sortingAlgorithms[this.state.currentAlgorithm](piles);

    const delay = this.state.pileDelayTimes[this.state.currentAlgorithm];

    for (let i = 0; i < statesInOrder.length; i++) {
      const { piles: state, changing: changingPiles, pivot } = statesInOrder[i];
      setTimeout(() => {
        this.setState({
          piles: state,
          changingPiles: changingPiles,
          pivot: pivot,
        });
      }, delay * i);
    }

    setTimeout(() => {
      this.setState({ rendering: false, finished: true });
      this.props.setVisualizerRendering(false);
    }, delay * statesInOrder.length);
  }

  randomizePiles() {
    if (this.state.rendering) return;
    const piles = this.initializePiles(this.state.numPiles);
    this.setState({
      finished: false,
      changingPiles: [],
      colorSetIndex: getRandomInt(0, 3),
      piles: piles,
      unsortedPiles: piles.slice(),
    });
  }

  setSpeed(speed) {
    this.setState({
      speed: speed,
      pileDelayTimes: this.state.DelayTimesSizeBased[speed],
    });
  }

  setSize(s) {
    if (this.state.size === s) return;
    let sizes = { small: 20, median: 30, large: 40 };
    const numPiles = sizes[s];
    const piles = this.initializePiles(numPiles);
    this.setState({
      size: s,
      numPiles: numPiles,
      finished: false,
      changingPiles: [],
      piles: piles,
      unsortedPiles: piles.slice(),
    });
  }

  render() {
    const piles = this.state.piles;
    let nSquare = <p>Time Complexity: θ(n²)</p>;
    let nLogn = <p>Time Complexity: θ(n·log(n))</p>;

    return (
      <>
        <div className="piles container">
          {piles.map((pile, pileId) => (
            <Pile
              dummy={pileId === this.state.numPiles}
              finished={this.state.finished}
              className="pile"
              key={pileId}
              index={pileId}
              val={pile}
              size={this.state.size}
              isChanging={this.state.changingPiles.includes(pileId)}
              isPivot={this.state.pivot === pile}
              colorSetIndex={this.state.colorSetIndex}
            />
          ))}
        </div>

        {/* dropdown start */}

        <div className="d-flex control-panel">
          <Dropdown>
            <Dropdown.Toggle
              variant="outline-dark"
              disabled={this.state.rendering}
              id="dropdown-speed"
              className="navbtn"
            >
              {`Speed: ${this.state.speed}`}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {["slow", "median", "fast"].map((speed) => (
                <Dropdown.Item key={speed} onClick={() => this.setSpeed(speed)}>
                  {speed}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle
              variant="outline-dark"
              disabled={this.state.rendering}
              id="dropdown-size"
              className="navbtn"
            >
              {`Size: ${this.state.size}`}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {["small", "median", "large"].map((size) => (
                <Dropdown.Item key={size} onClick={() => this.setSize(size)}>
                  {size}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* dropdown end */}

        <h6 className="algoDescription">
          {this.state.currentAlgorithm === -1
            ? "Welcome to Sorting. Select an algorithm first."
            : this.state.descriptions[this.state.currentAlgorithm]}
        </h6>

        <h5 className="algoComplexity">
          {this.state.currentAlgorithm === -1
            ? ""
            : this.state.currentAlgorithm < 3
            ? nSquare
            : nLogn}
        </h5>
      </>
    );
  }
}

function getRandomInt(min, range) {
  return Math.floor(Math.random() * range) + min;
}
