import React, { PropsWithChildren } from 'react';
import { MemoryRouter } from 'react-router-dom';

export const mockNavigate = jest.fn();

const MockRouter: React.FC<PropsWithChildren> = ({ children }) => (
  <MemoryRouter>
    {React.cloneElement(children as React.ReactElement, {
      navigate: mockNavigate,
    })}
  </MemoryRouter>
);

export default MockRouter;
