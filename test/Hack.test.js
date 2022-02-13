import { fireEvent, render, screen } from '@testing-library/react';
// import Hack from '../src/components/Hack';

const Hack = () => {
    return ""
}

const hackathon = {
    id: "test_id",
    CreationDate: {nanoseconds: 416000000, seconds: 1644680715},
    Votes: [1001],
    Title: "Test Title",
    Tags: ["Front-End"],
    EventDate: {nanoseconds: 0, seconds: 1646006400},
    Description: "Test Description"
}

test('click event is to be called', () => {
    const handleClick = jest.fn()
    render(<Hack hackathon={hackathon} handleClick={handleClick} />);
    const element = screen.getByTestId('upvote-element');
    fireEvent.click(element);
    expect(handleClick).toHaveBeenCalledTimes(1)
});
