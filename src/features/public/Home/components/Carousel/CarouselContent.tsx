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
        <div className="max-w-[1600px] w-full mx-auto min-h-[620px] mt-16 relative overflow-hidden rounded-2xl">
            <div className="w-full h-full relative">{children}</div>
            <CarouselControl posts={posts} />
        </div>
    );
}

export default CarouselContent;
