export default class TaskFactory {

    static async createTask(template, data) {
        const newTaskElement = await createTaskElement(template, data);
        console.log(newTaskElement);
        return newTaskElement;
    }
}


async function createTaskElement(template, data) {
    const taskClone = template.content.cloneNode(true);
    taskClone.querySelector(".task-container").id = data.task;
    taskClone.querySelector(".task-name").textContent = data.task;
    taskClone.querySelector(".task-duration").textContent = data.time;

    return taskClone;
}