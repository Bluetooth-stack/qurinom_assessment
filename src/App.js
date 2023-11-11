import './App.css';
import Header from './Components/Common/Header';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './Pages/Home'
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Task from './Pages/Task';
import AddNew from './Pages/AddNew';
import EditCard from './Pages/EditCard';
import PrivateRoute from './Components/PrivateRouting';

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="light"
      />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route element={<PrivateRoute />} >
          <Route path='/dashboard' element={<Task />} />
          <Route path='/:id/addnew' element={<AddNew />} />
          <Route path='/:docid/edit' element={<EditCard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
