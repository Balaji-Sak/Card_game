






document.addEventListener("DOMContentLoaded", () => {
  const speech = document.getElementById("message");
  function say(text) {
    speech.innerText = text;
  }
  const cardImages = [
  "card image/10-c.jpg",
  "card image/10-d.jpg",
  "card image/2-d.jpg",
  "card image/2-s.jpg",
  "card image/3-c.jpg",
  "card image/5-c.jpg",
  "card image/5-h.jpg",
  "card image/6-h.jpg",
  "card image/8-s.jpg",
  "card image/a-c.jpg",
  "card image/9-c.jpg",
  "card image/9-d.jpg",
  "card image/a-h.jpg",
  "card image/q-h.jpg",
  "card image/a-s.jpg",
  "card image/j-d.jpg",
  "card image/j-s.jpg",
  "card image/joker.jpg",
  "card image/k-h.jpg",
  "card image/k-s.jpg",
  "card image/q-d.jpg"
];
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  shuffleArray(cardImages);

  let arr = [...cardImages];

  
  // Grab columns
  const columns = document.querySelectorAll(".container > div");

  // Build initial array of card image sources from your HTML
  
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
  shuffleArray(arr);
  let mat = cardArrangement(arr);

  renderMatrix(mat);
  say(
    "Hello challenger! 🃏\n" +
    "Pick any card in your mind\n" +
    "Click the column where your card appears.\n" +
    "Do this 3 times!"
  );
  columns.forEach((col, index) => {
    col.addEventListener("click", () => {
      if (rounds < 3) {
        arr = cardStack(arr, mat, index + 1);
        mat = cardArrangement(arr);
        renderMatrix(mat);
        rounds++;

        if (rounds === 1) {
          say("Good choice! Focus on your card... 👀");
        }
        else if (rounds === 2) {
          say("Nice! One more time. I’m getting closer 😏");
        }
        else if (rounds === 3) {
          say("Aha! I know your card now... ✨");
        }

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
