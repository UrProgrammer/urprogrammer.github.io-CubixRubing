function generate3x3_scramble(length = 20) {
    const moves = ["U", "D", "L", "R", "F", "B"];
    const modifiers = ["", "'", "2"];
    let scramble = [];
    let lastMove = "";
    let lastAxis = "";

    const axes = { U: 'y', D: 'y', L: 'x', R: 'x', F: 'z', B: 'z' };
    for (let i = 0; i < length; i++) {
        let move, axis;
        do {
            move = moves[Math.floor(Math.random() * moves.length)];
            axis = axes[move];
        } while (move === lastMove || axis === lastAxis);

        lastMove = move;
        lastAxis = axis;
        let mod = modifiers[Math.floor(Math.random() * modifiers.length)];
        scramble.push(move + mod);
    }
    const scrambleElem = document.getElementById("scramble");
    if (scrambleElem) {
        scrambleElem.textContent = scramble.join(' ');
    }

    return scramble.join(" ");
}
function generate4x4_scramble(length = 40) {
    const moves = ["U", "D", "L", "R", "F", "B"];
    const modifiers = ["", "'", "2", "w"];
    let scramble = [];
    let lastMove = "";
    let lastAxis = "";

    const axes = { U: 'y', D: 'y', L: 'x', R: 'x', F: 'z', B: 'z' };
    for (let i = 0; i < length; i++) {
        let move, axis;
        do {
            move = moves[Math.floor(Math.random() * moves.length)];
            axis = axes[move];
        } while (move === lastMove || axis === lastAxis);

        lastMove = move;
        lastAxis = axis;
        let mod = modifiers[Math.floor(Math.random() * modifiers.length)];
        scramble.push(move + mod);
    }
    const scrambleElem = document.getElementById("scramble");
    if (scrambleElem) {
        scrambleElem.textContent = scramble.join(' ');
    }

    return scramble.join(" ");
}
function generate6x6_scramble(length = 60) {
    const moves = ["U", "D", "L", "R", "F", "B"];
    const modifiers = ["", "'", "2"];
    const prefixes = ["", "2", "3"];
    const axes = { U: 'y', D: 'y', L: 'x', R: 'x', F: 'z', B: 'z' };

    let scramble = [];
    let lastMove = "";
    let lastAxis = "";

    for (let i = 0; i < length; i++) {
        let move, axis, prefix, notation;
        do {
            move = moves[Math.floor(Math.random() * moves.length)];
            axis = axes[move];
            prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        } while (move === lastMove || axis === lastAxis);

        lastMove = move;
        lastAxis = axis;

        let mod = modifiers[Math.floor(Math.random() * modifiers.length)];
        if (prefix === "") {
            notation = move + mod;
        } else {
            notation = prefix + move + "w" + mod;
        }
        scramble.push(notation);
    }
    const scrambleElem = document.getElementById("scramble");
    if (scrambleElem) {
        scrambleElem.textContent = scramble.join(' ');
    }
    return scramble.join(" ");
}
function generateminx_scramble() {
    
}

const scrambleFunctions = {
    "222": () => generate3x3_scramble(10),
    "333": generate3x3_scramble,
    "444": generate4x4_scramble,
    "555": () => generate6x6_scramble(60), // For demo, use 6x6 function (ideally, write a proper 5x5)
    "666": generate6x6_scramble,
    "777": () => generate6x6_scramble(80)  // Typically more moves for 7x7
};


function updateScramble() {
    const puzzle = document.getElementById("puzzle").value;
    const scrambleFn = scrambleFunctions[puzzle] || generate3x3_scramble;
    const scrambleString = scrambleFn();

    const scrambleDisplayElement = document.getElementById("ScrambleDisplay");
    const scrambleDisplayElement2D = document.getElementById("ScrambleDisplay2D");

        if (scrambleDisplayElement) {
            scrambleDisplayElement.setAttribute("event", puzzle);
            scrambleDisplayElement.setAttribute("scramble", scrambleString);
        }
        if (scrambleDisplayElement2D) {
            scrambleDisplayElement2D.setAttribute("event", puzzle);
            scrambleDisplayElement2D.setAttribute("scramble", scrambleString);
        }
    }

// Initial setup and listeners:
window.onload = function () {
    // Set initial scramble
    updateScramble();

    // Listen for dropdown change
    const puzzleSelect = document.getElementById("puzzle");
    if (puzzleSelect) {
        puzzleSelect.addEventListener('change', updateScramble);
    }
};

function regenerate_scramble(){
   updateScramble();

    // Listen for dropdown change
    const puzzleSelect = document.getElementById("puzzle");
    if (puzzleSelect) {
        puzzleSelect.addEventListener('change', updateScramble);
    }
}
