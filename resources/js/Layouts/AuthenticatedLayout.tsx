import { ReactNode } from 'react';
import AppSidebar from '@/Components/Layout/AppSidebar';
import AppTopbar from '@/Components/Layout/AppTopbar';

interface AuthenticatedLayoutProps {
    children: ReactNode;
    header?: ReactNode;
}

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
    return (
        <div className="min-h-screen bg-appbg">
            <AppSidebar />
            <div className="lg:pl-sidebar">
                <AppTopbar />
                <main className="p-4 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
