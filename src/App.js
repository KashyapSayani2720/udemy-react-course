import './App.css';
import { Route, Routes } from 'react-router-dom';
import AllMeetupsPage from './pages/AllMeetups';
import NewMeetupsPage from './pages/NewMeetups';
import FavoritesPage from './pages/Favorites';
import Layout from './components/layouts/Layout';

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path='/' element={<AllMeetupsPage />}></Route>
          <Route path='/new-meetup' element={<NewMeetupsPage />}></Route>
          <Route path='/favorites' element={<FavoritesPage />}></Route>
        </Routes>
      </Layout>
    </>
  );
}

export default App;
