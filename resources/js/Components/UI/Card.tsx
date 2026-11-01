import { ReactNode } from 'react';

interface CardProps {
    title?: string;
    children: ReactNode;
    actions?: ReactNode;
    className?: string;
}

export default function Card({ title, children, actions, className = '' }: CardProps) {
    return (
        <div className={`rounded-card border border-border bg-card shadow-sm ${className}`}>
            {title && (
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                    <h3 className="text-sm font-semibold text-navy-500">{title}</h3>
                    {actions}
                </div>
            )}
            {children}
        </div>
    );
}
