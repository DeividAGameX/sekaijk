import {LoginForm} from "@/features/auth/components/LoginForm";

type Props = {
    searchParams: Promise<{callbackUrl: string}>;
};

async function Auth(props: Props) {
    const {callbackUrl} = await props.searchParams;
    return (
        <div className="bg-[url(/assets/FondoPortada.jpg)] bg-center">
            <div className="w-full h-screen flex justify-center items-center bg-neutral-900/70">
                <LoginForm callback={callbackUrl} />
            </div>
        </div>
    );
}

export default Auth;
