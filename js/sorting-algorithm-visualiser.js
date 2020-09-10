const total_bars = 60;

var arr = [];
for (i = 0; i < total_bars; ++i) {
    arr.push(Math.ceil(Math.random() * 736));
}

console.log(arr);

let area = document.getElementById("graph-area");

let bars_arr = Array(total_bars).fill(0);

for (i = 0; i < total_bars; ++i) {
    bars_arr[i] = document.createElement("div");
    bars_arr[i].classList.add("bar");
    bars_arr[i].style.width = arr[i] + "px";
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

        bars_arr[left].style.backgroundColor = "purple";
        bars_arr[right].style.backgroundColor = "purple";
        await sleep(200);
        bars_arr[left].style.width = arr[left] + "px";
        bars_arr[right].style.width = arr[right] + "px";
        bars_arr[left].style.backgroundColor = "green";
        bars_arr[right].style.backgroundColor = "green";
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
            bars_arr[j].style.backgroundColor = "purple";
            bars_arr[j + 1].style.backgroundColor = "purple";
            bars_arr[j].style.width = arr[j] + "px";
            bars_arr[j + 1].style.width = arr[j + 1] + "px";
            await sleep(10);
            bars_arr[j].style.backgroundColor = "green";
            bars_arr[j + 1].style.backgroundColor = "green";
        }
        if (sorted) {
            break;
        }
    }
}

// bubble_sort(arr);
quick_sort(arr, 0, arr.length - 1)

console.log(arr)