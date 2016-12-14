import React from 'react';

import TasksActions from '../actions/TasksActions';
import TasksStore from '../stores/TasksStore';

import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import TasksPage from '../components/TasksPage.jsx';
import TaskCreateModal from '../components/TaskCreateModal.jsx';


function getStateFromFlux() {
    return {
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
    }

    componentDidMount() {
        TasksStore.addChangeListener(this._onChange);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.params.id !== nextProps.params.id) {
            TasksActions.loadTasks(nextProps.params.id);
        }
    }

    componentWillUnmount() {
        TasksStore.removeChangeListener(this._onChange);
    }

    handleTaskStatusChange = (taskID, { isCompleted }) => {
        TasksActions.updateTaskStatus({
            taskListID: this.props.params.id,
            taskID: taskID,
            isCompleted: isCompleted
        });
    }

    handleTaskUpdate = (taskID, { text }) => {
        TasksActions.updateTask({
            taskListID: this.props.params.id,
            taskID: taskID,
            text: text
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

    render() {
        return (
            <div>
                <TasksPage
                    // taskList={this.state.taskList}
                    tasks={this.state.tasks}
                    error={this.state.error}
                    isLoadingTasks={this.state.isLoadingTasks}
                    // onUpdateTaskList={this.handleUpdateTaskList}
                    onAddTask={this.handleAddTask}
                    // onDeleteTaskList={this.handleDeleteTaskList}
                    onTaskDelete={this.handleTaskDelete}
                    onTaskStatusChange={this.handleTaskStatusChange}
                    onTaskUpdate={this.handleTaskUpdate}
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

export default TasksPageContainer;
