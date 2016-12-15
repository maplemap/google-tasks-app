import React from 'react';
import moment from 'moment';

import Checkbox from 'material-ui/Checkbox';
import {ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import DeleteIcon from 'material-ui/svg-icons/action/delete';
import NoteIcon from 'material-ui/svg-icons/communication/message';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import './Task.less';

const ENTER_KEY = 13;
const ESC_KEY = 27;

class Task extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false
        }
    }

    handleEdit = (e) => {
        this.setState({ isEditing: true }, this.focusInput);
    }

    handleCancel = () => {
        this.cancelTask();
    }

    handleSave = () => {
        this.saveTask();
    }

    handleCheck = () => {
        this.props.onStatusChange({
            isCompleted: !this.props.isCompleted
        });
    }

    handleKeyDown = (e) => {
        if (e.keyCode === ENTER_KEY) {
            this.saveTask();
        }

        if (e.keyCode === ESC_KEY) {
            this.cancelTask();
        }
    }

    focusInput = () => {
        this.text.focus();
    }

    saveTask = () => {
        this.props.onUpdate({
            text: this.text.value,
            note: this.note.value
        });

        this.setState({ isEditing: false });
    }

    cancelTask = () => {
        this.setState({ isEditing: false });
    }

    render() {
        return (
            this.state.isEditing
            ?
                <div className='Task editing'>
                    <input
                        className='Task__input'
                        type='text'
                        defaultValue={this.props.text}
                        onKeyDown={this.handleKeyDown}
                        ref={c => this.text = c}
                    />
                    <textarea
                        className='Task__note-input'
                        type='text'
                        defaultValue={this.props.note}
                        onKeyDown={this.handleKeyDown}
                        ref={c => this.note = c}
                    />
                    <div className='Task__toolbar'>
                        <div>
                            <RaisedButton primary onClick={this.handleSave} label='Save' />
                            <FlatButton onClick={this.handleCancel} label='Cancel' />
                        </div>
                    </div>
                </div>
            :
                <div className='Task'>
                    <Checkbox
                        className='Task__checkbox'
                        checked={this.props.isCompleted}
                        onCheck={this.handleCheck}
                    />

                    <div className='Task__text' onClick={this.handleEdit}>
                        <div className='Task__title'>
                            {this.props.text}
                            {
                                this.props.note
                                ?
                                    <span title={this.props.note}>
                                        <NoteIcon className='Task__note' />
                                    </span>
                                :
                                    null
                            }
                        </div>
                        {
                            this.props.due
                            ?
                                <div className='Task__due'>
                                    {'due ' + moment(this.props.due).fromNow()}
                                </div>
                            :
                                null
                        }
                    </div>

                    <IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}>
                        <MenuItem onClick={this.handleEdit}>Edit</MenuItem>
                        <MenuItem onClick={this.props.onDelete}>Delete</MenuItem>
                    </IconMenu>
                </div>
        );
    }
};

export default Task;
