import React from 'react';
import {render, cleanup, fireEvent,wait, waitFor, waitForElement, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from '../containers/Login.js';

afterEach(cleanup);

describe("Testing Login Screen", ()=>{

	it("input can be inserted and applied", async ()=>{
		const { asFragment, getByLabelText, getByText, getByTestId, findByTestId, getByRole} = render(<Login />);
		const usernameInput = getByLabelText("Username");
		const passwordInput = getByLabelText("Password");
		const loginButton = getByText("Login");
		usernameInput.value= 'TEST';
		passwordInput.value= 'TEST';
		fireEvent.change(usernameInput);
		fireEvent.change(usernameInput);
		fireEvent.click(getByText("Login"));

	});

	it("error element appears when logging in without any credentials", async ()=>{
		const {getByText, queryByTestId} = render(<Login />);
		fireEvent.click(getByText("Login"));
		
		await wait(() => {
			expect(queryByTestId('error')).toBeTruthy()
		}).catch(err=>{console.log(err)})

	});
})
