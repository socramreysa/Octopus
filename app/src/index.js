import React from 'react';
import { render } from 'react-dom';


//import containers

import App from './containers/App';
import Main from './containers/Main';
// import PaymentNotice from './containers/PaymentNotice';
// import Expenses from './containers/Expenses';
// import Account from './containers/Account';
// import News from './containers/News';
// import UsefulInfo from './containers/UsefulInfo';
import AmenitiesContainer from './containers/AmenitiesContainer';
<<<<<<< HEAD
// import ComplaintsContainer from './containers/ComplaintsContainer';
=======
import ComplaintsContainer from './containers/ComplaintsContainer';
import MeanWhile from './components/elements/meanwhileLoginForm'
>>>>>>> a840be2e695592c09d9e9352112554b66414be32
// import MyAccount from './containers/MyAccount';


//import components


//import react router deps
import { Router, Route, IndexRoute, hashHistory} from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './redux/store.js';

//routes
const router = (
			<Provider store ={store}>
			 <Router history={hashHistory}>
					 <Route path='/' component={App}>
<<<<<<< HEAD
						 	<IndexRoute component={AmenitiesContainer}/>

=======
						 	<IndexRoute component={MeanWhile}/>
							{/*<Route path='/informar-pagos' component={PaymentNotice}></Route>
							<IndexRoute component={Main}></IndexRoute>
							<Route path='/expensas' component={Expenses}></Route>
							<Route path='/cuenta-corriente' component={Account}></Route>
							<Route path='/novedades' component={News}></Route>
							<Route path='/:username' component={MyAccount}></Route>
							<Route path='/datos-utiles' component={UsefulInfo}></Route>*/}
>>>>>>> a840be2e695592c09d9e9352112554b66414be32
							<Route path='/amenities' component={AmenitiesContainer}></Route>


							<Route path='/' component={Main}></Route>
						</Route>
				</Router>
			</Provider>
	)

render(router, document.getElementById('app'));
