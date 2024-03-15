import './TasksList.css';
import React from 'react';
import DeleteIcon from '../../img/icons-delete.svg';

function TaskList({ tasks, statusHeader, onDeleteTask, onUpdateStatus }) {
    return (
        <div className='Tasks-list'>
            <div className='Tasks-list-header'>
                <p className='Status'>{statusHeader}</p>
            </div>
            <div className='Tasks-container'>
                {tasks.map((task, index) => (
                    <div key={task.id} className={`Task ${index % 2 === 0 ? 'Even' : 'Odd'}`}>
                    <div className='Task-info'>
                        <div>
                            <label>Status: </label>
                            <select value={task.status} onChange={(e) => onUpdateStatus(task.id, e.target.value)}>
                                <option value="to_do">Pendente</option>
                                <option value="doing">Em Progresso</option>
                                <option value="done">Concluído</option>
                            </select>
                        </div>
                        <div>{task.name}</div>
                        <div>{task.description}</div>
                    </div>
                    <button className='Delete-btn' onClick={() => onDeleteTask(task.id)}>
                        <img src={DeleteIcon} className="Delete-icon" alt="Deletar" />
                    </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TaskList;