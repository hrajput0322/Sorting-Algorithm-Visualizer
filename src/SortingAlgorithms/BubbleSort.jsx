export default function BubbleSort(arr, setArr, sortingInProgressRef) {
  sortingInProgressRef.current = true; // Set sorting in progress to true
  let newArr = [...arr]; // Create a copy of the state array
  let i = 0;
  let j = 0;

  const sortStep = () => {
    if (!sortingInProgressRef.current) return; // Check if sorting is still in progress

    if (i < newArr.length) {
      if (j < newArr.length - i - 1) {
        // Change color to yellow for the elements being compared
        newArr[j][1] = "#FFFF00"; // Yellow
        newArr[j + 1][1] = "#FFFF00"; // Yellow
        setArr([...newArr]); // Update the state array to show the change in color

        if (newArr[j][0] > newArr[j + 1][0]) {
          var temp = newArr[j];
          newArr[j] = newArr[j + 1];
          newArr[j + 1] = temp;
          setArr([...newArr]); // Update the state array after each swap
        }

        // Change color back to red after comparison
        setTimeout(() => {
          newArr[j][1] = "#FF0000"; // Red
          newArr[j + 1][1] = "#FF0000"; // Red
          setArr([...newArr]); // Update the state array to show the change in color
          j++;
          sortStep();
        }, 10); // Delay for 500 milliseconds to show the change in color
      } else {
        i++;
        j = 0;
        setTimeout(sortStep, 10); // Call sortStep recursively after a delay of 10 milliseconds
      }
    }
  };

  sortStep();
}
