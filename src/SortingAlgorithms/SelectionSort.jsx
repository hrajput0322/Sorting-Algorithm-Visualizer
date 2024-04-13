export default function SelectionSort(arr, setArr, sortingInProgressRef) {
    sortingInProgressRef.current = true; // Set sorting in progress to true
    let newArr = [...arr]; // Create a copy of the state array
    let i = 0;
  
    const sortStep = () => {
      if (!sortingInProgressRef.current) return; // Check if sorting is still in progress
  
      if (i < newArr.length - 1) {
        let minIndex = i; // Initialize minIndex to the current iteration
  
        // Change color of the current element to yellow
        newArr[i][1] = "yellow";
  
        // Find the index of the minimum element in the unsorted part of the array
        for (let j = i + 1; j < newArr.length; j++) {
          // Change color of the element being compared to yellow
          newArr[j][1] = "yellow";
  
          // Reset color of previously compared elements back to red
          newArr[minIndex][1] = "red";
  
          // Update minIndex if the current element is smaller
          if (newArr[j][0] < newArr[minIndex][0]) {
            minIndex = j;
          }
  
          // Update the state array after each comparison
          setArr([...newArr]);
        }
  
        // Swap the found minimum element with the first element
        let temp = newArr[i];
        newArr[i] = newArr[minIndex];
        newArr[minIndex] = temp;
  
        // Reset color of all elements back to red after swapping
        newArr[minIndex][1] = "red";
        newArr[i][1] = "red";
  
        // Update the state array after each swap
        setArr([...newArr]);
  
        // Move to the next iteration
        i++;
  
        // Call sortStep recursively after a delay of 10 milliseconds
        setTimeout(sortStep, 10);
      } else {
        // Sorting is complete
        sortingInProgressRef.current = false;
  
        // Reset color of the last element to red
        newArr[i][1] = "red";
        setArr([...newArr]); // Update the state array
      }
    };
  
    sortStep();
  }
  