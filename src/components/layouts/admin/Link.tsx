import useLinkEvent from "@/hooks/useLinkEvent";
import {Modal} from "antd";
import LinkNext, {LinkProps} from "next/link";
import {useRouter} from "next/navigation";

function Link({
    children,
    ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps &
    Readonly<{
        children: React.ReactNode;
    }>) {
    const [message, context] = Modal.useModal();
    const {onClick, ...args} = props;
    const {state} = useLinkEvent();
    const navigate = useRouter();

    const handleClick = async (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (state.isPrevent) {
            event.preventDefault();
            let result = false;
            let icon:
                | "info"
                | "success"
                | "error"
                | "warn"
                | "warning"
                | "confirm" = "confirm";
            switch (state.type) {
                case "WARNING":
                    icon = "warning";
                    break;
                case "ERROR":
                    icon = "error";
                    break;
                case "SUCCESS":
                    icon = "success";
                    break;
                default:
                    break;
            }
            result = await message.confirm({
                title: state.title,
                type: icon,
                content: state.description,
                okText: state.okText,
                cancelText: state.cancelText,
                onCancel: () => {},
            });
            if (!result) {
                console.log("Link click cancelled");
                navigate.push(props.href as string);
            }
            // event.stopPropagation();
            // console.log("Prevented link click");
        } else {
            if (onClick) {
                onClick(event);
            }
        }
    };
    return (
        <>
            {context}
            <LinkNext {...args} onClick={handleClick}>
                {children}
            </LinkNext>
        </>
    );
}

export default Link;
