const CLIENT_ID = '493022954051-0jar5jadmigsuikpv9qnt1fevjd5661d.apps.googleusercontent.com';
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

        return new Promise((resolve, reject) => {
            request.execute(resp => resolve(resp));
        });
    },

    inserTaskList({title}) {
        const request = gapi.client.tasks.tasklists.insert({
            title: title
        });

        return new Promise((resolve, reject) => {
            request.execute(resp => resolve(resp))
        })
    },

    listTasks(taskListID) {
        const request = gapi.client.tasks.tasks.list({
            tasklist: taskListID
        });

        return new Promise((resolve, reject) => {
            request.execute(resp => resolve(resp))
        })
    },

    insertTask({taskListID, title}) {
        const request = gapi.client.tasks.tasks.insert({
            tasklist: taskListID,
            title: title
        });

        return new Promise((resolve, reject) => {
            request.execute(resp => resolve(resp))
        })
    },

    updateTask({ taskListID, taskID, ...params }) {
        const request = gapi.client.tasks.tasks.update({
            tasklist : taskListID,
            task     : taskID,
            id       : taskID,
            ...params
        });

        return new Promise((resolve, reject) => {
            request.execute(resp => resolve(resp));
        });
    }
}
