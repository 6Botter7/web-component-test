import "./../time-tracker-task-container/time-tracker-task-container.js";
import "./../time-tracker-toolbar/time-tracker-toolbar.js";

class TimeTracker extends crs.classes.BindableElement {
    #activeStateHandler = this.activeState.bind(this);

    get html() {
        return import.meta.url.replace(".js", ".html");
    }

    get shadowDom() {
        return true;
    }

    get hasStyle() {
        return true;
    }

    #clickHandler = this.click.bind(this);

    async connectedCallback() {
        await super.connectedCallback();
        this.dataset.isRunning = "false";
        await this.#setCurrentTime();
        setInterval(() => this.#setCurrentTime(), 60000);
        this.addEventListener("click", this.#clickHandler);
        await crs.binding.events.emitter.on("change-tracker-state", this.#activeStateHandler);
    }


    async disconnectedCallback() {
        this.removeEventListener("click", this.#clickHandler);
    }

    async click(event) {
        const target = event.composedPath()[0];
        console.log(target.id)
    }

    async activeState(event) {
        if (event.isActive) {
            await this.startTimeTracker();
        } else {
            await this.stopTimeTracker();
        }
    }

    async startTimeTracker() {
        console.log("Starting Time Tracker")
        this.dataset.isRunning = "true";
        this.classList.add("running");
    }

    async stopTimeTracker() {
        console.log("Stopping Time Tracker")
        this.dataset.isRunning = "false";
        this.classList.remove("running");
    }


    async #setCurrentTime() {
        console.log("Setting Current Time")
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        this.shadowRoot.querySelector("#time-now").innerText = `${hours} H ${minutes}`;
    }
}

customElements.define("time-tracker", TimeTracker);
