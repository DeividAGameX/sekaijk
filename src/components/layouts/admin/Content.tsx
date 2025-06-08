function DashboardContent({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section className="flex-1 w-full p-2 transition duration-150">
            <div className="w-full min-h-full rounded-3xl bg-neutral-900">
                {children}
            </div>
        </section>
    );
}

export default DashboardContent;
