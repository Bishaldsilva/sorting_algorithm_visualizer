const n = 20;
const array = [];
const moves = [];


function init() {
    for (var i = 0; i < n; i++) {
        array[i] = Math.random()
    }
    showBars()
}
init();


function b_sort() {
    var copy = [...array];
    bubbleSort(copy); ``
    animate(moves);
}

function q_sort() {
    var copy = [...array];
    quickSort(copy, 0, n - 1);
    animate(moves);
}

function i_sort() {
    var copy = [...array];
    insertionSort(copy);
    animate(moves);
}

function s_sort() {
    var copy = [...array];
    selectionSort(copy);
    animate(moves);
}


function animate(moves) {
    if (moves.length == 0) {
        showBars();
        return;
    }
    var move = moves.shift();
    var [i, j] = move.indices;
    if (move.type == "swap") {
        [array[i], array[j]] = [array[j], array[i]];
    }
    showBars(move);
    setTimeout(function () {
        animate(moves);
    }, 150);
}


function bubbleSort(array) {
    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < (array.length - i - 1); j++) {
            moves.push({ indices: [j, j + 1], type: "comp" });
            if (array[j] > array[j + 1]) {
                moves.push({ indices: [j, j + 1], type: "swap" });
                var temp = array[j]
                array[j] = array[j + 1]
                array[j + 1] = temp
            }
        }
    }
}

function quickSort(array, start, end) {
    if (start < end) {
        var ind = partition(array, start, end);
        quickSort(array, start, ind - 1);
        quickSort(array, ind + 1, end);
    }
}

function partition(array, start, end) {
    var ind = start;
    var pivot = array[end];

    for (let i = start; i < end; i++) {
        moves.push({ indices: [i, end], type: "comp" });
        if (array[i] < pivot) {
            moves.push({ indices: [ind, i], type: "swap" });
            [array[ind], array[i]] = [array[i], array[ind]];
            ind++;
        }
    }
    moves.push({ indices: [ind, end], type: "swap" });
    [array[ind], array[end]] = [array[end], array[ind]];
    return ind;
}

function insertionSort(array) {
    for (let i = 1; i < array.length; i++) {
        var hole = i;
        while (hole > 0 && array[hole - 1] > array[hole]) {
            moves.push({ indices: [hole - 1, hole], type: "comp" });
            moves.push({ indices: [hole - 1, hole], type: "swap" });
            [array[hole - 1], array[hole]] = [array[hole], array[hole - 1]];
            hole--;
        }
    }
}

function selectionSort(array) {
    for (let i = 0; i < array.length - 1; i++) {
        var min_ind = i;
        for (let j = i + 1; j < array.length; j++) {
            moves.push({ indices: [min_ind, j], type: "comp" });
            if (array[j] < array[min_ind]) {
                min_ind = j;
            }
        }
        moves.push({ indices: [i, min_ind], type: "swap" });
        [array[i], array[min_ind]] = [array[min_ind], array[i]];
    }
}


function showBars(move) {
    if (container.innerHTML) {
        container.innerHTML = "";
    }
    for (var i = 0; i < n; i++) {
        var bar = document.createElement("div");
        bar.style.height = array[i] * 100 + "%";
        bar.classList.add("bar");
        if (move && move.indices.includes(i)) {
            bar.style.backgroundColor = move.type == "swap" ? "red" : "green";
        }
        container.appendChild(bar)
    }
}