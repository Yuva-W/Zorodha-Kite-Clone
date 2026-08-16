import React from "react";
import {render,screen} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Hero from "../landing_page/home/Hero";

test('renders hero component', () => {
    render(<Hero />);
    expect(screen.getByText('Invest in everything')).toBeInTheDocument();
    expect(screen.getByText('Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Sign Up for free'})).toBeInTheDocument();
    expect(screen.getByAltText('Hero-Image')).toBeInTheDocument();
});