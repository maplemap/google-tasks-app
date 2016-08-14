import React from 'react';

// import TasksActions from '../actions/TasksActions';
// import TasksStore from '../stores/TasksStore';

import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

// import Task from './Task.jsx';
// import TaskCreateModal from './TaskCreateModal.jsx';

import './TasksPage.less';

// function getStateFromFlux() {
//     return {
//         tasks: TasksStore.getTasks()
//     };
// }

class TasksPage extends React.Component {
    constructor(props) {
        super(props);

        // this.state = getStateFromFlux();
        this.state = {
            isCreatingTask: false
        };
    }

    componentWillMount() {
        // TasksActions.loadTasks(this.props.params.id);
    }

    componentDidMount() {
        // TasksStore.addChangeListener(this._onChange);
    }

    componentWillReceiveProps(nextProps) {
        // if (this.props.params.id !== nextProps.params.id) {
        //     TasksActions.loadTasks(nextProps.params.id);
        // }
    }

    componentWillUnmount() {
        // TasksStore.removeChangeListener(this._onChange);
    }

    handleStatusChange(taskId, { isCompleted }) {
        // TasksActions.updateTaskStatus({
        //     taskListId: this.props.params.id,
        //     taskId: taskId,
        //     isCompleted: isCompleted
        // });
    }

    handleTaskUpdate(taskId, { text }) {
        // TasksActions.updateTask({
        //     taskListId: this.props.params.id,
        //     taskId: taskId,
        //     text: text
        // });
    }

    handleAddTask() {
        // this.setState({ isCreatingTask : true });
    }

    handleClose() {
        // this.setState({ isCreatingTask : false });
    }

    handleTaskSubmit(task) {
        const taskListId = this.props.params.id;

        // TasksActions.createTask({ taskListId, ...task });

        // this.setState({ isCreatingTask : false });
    }

    render() {
        return (
            <div className='TasksPage'>
                <div className='TasksPage__header'>
                    <h2 className='TasksPage__title'>List name</h2>
                    <div className='TasksPage__tools'>
                        <IconButton>
                            <ContentAdd />
                        </IconButton>
                    </div>
                </div>

                <div className='TasksPage__tasks'>
                    Tasks
                </div>
            </div>
        );
    }

    _onChange() {
        // this.setState(getStateFromFlux());
    }
};

export default TasksPage;
