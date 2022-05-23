// Reference the elements that will be used
const elements = {
    sorting: {
        container: document.getElementById("sorting")
    },
    menu: {
        shuffle: document.getElementById("shuffle"),
        sortingPlayback: document.getElementById("sortingPlayback"),
        numOfElements: document.getElementById("numOfElements"),
        playbackSpeed: document.getElementById("playbackSpeed"),
        sortingAlgorithm: document.getElementById("sortingAlgorithm")
    }
}

elements.sorting.template = document.createElement("div");

const barColours = {
    unsorted: "rgb(255,255,255)",
    current: "rgb(255,0,0)",
    sorted: "rgb(0,204,0)"
}


const timer = ms => new Promise(res => setTimeout(res, ms))


let sorter = new Sort();


sorter.addValues(10);
sorter.shuffle();
// setTimeout(() => {
//     console.log(sorter.array);
//     sorter.BubbleSort().then(res => console.log(res));
// }, 2000);


// Event handlers
elements.menu.shuffle.addEventListener("click", function() {
    sorter.shuffle();
});

elements.menu.sortingPlayback.addEventListener("click", function() {
    // 


    const selectedAlgorithm = elements.menu.sortingAlgorithm.value;
    
    switch (selectedAlgorithm) {
        case "BubbleSort":
            sorter.BubbleSort();
            break;
        case "SelectionSort":
            sorter.SelectionSort();
            break;
        case "InsertionSort":
            sorter.InsertionSort();
            break;
        default:
            break;
    }
});

elements.menu.playbackSpeed.childNodes.forEach(function(button) {
    button.addEventListener("click", function() {
        let speed = parseFloat(button.innerText.substring(1));
        sorter.setSpeed(speed);
    });
});

elements.menu.numOfElements.addEventListener("input", function() {
    sorter.clear();
    sorter.addValues(elements.menu.numOfElements.value);
});














// const updateVisualisation = function() {
//     bars.forEach(function(bar, i) {
//         const height = (bar.value / bars.length) * 100;
//         bar.element.style.height = `${height}%`;
//     });
// }

// const addValue = function(number) {
//     let newElement = elements.sorting.template.cloneNode();

//     bars.push({"value": number, "element": newElement});

//     elements.sorting.container.appendChild(newElement);
// }

// const addValues = function(numOfValues) {
//     for (i = 0; i < numOfValues; i++) {
//         addValue(i + 1);
//     }
//     updateVisualisation();
// }

// const clearValues = function() {
//     bars = [];

//     elements.sorting.container.innerHTML = "";
//     updateVisualisation();
// }

// const shuffle = function() {
//     let currentIndex = bars.length, randomIndex;

//     while (currentIndex != 0) {
//         randomIndex = Math.floor(Math.random() * currentIndex);
//         currentIndex--;

//         swap(currentIndex, randomIndex);
//     }
// }

// const swap = function(index0, index1) {
//     elements.sorting.container.insertBefore(bars[index1].element, bars[index0].element);

//     let temp = bars[index0];
//     bars[index0] = bars[index1];
//     bars[index1] = temp;
// }