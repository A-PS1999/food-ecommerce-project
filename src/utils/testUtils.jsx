import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AuthContextProvider from './AuthContextProvider';
import ModalContextProvider from './ModalContextProvider';

const customRender = (ui, options) =>
    render(
        ui, {
            wrapper: ({ children }) => {
                <AuthContextProvider>
                    <ModalContextProvider>
                        <MemoryRouter>
                            {children}
                        </MemoryRouter>
                    </ModalContextProvider>
                </AuthContextProvider>
            },
            ...options
        }
    )

export * from '@testing-library/react';
export { customRender as render };
