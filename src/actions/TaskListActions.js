import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

import api from '../api';

const TaskListActions = {
    loadTaskLists() {
        api.listTasksList()
            .then(data => {
                AppDispatcher.dispatch({
                    type: AppConstants.TASK_LISTS_LOAD_SUCCESS,
                    items: data.items
                });
            })
            .catch(err => {
                AppDispatcher.dispatch({
                    type: AppConstants.TASK_LISTS_LOAD_FAIL,
                    error: err
                });
            });
    },

    getTaskList(taskListID) {
        api.getTaskList(taskListID)
            .then(data => {
                AppDispatcher.dispatch({
                    type: AppConstants.TASK_LIST_LOAD_SUCCESS,
                    taskList: data
                });
            })
            .catch(err => {
                AppDispatcher.dispatch({
                    type: AppConstants.TASK_LIST_LOAD_FAIL,
                    error: err
                });
            });
    },

    createTaskList(params) {
        api.inserTaskList({title: params.name})
            .then(data => {
                AppDispatcher.dispatch({
                    type: AppConstants.TASK_LIST_CREATE_SUCCESS,
                    taskLists: data
                });
            })
            .catch(err => {
                AppDispatcher.dispatch({
                    type: AppConstants.TASK_LIST_CREATE_FAIL,
                    error: err
                })
            })
    },

    deleteTaskList(params) {
        api.deleteTaskList({ taskListID: params.taskListID })
        .then(data => {
            AppDispatcher.dispatch({
                type       : AppConstants.TASK_LIST_DELETE_SUCCESS,
                taskListID : params.taskListID
            });
        })
        .catch(err => {
            AppDispatcher.dispatch({
                type  : AppConstants.TASK_LIST_DELETE_FAIL,
                error : err
            });
        });
    }
};

export default TaskListActions;
