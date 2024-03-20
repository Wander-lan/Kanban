import './TasksList.css';
import React from 'react';
import PropTypes from 'prop-types';
import TaskItem from '../TaskItem/TaskItem';

function TaskList ({
    tasks,
    statusHeader,
    onDeleteTask,
    onUpdateStatus,
    onUpdateTaskTitle,
    onUpdateTaskDescription
}) {
    return (
        <div className='Tasks-list'>
            <div className='Tasks-list-header'>
                <p className='Tasks-list-title'>{statusHeader}</p>
            </div>
            <div className='Tasks-container'>
                {tasks.map((task, index) => (
                    <TaskItem
                        className={` ${index % 2 === 0 ? 'Even' : 'Odd'} `}
                        task={task}
                        onDeleteTask={onDeleteTask}
                        onUpdateStatus={onUpdateStatus}
                        onUpdateTaskTitle={onUpdateTaskTitle}
                        onUpdateTaskDescription={onUpdateTaskDescription}
                    />
                ))}
            </div>
        </div>
    );
}

TaskList.propTypes = {
    tasks: PropTypes.array.isRequired,
    statusHeader: PropTypes.string.isRequired,
    onDeleteTask: PropTypes.func.isRequired,
    onUpdateStatus: PropTypes.func.isRequired,
    onUpdateTaskTitle: PropTypes.func.isRequired,
    onUpdateTaskDescription: PropTypes.func.isRequired
};

export default TaskList;