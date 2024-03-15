import './App.css';
import React, { useState, useEffect } from 'react';
import TasksList from './components/TasksList/TasksList';
import axios from 'axios';
import Modal from 'react-modal';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [filtro, setFilter] = useState('');

  const [isShowSuccessPopup, setShowSuccessPopup] = useState(false);

  // Carrega a lista de tarefas ao montar o componente
  useEffect(() => {
    axios.get('http://localhost:3001/tasks')
      .then(response => {
        setTasks(response.data);
        setIsLoading(false);
      })
      .catch(error => console.error(error));
  }, []);

  // Mostra um popup avisando que uma nova task foi criada com sucesso
  const showSuccessPopup = () => {
    setShowSuccessPopup(true);
    setTimeout(() => setShowSuccessPopup(false), 3000); // Desaparece após 3 segundos
  };
  
  // Envia uma requisição para criar uma nova task
  const createTask = () => {
    // Verifica se o nome está vazio
    if (!taskName) {
      alert('É obrigatório dar um nome à task.');
      return;
    }

    axios.post('http://localhost:3001/tasks', {
      name: taskName,
      description: taskDescription,
    })
      .then(response => {
        setTasks([...tasks, response.data]);
        setTaskName('');
        setTaskDescription('');

        showSuccessPopup();
      })
      .catch(error => {
        console.log("Deu pau aqui")
        console.error(error)
      });
  };

  // Envia uma requisição para deletar uma tarefa com base em seu ID
  const deleteTask = (taskId) => {
    // Confirmação antes de deletar
    if (window.confirm('Deseja realmente deletar esta task?')) {
      axios.delete(`http://localhost:3001/tasks/${taskId}`)
      .then(response => {
        setTasks(tasks.filter(task => task.id !== taskId));
      })
      .catch(error => console.error(error));
    }
  };

  const updateTaskStatus = (taskId, newStatus) => {
    axios.put(`http://localhost:3001/tasks/${taskId}/status`, {
      status: newStatus,
    })
    .then(response => {
      // Remove a tarefa atualizada da lista de tarefas
      const updatedTask = response.data;
      const filteredTasks = tasks.filter(task => task.id !== updatedTask.id);
  
      // Adiciona a tarefa atualizada na posição correta com base no novo status
      const updatedTasks = [...filteredTasks, updatedTask].sort((a, b) => {
        if (a.status < b.status) return -1;
        if (a.status > b.status) return 1;
        return 0;
      });
  
      // Atualiza o estado com a lista reorganizada de tarefas
      setTasks(updatedTasks);
    })
    .catch(error => console.error(error));
  };

  // Filtra a lista de tasks para exibir somente as desejadas
  const filterTasks = (tasksList) => {
    return tasksList.filter(task => 
      task.name.toLowerCase().includes(filtro.toLowerCase()) ||
      task.description.toLowerCase().includes(filtro.toLowerCase())
    );
  };

  const handleDescChange = (event) => {
    let description = event.target.value;
    description = description.slice(0,500);
    setTaskDescription(description);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='App'>
      <div className='App-header'>
        <div className='Title'>
          <h1>Gerenciamento de Tarefas</h1>
        </div>
        {isShowSuccessPopup && (
          <div className="Success-popup-container">
            <div className='Success-popup'>
              <p>Nova tarefa criada com <span style={{ color: 'green' }}>sucesso</span>!</p>
            </div>
          </div>
        )}
      </div>

      <div className='App-body'>
      

        {<div className='Filter-container'>
          <div className='Filter-input'>
            <label>Filtrar por:</label>
            <input type="text" value={filtro} onChange={(e) => setFilter(e.target.value)} />
          </div>
        </div>}
      
        {isLoading ? (
          <p>Carregando...</p>
        ) : (
          <div className='Tasks-lists-container'>
            <TasksList
              tasks={filterTasks(tasks.filter(task => task.status === "to_do"))}
              statusHeader={"Pendente"}
              onDeleteTask={deleteTask}
              onUpdateStatus={updateTaskStatus}
            />
            <TasksList
              tasks={filterTasks(tasks.filter(task => task.status === "doing"))}
              statusHeader={"Em progresso"}
              onDeleteTask={deleteTask}
              onUpdateStatus={updateTaskStatus}
            />
            <TasksList
              tasks={filterTasks(tasks.filter(task => task.status === "done"))}
              statusHeader={"Concluído"}
              onDeleteTask={deleteTask}
              onUpdateStatus={updateTaskStatus}
            />
          </div>
        )}

        <div className='Button-container'>
          <button className='Register-btn' onClick={openModal}>Criar nova tarefa</button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Cadastrar Nova Tarefa"
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            height: 'fit-content',
            maxHeight: '28rem',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}
      >
        <div className='Modal-container'>
          <div className='Modal-header'>
            <button className='Close-modal-btn' onClick={closeModal}>X</button>
          </div>
          <div className='Modal-content'>
            <div className='Input-container'>
              <label>Título:</label>
              <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
            </div>
            <div className='Input-container'>
              <label>Descrição:</label>
              <textarea type="text" rows={5} value={taskDescription} onChange={handleDescChange}/>
            </div>
          </div>
          <div className='Modal-footer'>
            <button className='Register-btn' onClick={createTask}>Criar</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;