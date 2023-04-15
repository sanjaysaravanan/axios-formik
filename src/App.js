import { Route, BrowserRouter, Routes } from 'react-router-dom';

import './App.css';

import Layout from './Layout';
import AddEdit from './pages/AddEdit/AddEdit';
import MovieList from './pages/Home/MovieList';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MovieList />} />
            <Route path="/movies" element={<MovieList />} />
            <Route path="/editMovie/:id" element={<AddEdit />} />
            <Route path="/addMovie" element={<AddEdit />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
