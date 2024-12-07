import React from 'react';
import Container from '../atoms/Container';
import AuthGuard from '../pages/AuthGuard';

interface PageLayoutProps {
    children: React.ReactNode;
    requireAuth?: boolean;
    className?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({
    children,
    requireAuth = false,
    className = '',
}) => {
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
