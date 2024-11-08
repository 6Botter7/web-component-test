import TaskFactory from "./task-factory/task-factory.js";
import TaskDatabase from "./task-database/task-database.js";

class TimeTrackerTaskContainer extends crs.classes.BindableElement {
    #clickHandler = this.#click.bind(this);
    #containerHeader;
    #toggleCollapseHandler = this.#toggleCollapse.bind(this);
    #addTaskHandler = this.addTask.bind(this);
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
        console.log("TimeTrackerTaskContainer Connected")
        this.#containerHeader = this.shadowRoot.querySelector("#container-header");
        this.#containerHeader.addEventListener("click", this.#toggleCollapseHandler);
        await crs.binding.events.emitter.on("save-task", this.#addTaskHandler);
    }


    async disconnectedCallback() {
        console.log("TimeTrackerTaskContainer Disconnected")
        this.#containerHeader.removeEventListener("click", this.#clickHandler);
        this.#containerHeader = null;

    }

    async #click(event) {
        console.log("COMPLETEDT TASKS")
    }

    async #toggleCollapse(event) {
        console.log("Toggling Collapse")
        this.#containerHeader.classList.toggle("collapsed");
        this.dataset.collapsed = String(this.#containerHeader.classList.contains("collapsed"));
    }

    async addTask(event) {
        const template = this.shadowRoot.querySelector("#task-factory");
        const taskContainer = await TaskFactory.createTask(template, event);

        this.shadowRoot.querySelector("#completed-task-container").appendChild(taskContainer);
        // await crs.binding.events.emitter.emit("add-task-to-database", { element: this, task: event.task });
        await TaskDatabase.addTask(event);
    }

    async removeTask(event) {}

    async editTask(event) {}

    async clearAllTasks() {
        const tasks = this.shadowRoot.querySelectorAll(".task-container")
        for(const task of tasks) {
            task.remove();
        }

        await TaskDatabase.clearAllTasks();
    }
}

customElements.define("time-tracker-task-container", TimeTrackerTaskContainer);


// console.log("Adding Task", event)
//ToDo: Defs need a factory for template generation but maybe i can make the task a component as well?
// const taskContainer = document.createElement("div");
// const taskDescription = document.createElement("span");
// taskDescription.textContent = event.task;
// const taskTime = document.createElement("span");
// taskTime.textContent = event.time;
//
// taskContainer.appendChild(taskDescription);
// taskContainer.appendChild(taskTime);