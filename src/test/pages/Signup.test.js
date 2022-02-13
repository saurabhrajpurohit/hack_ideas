import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import SignUp from '../../pages/SignUp';
import store from '../../redux/store';

test('ui to be rendered correctly', () => {
    render(
        <Provider store={store}>
            <BrowserRouter>
                <SignUp />
            </BrowserRouter>
        </Provider>
    );
    const element = screen.getByTestId('signup-form');
    expect(element).toMatchSnapshot();
});

test('ui to be rendered with errors', () => {
    render(
        <Provider store={store}>
            <BrowserRouter>
                <SignUp />
            </BrowserRouter>
        </Provider>
    );
    const button = screen.getByTestId('signup-submit');
    fireEvent.click(button);
    const element = screen.getByTestId('signup-form');
    expect(element).toMatchSnapshot();
});
