class TimeTrackerTaskContainer extends crs.classes.BindableElement {
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
    }


    async disconnectedCallback() {
        console.log("TimeTrackerTaskContainer Disconnected")
    }
}

customElements.define("time-tracker-task-container", TimeTrackerTaskContainer);