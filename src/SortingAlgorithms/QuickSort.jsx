export default async function QuickSort(arr, setArr, sortingInProgressRef) {
  sortingInProgressRef.current = true; // Set sorting in progress to true
  let newArr = [...arr]; // Create a copy of the state array

  const partition = async (arr, low, high) => {
      let pivot = arr[high];
      let i = low - 1;
      for (let j = low; j < high; j++) {
          if (!sortingInProgressRef.current) return -1; // Check if sorting needs to be interrupted
          if (arr[j][0] < pivot[0]) {
              i++;
              // Change color of the bars being compared to yellow
              arr[i][1] = "yellow";
              arr[j][1] = "yellow";
              setArr([...arr]); // Update the state array after changing the color of the bars being compared
              await delay(10); // Pause execution with a shorter delay

              // Swap arr[i] and arr[j]
              let temp = arr[i];
              arr[i] = arr[j];
              arr[j] = temp;

              // Reset color of bars back to red after swapping
              arr[i][1] = "red";
              arr[j][1] = "red";
          }
      }

      // Swap arr[i+1] and arr[high] (or pivot)
      let temp = arr[i + 1];
      arr[i + 1] = arr[high];
      arr[high] = temp;
      setArr([...arr]); // Update the state array after each swap
      await delay(10); // Pause execution with a shorter delay
      return i + 1;
  };

  const sort = async (arr, low, high) => {
      if (low < high) {
          let pi = await partition(arr, low, high);
          if (pi === -1) return; // If sorting was interrupted, exit early
          await Promise.all([
              sort(arr, low, pi - 1),
              sort(arr, pi + 1, high)
          ]);
      }
  };

  await sort(newArr, 0, newArr.length - 1);

  // Reset color of all bars back to red after sorting completes
  newArr.forEach(bar => bar[1] = "red");
  setArr([...newArr]); // Update the state array

  sortingInProgressRef.current = false; // Set sorting in progress to false when sorting is done
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms)); // Delay function to introduce a pause
