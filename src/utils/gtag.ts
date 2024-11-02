export const ID_GOOGLE = process.env.NEXT_PUBLIC_MEASUREMENT_ID;

export const pageView = (url: string) => {
    if (typeof window !== "undefined") {
        (window as any).gtag("config", ID_GOOGLE, {
            page_location: url,
        });
    }
};

export const event = ({
    action,
    category,
    label,
    value,
}: {
    action: string;
    category: string;
    label: string;
    value: string;
}) => {
    if (typeof window !== "undefined") {
        (window as any).gtag("event", action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
};
