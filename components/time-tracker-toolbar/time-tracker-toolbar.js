class TimeTrackerToolbar extends crs.classes.BindableElement {
    #intervalId;
    #timeIndicator;
    get html() {
        return import.meta.url.replace(".js", ".html");
    }

    get shadowDom() {
        return true;
    }

    get hasStyle() {
        return true;
    }

    async connectedCallback() {
        await super.connectedCallback();
        console.log("Time Tracker Toolbar Connected")
        this.#timeIndicator = this.shadowRoot.querySelector("#time-indicator");
    }


    async disconnectedCallback() {
        console.log("Time Tracker Toolbar Disconnected")
        this.#intervalId = null;
        this.#timeIndicator = null;
    }

    async startTimeTracker() {
        console.log("Starting Time Tracker")
        this.dataset.isRunning = "true";
        await crs.binding.events.emitter.emit("change-tracker-state", { element: this , isActive: true});
        this.classList.add("running");

        const startTime = Date.now();
        clearInterval(this.#intervalId);

        this.#intervalId = setInterval(async () => {
            const currentTime = Date.now();
            const elapsedTime = currentTime - startTime;
            this.#timeIndicator.innerText = await this.#formatTime(elapsedTime);
        }, 1000);
    }

    async stopTimeTracker() {
        console.log("Stopping Time Tracker")
        this.dataset.isRunning = "false";
        await crs.binding.events.emitter.emit("change-tracker-state", { element: this , isActive: false});
        this.classList.remove("running");
        clearInterval(this.#intervalId);
    }

    async #formatTime(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');

        return `${hours}:${minutes}:${seconds}`;
    }
}

customElements.define("time-tracker-toolbar", TimeTrackerToolbar);