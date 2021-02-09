
import './App.css';
import Router from './router';
import AuthContextProvider from "./contexts/authContext";
import Chart from "./components/chart/chart";
function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </div>
  );
}


export default App;
