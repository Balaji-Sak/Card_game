
document.addEventListener("DOMContentLoaded", () => {
  // Grab columns
  const columns = document.querySelectorAll(".container > div");

  // Build initial array of card image sources from your HTML
  let arr = [];
  columns.forEach(col => {
    const imgs = col.querySelectorAll("img");
    imgs.forEach(img => arr.push(img.getAttribute("src")));
  });

  // Split into 7x3 matrix
  function cardArrangement(arr) {
    let mat = [];
    let count = 0;
    for (let row = 0; row < 7; row++) {
      mat[row] = [];
      for (let col = 0; col < 3; col++) {
        mat[row][col] = arr[count++];
      }
    }
    return mat;
  }

  // Collect cards column-wise so chosen column is in the middle
  function cardStack(arr, mat, n) {
    let collectionOrder = [];
    if (n === 1) collectionOrder = [2, 0, 1];
    if (n === 2) collectionOrder = [0, 1, 2];
    if (n === 3) collectionOrder = [1, 2, 0];

    let newArr = [];
    let i = 0;
    for (let colIndex = 0; colIndex < 3; colIndex++) {
      let col = collectionOrder[colIndex];
      for (let row = 0; row < 7; row++) {
        newArr[i++] = mat[row][col];
      }
    }
    return newArr;
  }

  // Render the matrix back into the DOM
  function renderMatrix(mat) {
    columns.forEach((col, cIndex) => {
      col.innerHTML = ""; // clear column
      for (let row = 0; row < 7; row++) {
        let cardDiv = document.createElement("div");
        cardDiv.style.setProperty("--i", row);
        let img = document.createElement("img");
        img.src = mat[row][cIndex];
        cardDiv.appendChild(img);
        col.appendChild(cardDiv);
      }
    });
  }

  // Play rounds
  let rounds = 0;
  let mat = cardArrangement(arr);

  renderMatrix(mat);

  columns.forEach((col, index) => {
    col.addEventListener("click", () => {
      if (rounds < 3) {
        arr = cardStack(arr, mat, index + 1);
        mat = cardArrangement(arr);
        renderMatrix(mat);
        rounds++;

        if (rounds === 3) {
  setTimeout(() => {
    let chosenCardSrc = arr[10];

    // Find the chosen card in DOM
    const allImgs = document.querySelectorAll(".container img");
    allImgs.forEach(img => {
      if (img.getAttribute("src") === chosenCardSrc) {
        img.parentElement.classList.add("result-card"); // add animation class
      }
    });

    // Optional: also show alert
    // alert("Your chosen card is: " + chosenCardSrc);
  }, 300);
}

      }
    });
  });
});
