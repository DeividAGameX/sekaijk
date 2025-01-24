import {LoginForm} from "./components/LoginForm";

type Props = {
    params: {["key"]: string};
    searchParams: {callbackUrl: string};
};

function Auth(props: Props) {
    return (
        <div className="bg-JK bg-center">
            <div className="w-full h-screen flex justify-center items-center bg-primary-op">
                <LoginForm callback={props.searchParams.callbackUrl} />
            </div>
        </div>
    );
}

export default Auth;
