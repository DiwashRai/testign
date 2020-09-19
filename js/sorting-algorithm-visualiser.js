
var totalBars = 300;
var barColor = "white";
var selectedColor = "red";
var maxBarHeight = 600;

var intArr = [];
var divArr = Array(totalBars).fill(0);

setup();

function setup() {
    for (i = 0; i < totalBars; ++i) {
        intArr.push(Math.ceil(Math.random() * maxBarHeight));
    }

    let area = document.getElementById("graph-area");
    for (i = 0; i < totalBars; ++i) {
        divArr[i] = document.createElement("div");
        divArr[i].classList.add("bar");
        divArr[i].style.height = intArr[i] + "px";
        area.appendChild(divArr[i]);
    }

    window.sortButton = document.getElementById("sort-btn");
    window.sortButton.addEventListener("click", sortClick);

    window.resetButton = document.getElementById("reset-btn");
    window.resetButton.addEventListener("click", resetClick);
}

function resetGraph() {
    for (i = 0; i < totalBars; ++i) {
        intArr[i] = Math.ceil(Math.random() * maxBarHeight);
        divArr[i].style.height = intArr[i] + "px";
    }
}

async function sortClick() {
    resetButton.disabled = true;
    sortButton.disabled = true;
    sortButton.style.padding = "4px 0";
    let bubbleToggle = document.getElementById("bubble-toggle");
    let quickToggle = document.getElementById("quick-toggle");
    if (bubbleToggle.checked) {
        await bubbleSort(intArr, divArr);
    }
    else if (quickToggle.checked) {
        await quickSort(intArr, 0, intArr.length - 1);
    }
    sortButton.style.padding = "0";
    resetButton.disabled = false;
    sortButton.disabled = false;
}

async function resetClick() {
    resetGraph();
}

async function quickSort(arr, left, right) {
    if (left >= right)
        return;

    pivot = await partition(arr, left, right);

    await quickSort(arr, left, pivot - 1);
    await quickSort(arr, pivot, right)
}

async function partition(arr, left, right) {
    let pivot = arr[right];
    while (left < right) {
        while (arr[left] <= pivot && left < right)
            ++left;
        while (arr[right] > pivot && right > left)
            --right;
        [arr[left], arr[right]] = [arr[right], arr[left]];

        divArr[left].style.backgroundColor = selectedColor;
        divArr[right].style.backgroundColor = selectedColor;
        await sleep(10);
        divArr[left].style.height = arr[left] + "px";
        divArr[right].style.height = arr[right] + "px";
        divArr[left].style.backgroundColor = barColor;
        divArr[right].style.backgroundColor = barColor;
    }
    return left;
}

async function bubbleSort(arr, divArr) {
    for (i = 0; i < arr.length; ++i) {
        let sorted = true;
        for (j = 0; j < arr.length - i -1; ++j) {
            if (arr[j] > arr[j + 1]) {
                sorted = false;
                let store = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = store;
            }
            divArr[j].style.backgroundColor = selectedColor;
            divArr[j + 1].style.backgroundColor = selectedColor;
            divArr[j].style.height = arr[j] + "px";
            divArr[j + 1].style.height = arr[j + 1] + "px";
            await sleep(10);
            divArr[j].style.backgroundColor = barColor;
            divArr[j + 1].style.backgroundColor = barColor;
        }
        if (sorted) {
            break;
        }
    }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
