import React from 'react';
import {render, cleanup,  } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Verification from '../containers/Verification.js';

afterEach(cleanup);

describe("Testing Verification Screen", ()=>{
	it("has Loading... screen", ()=>{
		const { asFragment, getByText} = render(<Verification />);
		expect(getByText('Loading...')).toBeInTheDocument()
		expect(asFragment()).toMatchSnapshot();
	});
})
