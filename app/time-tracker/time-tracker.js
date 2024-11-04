import "../../components/time-tracker/time-tracker.js";

export default class TimeTrackerView extends crs.classes.BindableElement {
    get html() {
        return import.meta.url.replace(".js", ".html");
    }

    get shadowDom() {
        return true;
    }

    get hasStyle() {
        return true;
    }
}