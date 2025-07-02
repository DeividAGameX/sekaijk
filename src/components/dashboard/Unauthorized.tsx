import {Button, Result} from "antd";
import Image from "next/image";
import Link from "next/link";

function Unauthorized() {
    return (
        <div className="flex flex-col w-full h-full">
            <Result
                title="Not Allowed"
                icon={
                    <div className="w-full flex justify-center items-center">
                        <Image
                            src="/assets/hikari/hikari-not-allowed.png"
                            alt="404 Not Found"
                            layout="intrinsic"
                            className="w-[420px] object-cover rounded-full bg-neutral-950"
                            width={720}
                            height={720}
                        />
                    </div>
                }
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
