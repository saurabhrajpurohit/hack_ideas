import { fireEvent, render, screen } from '@testing-library/react';
import Hack from '../../components/Hack';

const hackathon = {
    id: "test_id",
    Votes: [1001],
    Title: "Test Title",
    Tags: ["Front-End"],
    EventDate: {toDate: () => 1646006400000},
    Description: "Test Description"
}

test('click event is to be called', () => {
    const handleClick = jest.fn()
    render(<Hack hackathon={hackathon} handleClick={handleClick} />);
    const element = screen.getByTestId('upvote-element');
    fireEvent.click(element);
    expect(handleClick).toHaveBeenCalledTimes(1)
});

test('ui to be rendered correctly', () => {
    const handleClick = jest.fn()
    render(<Hack hackathon={hackathon} handleClick={handleClick} />);
    const element = screen.getByTestId('test_id');
    expect(element).toMatchSnapshot();
});
