class Sort {
    constructor() {
        this.array = [];
        this.setSpeed(1);

        // If sorting & playing, then it's playing
        // If sorting & !playing, then it's paused
        // If !sorting & !playing, then it's stopped
        this.states = {
            sorting: false,
            playing: false
        }
    }
    
    get isSorting() {
        return this.states.sorting;
    }
    get isPlaying() {
        return this.states.playing;
    }
    get isPaused() {
        if (this.sorting && !this.isPlaying) {
            return true;
        }
        return false
    }

    updateVisualisation() {
        for (let i = 0; i < this.array.length; i++) {
            let object = this.array[i];
            const height = (object.value / this.array.length) * 100;
            object.element.style.height = `${height}%`;
            object.element.style.order = i;
        }
    }

    add(value) {
        let newElement = elements.sorting.template.cloneNode();
        this.array.push({"value": value, "element": newElement});
        elements.sorting.container.appendChild(newElement);
    }

    addValues(numberOfValues) {
        for (let i = 0; i < numberOfValues; i++) {
            this.add(i + 1);
        }
        this.updateVisualisation();
    }

    clear() {
        this.array = [];

        elements.sorting.container.innerHTML = "";
        this.updateVisualisation();
    }

    swap(i, j) {
        const temp = this.array[i];
        this.array[i] = this.array[j];
        this.array[j] = temp;

        this.updateVisualisation();
    }

    shuffle() {
        let currentIndex = this.array.length, randomIndex;

        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            this.swap(currentIndex, randomIndex);
        }
    }

    setSpeed(speed) {
        const interval = (1 / speed) * 250;
        this.sortingInterval = interval;
    }


    // Sorting Algorithms
    async BubbleSort() {
        let swapped = true;
        
        while (swapped) {
            swapped = false;

            for (let i = 0; i < this.array.length - 1; i++) {
                if (this.array[i].value > this.array[i+1].value) {
                    await timer(this.sortingInterval);
                    this.swap(i, i+1);

                    swapped = true;
                }
            }
        }

        return this.array;
    }

    async SelectionSort() {
        let minIndex = 0;

        for (let i = 0; i < this.array.length - 1; i++) {
            minIndex = i;

            for (let j = i; j < this.array.length; j++) {
                if (this.array[j].value < this.array[minIndex].value) {
                    minIndex = j;
                }
            }

            if (minIndex != i) {
                await timer(this.sortingInterval);
                this.swap(minIndex, i);
            }
        }

        return this.array;
    }

    async InsertionSort() {
        let key, j;
        for (let i = 1; i < this.array.length; i++) {
            key = this.array[i];
            j = i-1

            while (j >= 0 && this.array[j].value > key.value) {
                await timer(this.sortingInterval);
                this.array[j+1] = this.array[j];
                j--;
                this.updateVisualisation();
            }

            await timer(this.sortingInterval);
            this.array[j+1] = key;
            this.updateVisualisation();
        }
        
        return this.array;
    }
}