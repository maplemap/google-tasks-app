import {CLIENT_ID} from '../config/index.json';
const SCOPES = ['https://www.googleapis.com/auth/tasks', 'https://www.googleapis.com/auth/plus.me'];

export default {
    authorize(params) {
        return new Promise((resolve, reject) => {
            gapi.auth.authorize(
                {
                    'client_id': CLIENT_ID,
                    'scope': SCOPES,
                    'immediate': params.immediate,
                    'cookie_policy': 'single_host_origin'
                },
                authResult => {
                    if(authResult.error) {
                        return reject(authResult.error);
                    }

                    return gapi.client.load('tasks', 'v1', () => gapi.client.load('plus', 'v1', () => resolve() ))
                }
            );
        });
    },

    listTasksList() {
        const request = gapi.client.tasks.tasklists.list();

        return this.makeRequest(request);
    },

    getTaskList(taskListID) {
        const request = gapi.client.tasks.tasklists.get({
            tasklist: taskListID
        });

        return this.makeRequest(request);
    },

    inserTaskList({title}) {
        const request = gapi.client.tasks.tasklists.insert({
            title: title
        });

        return this.makeRequest(request);
    },

    deleteTaskList({ taskListID }) {
        const request = gapi.client.tasks.tasklists.delete({
            tasklist: taskListID
        });

        return this.makeRequest(request);
    },

    listTasks(taskListID) {
        const request = gapi.client.tasks.tasks.list({
            tasklist: taskListID
        });

        return this.makeRequest(request);
    },

    insertTask({taskListID, title}) {
        const request = gapi.client.tasks.tasks.insert({
            tasklist: taskListID,
            title: title
        });

        return this.makeRequest(request);
    },

    updateTask({ taskListID, taskID, ...params }) {
        const request = gapi.client.tasks.tasks.update({
            tasklist : taskListID,
            task     : taskID,
            id       : taskID,
            ...params
        });

        return this.makeRequest(request);
    },

    deleteTask(params) {
        const request = gapi.client.tasks.tasks.delete({
            tasklist : params.taskListID,
            task     : params.taskID,
            id       : params.taskID
        });

        return this.makeRequest(request);
    },

    makeRequest(requestObj) {
        return new Promise((resolve, reject) => {
            requestObj.execute(resp =>
                resp.error ? reject(resp.error) : resolve(resp.result)
            )
        })
    }
}
