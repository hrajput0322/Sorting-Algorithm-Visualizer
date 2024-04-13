import React, { useEffect, useState, useRef } from "react";
import "./SortingVisualizer.css";
import BubbleSort from "../SortingAlgorithms/BubbleSort";
import InsertionSort from "../SortingAlgorithms/InsertionSort";
import QuickSort from "../SortingAlgorithms/QuickSort";
import MergeSort from "../SortingAlgorithms/MergeSort";
import HeapSort from "../SortingAlgorithms/HeapSort";
import SelectionSort from "../SortingAlgorithms/SelectionSort";

const SortingVisualizer = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const sortingInProgressRef = useRef(false); // Use ref instead of state for sortingInProgress
  const [selectedAlgo, setSelectedAlgo] = useState("");

  function resetArray() {
    setSelectedAlgo("");
    sortingInProgressRef.current = false; // Set sorting in progress to false immediately
    const newArr = [];
    for (let i = 0; i < width / 4; i++) {
      let num = Math.floor(Math.random() * (height - 105)) + 5;
      newArr.push([num, "red"]);
    }
    setArr(newArr);
  }

  const [arr, setArr] = useState([]);
  useEffect(() => {
    resetArray();
  }, []);

  function Bubble() {
    setSelectedAlgo("Bubble");
    BubbleSort(arr, setArr, sortingInProgressRef);
  }

  function Selection() {
    setSelectedAlgo("Selection");
    SelectionSort(arr, setArr, sortingInProgressRef);
  }

  function Insertion() {
    setSelectedAlgo("Insertion");
    InsertionSort(arr, setArr, sortingInProgressRef);
  }

  function Quick() {
    setSelectedAlgo("Quick");
    QuickSort(arr, setArr, sortingInProgressRef);
  }

  function Merge() {
    setSelectedAlgo("Merge");
    MergeSort(arr, setArr, sortingInProgressRef);
  }

  function Heap() {
    setSelectedAlgo("Heap");
    HeapSort(arr, setArr, sortingInProgressRef);
  }

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-dark rounded-bottom"
        aria-label="Thirteenth navbar example"
      >
        <div className="container-fluid">
          <button className="btn btn-dark" onClick={resetArray}>
            Generate New Array
          </button>
          <div
            className="navbar-brand mx-auto text-white font-weight-bold"
            style={{ fontSize: "24px" }}
          >
            Sorting Algorithm Visualizer{" "}
            <img src="sort.png" alt="sort-img" style={{ width: "32px" }}></img>
          </div>{" "}
          {/* Nav brand */}
          <div className="justify-content-lg-end">
            <button
              className={`btn btn-dark m-2 ${
                selectedAlgo === "Bubble" ? "active" : ""
              }`}
              onClick={Bubble}
            >
              Bubble Sort
              {selectedAlgo === "Bubble" && <span className="m-2">O(n^2)</span>}
            </button>
            <button
              className={`btn btn-dark m-2 ${
                selectedAlgo === "Selection" ? "active" : ""
              }`}
              onClick={Selection}
            >
              Selection Sort
              {selectedAlgo === "Selection" && <span className="m-2">O(n^2)</span>}
            </button>
            <button
              className={`btn btn-dark m-2 ${
                selectedAlgo === "Insertion" ? "active" : ""
              }`}
              onClick={Insertion}
            >
              Insertion Sort
              {selectedAlgo === "Insertion" && <span className="m-2">O(n^2)</span>}
            </button>
            <button
              className={`btn btn-dark m-2 ${
                selectedAlgo === "Quick" ? "active" : ""
              }`}
              onClick={Quick}
            >
              Quick Sort
              {selectedAlgo === "Quick" && <span className="m-2">O(n log(n))</span>}
            </button>
            <button
              className={`btn btn-dark m-2 ${
                selectedAlgo === "Merge" ? "active" : ""
              }`}
              onClick={Merge}
            >
              Merge Sort
              {selectedAlgo === "Merge" && <span className="m-2">O(n log(n))</span>}
            </button>
            <button
              className={`btn btn-dark m-2 ${
                selectedAlgo === "Heap" ? "active" : ""
              }`}
              onClick={Heap}
            >
              Heap Sort
              {selectedAlgo === "Heap" && <span className="m-2">O(n log(n))</span>}
            </button>
          </div>
        </div>
      </nav>

      <div className="arr-container container-fluid">
        {arr.map((value, idx) => (
          <div
            className="arr-bar"
            key={idx}
            style={{ height: `${value[0]}px`, backgroundColor: `${value[1]}` }}
          ></div>
        ))}
      </div>
    </>
  );
};

export default SortingVisualizer;
