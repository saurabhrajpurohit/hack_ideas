import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Page404 from '../../pages/Page404';

test('ui to be rendered correctly', () => {
    render(
        <BrowserRouter>
            <Page404 />
        </BrowserRouter>
    );
    const element = screen.getByTestId('page-404');
    expect(element).toMatchSnapshot();
});
