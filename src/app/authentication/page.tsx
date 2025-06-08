import {LoginForm} from "@/features/auth/components/LoginForm";

type Props = {
    params: {["key"]: string};
    searchParams: {callbackUrl: string};
};

function Auth(props: Props) {
    return (
        <div className="bg-[url(/assets/FondoPortada.jpg)] bg-center">
            <div className="w-full h-screen flex justify-center items-center bg-neutral-900/70">
                <LoginForm callback={props.searchParams.callbackUrl} />
            </div>
        </div>
    );
}

export default Auth;
