import React from 'react';
import './App.css';
import Router from './router';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AutenticacaoContext';
import ModalAchado from './components/layout/Modals/ModalAchado/ModalAchado';
import ModalPerdido from './components/layout/Modals/ModalPerdido/ModalPerdido';

function App() {
  return (
    <AuthProvider>
      <React.Fragment>
        <div className='bg-gray-100 h-screen'>
          <Toaster
            position="top-center"
            reverseOrder={false}
          />
          <ModalAchado />
          <ModalPerdido />
          <Router />
        </div>
      </React.Fragment>
    </AuthProvider>
  );
}

export default App;
