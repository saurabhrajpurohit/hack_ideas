import { fireEvent, render, screen } from '@testing-library/react';
import HackForm from '../../components/HackForm';

test('submit event is not to be called', () => {
    const handleSubmit = jest.fn()
    render(<HackForm tags={[]} handleSubmit={handleSubmit} />);
    const element = screen.getByTestId('hack-form-submit');
    fireEvent.click(element);
    expect(handleSubmit).toHaveBeenCalledTimes(0)
});

test('ui to be rendered correctly', () => {
    const handleSubmit = jest.fn()
    render(<HackForm tags={[]} handleSubmit={handleSubmit} />);
    const element = screen.getByTestId('hack-add-form');
    expect(element).toMatchSnapshot();
});

test('ui to be rendered with errors', () => {
    const handleSubmit = jest.fn()
    render(<HackForm tags={[]} handleSubmit={handleSubmit} />);
    const element = screen.getByTestId('hack-form-submit');
    fireEvent.click(element);
    const component = screen.getByTestId('hack-add-form');
    expect(component).toMatchSnapshot();
});
