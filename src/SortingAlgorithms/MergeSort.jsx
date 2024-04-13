export default async function mergeSort(arr, setArr, sortingInProgressRef) {
  sortingInProgressRef.current = true; // Set sorting in progress to true
  let newArr = [...arr]; // Create a copy of the state array

  const merge = async (arr, l, m, r) => {
    let n1 = m - l + 1;
    let n2 = r - m;
    let L = new Array(n1);
    let R = new Array(n2);

    // Copy data to temporary arrays L[] and R[]
    for (let i = 0; i < n1; i++) L[i] = arr[l + i];
    for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

    // Merge the temporary arrays back into arr[l..r]
    let i = 0; // Initial index of first subarray
    let j = 0; // Initial index of second subarray
    let k = l; // Initial index of merged subarray
    while (i < n1 && j < n2) {
      if (!sortingInProgressRef.current) return; // Check if sorting needs to be interrupted

      // Change color of elements being compared to yellow
      newArr[l + i][1] = "yellow";
      newArr[m + 1 + j][1] = "yellow";
      setArr([...newArr]); // Update the state array with yellow elements

      if (L[i][0] <= R[j][0]) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
      }
      k++;

      // Reset color of elements not being compared back to red
      for (let p = l; p <= r; p++) {
        if (p !== l + i && p !== m + 1 + j) {
          newArr[p][1] = "red";
        }
      }
      setArr([...newArr]); // Update the state array with red elements

      await delay(); // Pause execution
    }

    // Copy the remaining elements of L[], if any
    while (i < n1) {
      arr[k] = L[i];
      setArr([...arr]); // Update the state array after each comparison
      i++;
      k++;
      await delay(); // Pause execution
    }

    // Copy the remaining elements of R[], if any
    while (j < n2) {
      arr[k] = R[j];
      setArr([...arr]); // Update the state array after each comparison
      j++;
      k++;
      await delay(); // Pause execution
    }

    // Reset color of elements back to red
    for (let p = l; p <= r; p++) {
      newArr[p][1] = "red";
    }
    setArr([...newArr]); // Update the state array with red elements
  };

  const sort = async (arr, l, r) => {
    if (!sortingInProgressRef.current) return; // Check if sorting needs to be interrupted
    if (l >= r) return; // Base case: single element array
    let m = Math.floor((l + r) / 2);
    await sort(arr, l, m); // Sort first half
    await sort(arr, m + 1, r); // Sort second half
    await merge(arr, l, m, r); // Merge the sorted halves
  };

  await sort(newArr, 0, newArr.length - 1);

  sortingInProgressRef.current = false; // Set sorting in progress to false when sorting is done
}

const delay = () => new Promise(resolve => setTimeout(resolve, 10)); // Delay function to introduce a pause
