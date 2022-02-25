import './App.css';
import HomePage from './components/pages/HomePage';
import Landing from './components/pages/LandingPage';
import RecipeDetail from './components/recipes/RecipeDetail';
import { Switch, Route } from "react-router-dom";
import NewRecipe from './components/pages/NewRecipe';
  
function App() {
  return (   
    <div className="App">      
      <Switch>
      <Route
        exact
          path='/'
          component={Landing}             
          />
      <Route
        exact
        path='/home'
        component={HomePage}        
      />
      <Route
        exact
        path='/new'
        component={NewRecipe} 
          />
      <Route
        exact
        path='/recipe/:recipeId'
        component={RecipeDetail}
      />      
        </Switch>          
    </div>
    
  );
}

export default App;

