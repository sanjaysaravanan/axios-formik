import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.css';

import Layout from './Layout';
import AddEdit from './pages/AddEdit/AddEdit';
import MovieList from './pages/Home/MovieList';
import States from './pages/States/States';
import store from './store/store';

function App() {

  return (
    <Provider store={store} >
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<MovieList />} />
              <Route path="/movies" element={<MovieList />} />
              <Route path="/editMovie/:id" element={<AddEdit />} />
              <Route path="/addMovie" element={<AddEdit />} />
              <Route path="/reduxStates" element={<States />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
