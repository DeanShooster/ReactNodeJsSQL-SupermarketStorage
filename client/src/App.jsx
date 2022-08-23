import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import LoginPage from './components/login-page/LoginPage';
import Header from './components/header/Header';
import ProductList from './components/product-list/ProductList';
import { AdminContextProvider } from './context/AdminContext';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Header />
        <AdminContextProvider>
          <Routes>
              <Route path='/' element={<LoginPage />} />
              <Route path='/storage' element={<ProductList />} />
          </Routes>
        </AdminContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
