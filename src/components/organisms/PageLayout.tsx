import React, { ReactNode } from 'react';
import Container from '../atoms/Container';
import AuthGuard from '../pages/AuthGuard';

interface PageLayoutProps {
    children: ReactNode;
    requireAuth?: boolean;
    className?: string;
}

const PageLayout = ({
    children,
    requireAuth = false,
    className = '',
}: PageLayoutProps) => {
    const content = (
        <Container className={`h-full ${className}`}>
            {children}
        </Container>
    );

    if (requireAuth) {
        return <AuthGuard>{content}</AuthGuard>;
    }

    return content;
};

export default PageLayout;
