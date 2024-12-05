import React from 'react';
import Title from '../atoms/Title';
import Subtitle from '../atoms/Subtitle';

interface TitleSectionProps {
    title: string;
    subtitle?: string;
    titleColor?: string;
    className?: string;
}

const TitleSection: React.FC<TitleSectionProps> = ({
    title,
    subtitle,
    titleColor,
    className = '',
}) => {
    return (
        <div className={`px-2 pb-2 mb-4 border-b border-gray-300 ${className}`}>
            <Title color={titleColor}>{title}</Title>
            {subtitle && <Subtitle>{subtitle}</Subtitle>}
        </div>
    );
};

export default TitleSection;
