import './App.css'
import AppRouter from "./router/index";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
      <div className="min-h-screen bg-gray-100">
          <ToastContainer />
          <AppRouter />
      </div>
  )
}

export default App
