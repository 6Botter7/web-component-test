// import Dexie from "https://cdn.jsdelivr.net/npm/dexie@3.2.2/dist/dexie.mjs";

import "./../../../dexie.js";


class TaskDatabase {
    static db = new Dexie("TaskDatabase");

    static {
        this.db.version(1).stores({
            tasks: "++id, name, time"
        });
    }


    static async addTask(task) {
        console.log("Adding Task", this.db);
        console.log("Task", task);
        await this.db.tasks.add(task);

        // log db tasks
        const tasks = await this.db.tasks.toArray();
        console.log("Tasks", tasks);
        console.log(this.db);
    }

    static async getTasks() {
        return await this.db.tasks.toArray();
    }


    static async deleteTask(id) {
        await this.db.tasks.delete(id);
    }

    static async updateTask(id, task) {
        await this.db.tasks.update(id, task);
    }

    static async clearAllTasks() {
        await this.db.tasks.clear();
        // reset ids

        console.log("Tasks Cleared");
    }
}

export default TaskDatabase;