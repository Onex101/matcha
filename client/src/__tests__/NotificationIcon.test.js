import React from 'react';
import {render, cleanup,} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NotificationIcon from '../components/NotificationIcon.js';

afterEach(cleanup);

describe("Testing Notification Icon", ()=>{
	it(" Display Notifications", ()=>{
		const { asFragment, getByTestId} = render(<NotificationIcon count={1} />);
		const badgeNode = getByTestId('badge');
		expect(badgeNode.textContent).toBe('1');
		expect(asFragment()).toMatchSnapshot();
	});
})
