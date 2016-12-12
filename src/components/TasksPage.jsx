import React from 'react';

import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import Task from './Task.jsx';
import './TasksPage.less';



class TasksPage extends React.Component {
    render() {
        return (
            <div className='TasksPage'>
                <div className='TasksPage__header'>
                    <h2 className='TasksPage__title'>List name</h2>
                    <div className='TasksPage__tools'>
                        <IconButton onClick={this.props.onAddTask}>
                            <ContentAdd />
                        </IconButton>
                    </div>
                </div>

                <div className='TasksPage__tasks'>
                    {
                        this.props.tasks.map(task =>
                            <Task
                                key={task.id}
                                text={task.text}
                                isCompleted={task.isCompleted}
                                onStatusChange={this.props.onTaskStatusChange.bind(null, task.id)}
                                onUpdate={this.props.onTaskUpdate.bind(null, task.id)}
                            />
                        )
                    }
                </div>
            </div>
        );
    }
};

export default TasksPage;
