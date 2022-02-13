import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Home from '../../pages/Home';
import store from '../../redux/store';

test('ui to be rendered correctly', () => {
    render(
        <Provider store={store}>
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        </Provider>
    );
    const element = screen.getByTestId('home-screen');
    expect(element).toMatchSnapshot();
});
