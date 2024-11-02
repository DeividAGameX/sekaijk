import {Button, Result} from "antd";
import Link from "next/link";

function NotAllowed() {
    return (
        <Result
            status="403"
            title="403"
            subTitle=""
            extra={
                <Link href={"/dashboard"}>
                    <Button type="primary">Back Home</Button>
                </Link>
            }
        />
    );
}

export default NotAllowed;
