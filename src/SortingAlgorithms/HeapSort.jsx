export default async function HeapSort(arr, setArr, sortingInProgressRef) {
  sortingInProgressRef.current = true; // Set sorting in progress to true
  let newArr = [...arr]; // Create a copy of the state array

  const heapify = async (arr, n, i) => {
      let largest = i; // Initialize largest as root
      let left = 2 * i + 1; // left = 2*i + 1
      let right = 2 * i + 2; // right = 2*i + 2

      // If left child is larger than root
      if (left < n && arr[left][0] > arr[largest][0]) largest = left;

      // If right child is larger than largest so far
      if (right < n && arr[right][0] > arr[largest][0]) largest = right;

      // If largest is not root
      if (largest !== i) {
          // Change color of the bars being compared to yellow
          arr[i][1] = "yellow";
          arr[largest][1] = "yellow";
          setArr([...arr]); // Update the state array after changing the color of the bars being compared

          let temp = arr[i];
          arr[i] = arr[largest];
          arr[largest] = temp;
          await delay(10); // Pause execution with a shorter delay

          // Reset color of bars back to red when not being compared
          arr[i][1] = "red";
          arr[largest][1] = "red";
          setArr([...arr]); // Update the state array after changing the color back to red

          // Recursively heapify the affected sub-tree
          await heapify(arr, n, largest);
      }
  };

  const sort = async (arr) => {
      let n = arr.length;

      // Build heap (rearrange array)
      for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
          await heapify(arr, n, i);
          if (!sortingInProgressRef.current) return; // Check if sorting needs to be interrupted
      }

      // One by one extract an element from heap
      for (let i = n - 1; i > 0; i--) {
          // Move current root to end
          let temp = arr[0];
          arr[0] = arr[i];
          arr[i] = temp;
          setArr([...arr]); // Update the state array after each swap
          await delay(10); // Pause execution with a shorter delay

          // call max heapify on the reduced heap
          await heapify(arr, i, 0);
          if (!sortingInProgressRef.current) return; // Check if sorting needs to be interrupted
      }
  };

  await sort(newArr);

  sortingInProgressRef.current = false; // Set sorting in progress to false when sorting is done
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms)); // Delay function to introduce a pause
