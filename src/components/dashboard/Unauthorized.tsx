import {Button, Result} from "antd";
import Link from "next/link";

function Unauthorized() {
    return (
        <div className="flex flex-col w-full h-full">
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                extra={
                    <Link href={"/dashboard/posts"}>
                        <Button type="primary">Back Home</Button>
                    </Link>
                }
            />
        </div>
    );
}

export default Unauthorized;
