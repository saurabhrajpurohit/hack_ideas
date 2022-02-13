import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import AddHack from '../../pages/AddHack';
import store from '../../redux/store';

test('ui to be rendered correctly', () => {
    render(
        <Provider store={store}>
            <BrowserRouter>
                <AddHack />
            </BrowserRouter>
        </Provider>
    );
    const element = screen.getByTestId('add-hack-page');
    expect(element).toMatchSnapshot();
});
