export default function InsertionSort(arr, setArr, sortingInProgressRef) {
  sortingInProgressRef.current = true; // Set sorting in progress to true
  let newArr = [...arr]; // Create a copy of the state array
  let i = 1; // Start from the second element

  const sortStep = async () => {
    if (!sortingInProgressRef.current) return; // Check if sorting is still in progress

    if (i < newArr.length) {
      let key = newArr[i]; // Current element to be inserted
      let j = i - 1; // Index of the previous element

      // Change color of the current element to yellow
      newArr[i][1] = "yellow";
      setArr([...newArr]); // Update the state array after changing the color

      // Move elements of arr[0..i-1], that are greater than key, to one position ahead of their current position
      while (j >= 0 && newArr[j][0] > key[0]) {
        // Change color of the element being compared to yellow
        newArr[j][1] = "yellow";
        setArr([...newArr]); // Update the state array after changing the color

        // Swap the elements
        let temp = newArr[j];
        newArr[j] = newArr[j + 1];
        newArr[j + 1] = temp;

        // Update the state array after each comparison and swap
        setArr([...newArr]);

        j--;
      }

      // Reset color of all elements back to red after insertion
      setTimeout(()=> {
        for (let k = 0; k < newArr.length; k++) {
        newArr[k][1] = "red";
        setArr([...newArr]);
        }
      }, 10);

      // Update the state array after resetting the color of all elements

      // Move to the next element
      i++;

      // Call sortStep recursively after a delay of 10 milliseconds
      setTimeout(sortStep, 10);
    } else {
      // Sorting is complete
      sortingInProgressRef.current = false;
    }
  };

  sortStep();
}
