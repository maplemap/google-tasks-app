import React from 'react';

import TasksActions from '../actions/TasksActions';
import TasksStore from '../stores/TasksStore';
import TaskListActions from '../actions/TaskListActions';
import TaskListsStore from '../stores/TaskListsStore';

import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import TasksPage from '../components/TasksPage.jsx';
import TaskCreateModal from '../components/TaskCreateModal.jsx';


function getStateFromFlux() {
    return {
        taskList: TaskListsStore.getCurrentTaskList(),
        tasks: TasksStore.getTasks(),
        error: TasksStore.getError(),
        isLoadingTasks: TasksStore.isLoadingTasks()
    };
}

class TasksPageContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...getStateFromFlux(),
            isCreatingTask: false
        };

        TasksActions.loadTasks(this.props.params.id);
        TaskListActions.getTaskList(this.props.params.id);
    }

    componentDidMount() {
        TasksStore.addChangeListener(this._onChange);
        TaskListsStore.addChangeListener(this._onChange);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.params.id !== nextProps.params.id) {
            TasksActions.loadTasks(nextProps.params.id);
            TaskListActions.getTaskList(nextProps.params.id);
        }
    }

    componentWillUnmount() {
        TasksStore.removeChangeListener(this._onChange);
        TaskListsStore.removeChangeListener(this._onChange);
    }

    handleTaskStatusChange = (taskID, { isCompleted }) => {
        TasksActions.updateTaskStatus({
            taskListID: this.props.params.id,
            taskID: taskID,
            isCompleted: isCompleted
        });
    }

    handleTaskUpdate = (taskID, task) => {
        TasksActions.updateTask({
            taskListID: this.props.params.id,
            taskID: taskID,
            ...task
        });
    }

    handleAddTask = () => {
        this.setState({ isCreatingTask : true });
    }

    handleTaskDelete = (taskID) => {
        TasksActions.deleteTask({
            taskListID: this.props.params.id,
            taskID: taskID,
        });
    }

    handleClose = () => {
        this.setState({ isCreatingTask : false });
    }

    handleTaskSubmit = (task) => {
        const taskListID = this.props.params.id;

        TasksActions.createTask({ taskListID, ...task });

        this.setState({ isCreatingTask : false });
    }

    handleDeleteTaskList = () => {
        const isConfirmed = confirm(
            'Are you sure you want delete this task list? All tasks in it will be deleted too'
        );

        if (isConfirmed) {
            TaskListActions.deleteTaskList({
                taskListID: this.props.params.id
            });
        }

        this.context.router.push('/lists');
    }

    render() {
        return (
            <div>
                <TasksPage
                    taskList={this.state.taskList}
                    tasks={this.state.tasks}
                    error={this.state.error}
                    isLoadingTasks={this.state.isLoadingTasks}
                    onAddTask={this.handleAddTask}
                    onTaskDelete={this.handleTaskDelete}
                    onTaskStatusChange={this.handleTaskStatusChange}
                    onTaskUpdate={this.handleTaskUpdate}
                    onDeleteTaskList={this.handleDeleteTaskList}
                />
                <TaskCreateModal
                    isOpen={this.state.isCreatingTask}
                    onSubmit={this.handleTaskSubmit}
                    onClose={this.handleClose}
                />
            </div>
        );
    }

    _onChange = () => {
         this.setState(getStateFromFlux());
    }
};

TasksPageContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default TasksPageContainer;
