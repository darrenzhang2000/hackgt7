import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Register from './pages/register/register.page';
import Landing from './pages/landing/landing.page';
import { Provider } from 'react-redux';
import store from './redux/redux';
import Header from './component/header/header.component'
import Footer from './component/bottom/bottom.component'
import Onboarding1 from './pages/onboarding/onboarding1.page';
import onboarding2 from './pages/onboarding/onboarding2.page';
import Onboarding3 from './pages/onboarding/onboarding3.page';



function App() {
  return (
    <Provider store={store}>

    <div>
      <Header />
      <Route exact path='/' component={Landing} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/onboarding1' component={Onboarding1} />
      <Route exact path='/onboarding2' component={onboarding2} />
      <Route exact path='/onboarding3' component={Onboarding3} />
      <Footer />
    </div>
    </Provider>

  );
}

export default App;
