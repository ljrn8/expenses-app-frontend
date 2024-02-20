import { render, screen, waitFor } from '@testing-library/react';
import Verification from './components/Verification';
import userEvent from '@testing-library/user-event';
import { getMyCustomerObject, loginAndAskForJWT } from './api/Customers';
require('jest-fetch-mock').enableMocks()

/**
 * @jest-environment jsdom
 */


/** @type {import('jest').Config} */
const config = {
    testEnvironment: 'jsdom',
    testEnvironmentOptions: {
        html: '<html lang="zh-cmn-Hant"></html>',
        url: 'https://jestjs.io/',
        userAgent: 'Agent/007',
    },
};
module.exports = config;


function getJwt(username, password) {
    loginAndAskForJWT(username, password).then(async res => {
        
        // correct jwt
        let jwt = await expect(res.text()).resolves.toBeTruthy()
        expect(jwt.startsWith('Bearer ')).toBeTruthy();
        jwt = jwt.slice(7);
        expect(jwt).not.toBeNull()
        expect(jwt).not.toBe("")
          
        return jwt;
    })
}

it('get customer object', async () => {
    let jwt = getJwt("rose", "esor");
    let customer = getMyCustomerObject(jwt);

    // correct response object
    expect(customer).toBeTruthy();
    expect(customer.purchases).toBeTruthy();
    expect(customer.username).toBe("rose");
    expect(customer.purchases).toMatchObject({
        "apples": 0,
        "bananas": 0,
        "oranges": 0
    });
});


// rendering

it("renders login page", async () => {
    render(<Verification />);
});

/*
it('correct login snapshot', async () => {
    render(<Verification />);
    
    // successfully fillout login form
    const usernameInput = screen.getByPlaceholderText(/Username/i); // case insensitive
    const passwordInput = screen.getByPlaceholderText(/Password/i);    
    userEvent.type(usernameInput, "rose");
    userEvent.type(passwordInput, "esor");
    
    // submit form
    const submitButton = screen.getByRole('button', { name: /submit/i });
    userEvent.click(submitButton);

    await waitFor(() => {
        expect(screen.getByTestId('portal')).toBeInTheDocument();
    })
});

*/

