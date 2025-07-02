import CarouselControl from "./CarouselControl";

interface CarouselContentProps {
    posts: {
        title: string;
        slug?: string | null;
        banner?: string | null;
        createdAt: Date;
        Categories: {
            name: string;
            slug: string;
        } | null;
    }[];
    children: React.ReactNode;
}

function CarouselContent({posts, children}: Readonly<CarouselContentProps>) {
    return (
        <div className="w-full h-screen relative overflow-hidden">
            <div className="w-full h-full relative">{children}</div>
            <CarouselControl posts={posts} />
        </div>
    );
}

export default CarouselContent;
