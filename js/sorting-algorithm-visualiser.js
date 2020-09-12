const total_bars = 400;
let bar_color = "white";
let select_color = "red";

let arr = [];
for (i = 0; i < total_bars; ++i) {
    arr.push(Math.ceil(Math.random() * 600));
}

console.log(arr);

let area = document.getElementById("graph-area");

let bars_arr = Array(total_bars).fill(0);

for (i = 0; i < total_bars; ++i) {
    bars_arr[i] = document.createElement("div");
    bars_arr[i].classList.add("bar");
    bars_arr[i].style.height = arr[i] + "px";
    area.appendChild(bars_arr[i]);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function partition(arr, left, right) {
    let pivot = arr[right];
    while (left < right) {
        while (arr[left] <= pivot && left < right)
            ++left;
        while (arr[right] > pivot && right > left)
            --right;
        [arr[left], arr[right]] = [arr[right], arr[left]];

        bars_arr[left].style.backgroundColor = select_color;
        bars_arr[right].style.backgroundColor = select_color;
        await sleep(10);
        bars_arr[left].style.height = arr[left] + "px";
        bars_arr[right].style.height = arr[right] + "px";
        bars_arr[left].style.backgroundColor = bar_color;
        bars_arr[right].style.backgroundColor = bar_color;
    }
    return left;
}

async function quick_sort(arr, left, right) {
    if (left >= right)
        return;

    pivot = await partition(arr, left, right);

    await quick_sort(arr, left, pivot - 1);
    await quick_sort(arr, pivot, right)
}

async function bubble_sort(arr) {
    for (i = 0; i < arr.length; ++i) {
        let sorted = true;
        for (j = 0; j < arr.length - i -1; ++j) {
            if (arr[j] > arr[j + 1]) {
                sorted = false;
                let store = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = store;
            }
            bars_arr[j].style.backgroundColor = select_color;
            bars_arr[j + 1].style.backgroundColor = select_color;
            bars_arr[j].style.height = arr[j] + "px";
            bars_arr[j + 1].style.height = arr[j + 1] + "px";
            await sleep(10);
            bars_arr[j].style.backgroundColor = bar_color;
            bars_arr[j + 1].style.backgroundColor = bar_color;
        }
        if (sorted) {
            break;
        }
    }
}

// bubble_sort(arr);
quick_sort(arr, 0, arr.length - 1)

console.log(arr)