import React from 'react';

import TaskListsStore from '../stores/TaskListsStore';
import TaskListsActions from '../actions/TaskListActions';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import ListIcon from 'material-ui/svg-icons/action/view-list';
import HomeIcon from 'material-ui/svg-icons/action/home';
import ExitIcon from 'material-ui/svg-icons/action/exit-to-app';
import FolderIcon from 'material-ui/svg-icons/file/folder';
import AddIcon from 'material-ui/svg-icons/content/add';

import TasklistsPage from '../components/TasklistsPage.jsx';
import TaskListCreateModal from '../components/TaskListCreateModal.jsx';

function getStateFromFlux() {
    return {
        taskLists: TaskListsStore.getTaskLists()
    };
}

class TasklistsPageContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            taskLists: getStateFromFlux().taskLists,
            isCreatingTaskList: false
        };

        TaskListsActions.loadTaskLists();
    }

    componentDidMount() {
        TaskListsStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        TaskListsStore.removeChangeListener(this._onChange);
    }

    handleAddTaskList = () => {
        this.setState({ isCreatingTaskList : true });
    }

    handleClose = () => {
        this.setState({ isCreatingTaskList : false });
    }

    handleTaskListSubmit = (taskList) => {
        TaskListsActions.createTaskList(taskList);

        this.setState({ isCreatingTaskList : false });
    }

    render() {
        const { router } = this.context;


        return (
            <div>
                <TasklistsPage
                    taskLists={this.state.taskLists}
                    selectedListID={this.state.taskLists}
                    page={this.props.children}
                    onAddTaskList={this.handleAddTaskList}
                    onLogOut={this.onLogOut}
                />
                <TaskListCreateModal
                    isOpen={this.state.isCreatingTaskList}
                    onSubmit={this.handleTaskListSubmit}
                    onClose={this.handleClose}
                />
            </div>
        );
    }

    _onChange = () => {
        this.setState(getStateFromFlux());
    }
};

TasklistsPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default TasklistsPageContainer;
