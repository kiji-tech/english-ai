'use client';

import { ThemeProvider } from 'kiji-tech-ui-component';
import React from 'react';

const Providers = ({ children }: { children: React.ReactNode }) => {
    return <ThemeProvider theme={{ theme: 'theme1' }}>{children}</ThemeProvider>;
};

export default Providers;
