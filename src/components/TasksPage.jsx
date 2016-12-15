import React from 'react';

import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import CircularProgress from 'material-ui/CircularProgress';

import Task from './Task.jsx';
import './TasksPage.less';



class TasksPage extends React.Component {
    _renderTasks = () => {
        return (
            <div className='TasksPage__tasks'>
                {
                    this.props.tasks.map(task =>
                        <Task
                            key={task.id}
                            text={task.text}
                            note={task.note}
                            due={task.due}
                            isCompleted={task.isCompleted}
                            onDelete={this.props.onTaskDelete.bind(null, task.id)}
                            onStatusChange={this.props.onTaskStatusChange.bind(null, task.id)}
                            onUpdate={this.props.onTaskUpdate.bind(null, task.id)}
                        />
                    )
                }
            </div>
        )
    }

    render() {
        if(this.props.error) {
            return (
                <div className="TasksPage">
                    <div className="TaskdPage__error">
                        {this.props.error}
                    </div>
                </div>
            )
        }


        return (
            <div className='TasksPage'>
                <div className='TasksPage__header'>
                    <h2 className='TasksPage__title'>{this.props.taskList ? this.props.taskList.name : ''}</h2>
                    <div className='TasksPage__tools'>
                        <IconButton onClick={this.props.onAddTask}>
                            <ContentAdd />
                        </IconButton>
                    </div>
                </div>

                {
                    this.props.isLoadingTasks
                    ?
                        <CircularProgress />
                    :
                        this._renderTasks()
                }
            </div>
        );
    }
};

export default TasksPage;
