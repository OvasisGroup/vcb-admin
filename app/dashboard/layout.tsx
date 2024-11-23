import MainLayout from "@/components/layouts/MainLayout"
import MainSidebar from "@/components/layouts/MainSidebar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section>
            <MainSidebar/>
            <MainLayout>
                {children}
            </MainLayout>
        </section>
    )
}