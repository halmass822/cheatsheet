//crude function to randomize array contents, for D&D encounters

function randomizeArray(array) {
	const arrayLength = array.length;
	const output = [];
  for(i = 0; i < arrayLength; i++) {
  	const randomIndex = Math.floor(Math.random() * array.length)
  	output.push(array[randomIndex]);
    array.splice(randomIndex, 1);
  }
  return output;
}
