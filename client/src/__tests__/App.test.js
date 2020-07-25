import React from 'react';
import {render, cleanup, fireEvent, waitForElement} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App.js';

afterEach(cleanup);

it("renders", ()=>{
	const { asFragment,  } = render(<Router>
		<App />
	</Router>);
	expect(asFragment()).toMatchSnapshot();

});