import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

import api from '../api';

const TasksActions = {
    loadTasks(taskListID) {
        AppDispatcher.dispatch({
            type: AppConstants.TASKS_LOAD_REQUEST
        });

        api.listTasks(taskListID)
            .then(data => {
                AppDispatcher.dispatch({
                    type: AppConstants.TASKS_LOAD_SUCCESS,
                    items: data.items || []
                });
            })
            .catch(err => {
                AppDispatcher.dispatch({
                    type: AppConstants.TASKS_LOAD_FAIL,
                    error: err
                });
            });
    },

    updateTaskStatus(params) {
        api.updateTask({
            taskListID: params.taskListID,
            taskID: params.taskID,
            status: params.isCompleted ? 'completed' : 'needsAction'
        })
        .then(data => {
            AppDispatcher.dispatch({
                type: AppConstants.TASK_UPDATE_SUCCESS,
                task: data,
                taskID: params.taskID
            });
        })
        .catch(err => {
            AppDispatcher.dispatch({
                type: AppConstants.TASK_UPDATE_FAIL,
                error: err
            })
        })
    },

    createTask(params) {
        api.insertTask({
            taskListID: params.taskListID,
            title: params.text
        })
        .then (data => {
            AppDispatcher.dispatch({
                type: AppConstants.TASK_CREATE_SUCCESS,
                task: data
            })
        })
        .catch (data => {
            AppDispatcher.dispatch({
                type: AppConstants.TASK_CREATE_FAIL,
                error: err
            })
        })
    },

    updateTask(params) {
        api.updateTask({
            taskListID: params.taskListID,
            taskID: params.taskID,
            title: params.text
        })
        .then(data => {
            AppDispatcher.dispatch({
                type   : AppConstants.TASK_UPDATE_SUCCESS,
                task   : data,
                taskID : params.taskID
            });
        })
        .catch(err => {
            AppDispatcher.dispatch({
                type  : AppConstants.TASK_UPDATE_FAIL,
                error : err
            });
        });
    }
};

export default TasksActions;
