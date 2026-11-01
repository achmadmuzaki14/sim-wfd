import { ReactNode } from 'react';

interface FilterOption {
    value: string;
    label: string;
}

interface FilterBarProps {
    search?: {
        value: string;
        placeholder: string;
    };
    selects?: Array<{
        name: string;
        value: string;
        placeholder: string;
        options: FilterOption[];
    }>;
    children?: ReactNode;
    actionLabel?: string;
    actionHref?: string;
}

export default function FilterBar({ search, selects, children, actionLabel, actionHref }: FilterBarProps) {
    return (
        <div className="flex flex-col gap-3 rounded-card border border-border bg-card p-4 sm:flex-row sm:items-center sm:flex-wrap">
            {search && (
                <input
                    type="text"
                    defaultValue={search.value}
                    name="search"
                    placeholder={search.placeholder}
                    className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400 sm:w-64"
                />
            )}
            {selects?.map((sel) => (
                <select
                    key={sel.name}
                    name={sel.name}
                    defaultValue={sel.value}
                    className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400 sm:w-auto"
                >
                    <option value="">{sel.placeholder}</option>
                    {sel.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            ))}
            {children}
            <button
                type="submit"
                className="rounded-lg bg-navy-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-navy-600"
            >
                Filter
            </button>
            {actionLabel && actionHref && (
                <a
                    href={actionHref}
                    className="ml-auto rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-600"
                >
                    {actionLabel}
                </a>
            )}
        </div>
    );
}
