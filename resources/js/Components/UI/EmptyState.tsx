interface EmptyStateProps {
    title: string;
    description?: string;
}

export default function EmptyState({ title, description }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-sm font-medium text-navy-500">{title}</p>
            {description && <p className="mt-1 text-sm text-muted">{description}</p>}
        </div>
    );
}
