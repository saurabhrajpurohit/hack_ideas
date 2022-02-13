import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../pages/Login';
import store from '../../redux/store';

test('ui to be rendered correctly', () => {
    render(
        <Provider store={store}>
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        </Provider>
    );
    const element = screen.getByTestId('login-form');
    expect(element).toMatchSnapshot();
});

test('ui to be rendered with errors', () => {
    render(
        <Provider store={store}>
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        </Provider>
    );
    const button = screen.getByTestId('login-submit');
    fireEvent.click(button);
    const element = screen.getByTestId('login-form');
    expect(element).toMatchSnapshot();
});