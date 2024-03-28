import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import SearchPokemon from './pages/SearchPokemon';
import './styles/App.scss';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/pokemon-list" Component={SearchPokemon} />
        <Route path="*" Component={NotFound} />
      </Routes>
    </Router>
  );
}

export default App;
