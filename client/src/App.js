import './App.css';
import FilterPage from './components/pages/FilterPage';
import RecipeForm from './components/forms/RecipeForm';
import Landing from './components/pages/LandingPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Routes>
      <Route
        exact
        path='/'
        element={<Landing />}        
          />
      <Route
        exact
        path='/home'
        element={<FilterPage />}        
      />
      <Route
        exact
        path='/new'
        element={<RecipeForm />} 
        />
        </Routes>  
        </BrowserRouter>
    </div>
  );
}

export default App;
