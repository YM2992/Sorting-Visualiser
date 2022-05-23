// Reference the elements that will be used
const elements = {
    sorting: {
        container: document.getElementById("sorting")
    },
    menu: {
        shuffle: document.getElementById("shuffle"),
        sortingPlayback: document.getElementById("sortingPlayback"),
        numOfElements: document.getElementById("numOfElements")
    }
}

elements.sorting.template = elements.sorting.container.appendChild(document.createElement("div"))


let bars = [];
let values = [];

const updateVisualisation = function() {
    bars.forEach(function(bar, i) {
        const height = (Math.min(values) / Math.max(values)) * values[i] * 100;
        bar.style.height = `${height}%`;

        console.log(height)
    });
}

const addValue = function(number) {
    let newElement = elements.sorting.template.cloneNode();

    bars.push(newElement);
    values.push(number);

    // newElement.style.height = '100px';
    // newElement.style.width = '100px';

    elements.sorting.container.appendChild(newElement);

    updateVisualisation();
}

const addValues = function(numOfValues) {
    for (i = 0; i < numOfValues; i++) {
        const randomValue = Math.floor(Math.random() * 100) + 1;
        addValue(randomValue)
    }
}

const shuffle = function() {

}


addValues(10);