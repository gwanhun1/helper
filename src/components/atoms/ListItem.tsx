import { ReactNode } from 'react';

type ListItemProps = {
    children: ReactNode;
};

const ListItem = ({ children }: ListItemProps) => {
    return (
        <div className="bg-white rounded-lg mt-2 w-full shadow-lg">
            {children}
        </div>
    );
};

export default ListItem;
