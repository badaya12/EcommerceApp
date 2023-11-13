import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import {Navbar} from './components/navbar'
import './App.css';
import {AuthPage} from"./pages/auth"
import {CheckoutPage} from"./pages/checkout"
import {ShopPage} from"./pages/shop"
import {PurchasedItemsPage} from"./pages/purchased-items"
import { ShopContextProvider } from './context/shop-context';

function App() {
  return (
    <div className='App'>
      <Router>
        <ShopContextProvider>
        <Navbar/>
        <Routes>
          <Route path='/' element={<ShopPage/>}/>
          <Route path='/auth' element={<AuthPage/>}/>
          <Route path='/checkout' element={<CheckoutPage/>}/>
          <Route path='/purchased-items' element = {< PurchasedItemsPage/>}/>
        </Routes>
        </ShopContextProvider>
              </Router>
    </div>
  );
}

export default App;
