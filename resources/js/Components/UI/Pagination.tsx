import { Link } from '@inertiajs/react';
import { PaginatedData } from '@/types/page-props';

interface PaginationProps<T> {
    data?: PaginatedData<T> | null;
    pageName?: string;
}

export default function Pagination<T>({
    data,
}: PaginationProps<T>) {
    if (!data || data.last_page <= 1) {
        return null;
    }

    return (
        <div className="mt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
            <div className="text-sm text-gray-600">
                Menampilkan {data.from ?? 0}–{data.to ?? 0} dari{' '}
                {data.total} data
            </div>

            <div className="flex items-center gap-2">
                {data.prev_page_url ? (
                    <Link
                        href={data.prev_page_url}
                        preserveScroll
                        preserveState
                        className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
                    >
                        Sebelumnya
                    </Link>
                ) : (
                    <span className="cursor-not-allowed rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-400">
                        Sebelumnya
                    </span>
                )}

                <span className="px-2 text-sm text-gray-600">
                    Hal. {data.current_page} / {data.last_page}
                </span>

                {data.next_page_url ? (
                    <Link
                        href={data.next_page_url}
                        preserveScroll
                        preserveState
                        className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
                    >
                        Berikutnya
                    </Link>
                ) : (
                    <span className="cursor-not-allowed rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-400">
                        Berikutnya
                    </span>
                )}
            </div>
        </div>
    );
}
