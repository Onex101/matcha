import React from 'react';
import {render, cleanup, fireEvent,} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ForgotPasswordEmail from '../containers/ForgotPasswordEmail.js';

afterEach(cleanup);

describe("Testing Forgot Password Email", ()=>{
	it("Display Notifications", ()=>{
		const { asFragment, getByText, getByTestId, getByLabelText } = render(<ForgotPasswordEmail />);
		expect(getByTestId("notSent")).toHaveTextContent("Send password reset email");

		const contentInput = getByTestId("emailInput");
		expect(contentInput.value).toBe('')
		fireEvent.change(contentInput, {
			target: { value: 'test@gmail.com' }
		})
		expect(contentInput.value).toBe('test@gmail.com')
		fireEvent.click(getByText("Send password reset email"))
		expect(getByTestId("sent")).toHaveTextContent("An email has been sent to set up a new password.");

		expect(asFragment()).toMatchSnapshot();
	});
})
