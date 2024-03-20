import './App.css';
import React from 'react';
import Kanban from './components/Kanban/Kanban';

function App() {
  return (
    <div className='App'>
      <div className='App-header'>
        <div className='Title'>
          <h1>Gerenciamento de Tarefas</h1>
        </div>
      </div>

      <div className='App-body'>
        <Kanban/>
      </div>
    </div>
  );
}

export default App;