export type MenuItemType = {
    key: string | number | any;
    name: string;
    type: "LINK" | "BUTTON";
    href?: string;
    onClick?: (event: any) => void;
    icon?: React.ReactNode;
};
