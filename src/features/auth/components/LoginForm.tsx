"use client";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faLock} from "@fortawesome/free-solid-svg-icons";
import {useTranslations} from "next-intl";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {LoginSchema, loginSchema} from "@/features/auth/schema/login.schema";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";

export function LoginForm({callback}: {callback: string}) {
    const t = useTranslations("auth.form");
    const tErrors = useTranslations("errors");
    const {control, handleSubmit} = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });
    const router = useRouter();

    const onFinish = (event: LoginSchema) => {
        console.log(event);
        signIn("credentials", {...event, redirect: false}).then((e) => {
            if (!e?.ok) {
                toast.error(tErrors(e?.error ?? ""));
                return;
            }
            if (callback) {
                router.replace(callback);
            }
        });
    };
    return (
        <div className="p-5 w-full sm:p-10 sm:w-9/12 md:w-6/12 md:bg-body md:rounded-xl lg:w-80">
            <form onSubmit={handleSubmit(onFinish)} onError={console.log}>
                <div className="w-full text-8xl text-center">
                    <i className="icon-ajk hover:text-primary transition duration-200"></i>
                </div>
                <Controller
                    name="username"
                    control={control}
                    render={({field}) => (
                        <div className="my-1">
                            <label htmlFor="username" className="ml-2">
                                {t("username")}
                            </label>
                            <div className="flex items-center gap-4 border rounded py-1 px-2 has-focus-within:border-neutral-600 hover:border-neutral-700 transition duration-200">
                                <FontAwesomeIcon icon={faUser} />
                                <input
                                    data-slot="input"
                                    id="username"
                                    className="placeholder:text-gray-500 focus:outline-none w-full default:bg-yellow-200"
                                    {...field}
                                />
                            </div>
                        </div>
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    render={({field}) => (
                        <div className="my-1">
                            <label htmlFor="password" className="ml-2">
                                {t("password")}
                            </label>
                            <div className="flex items-center gap-4 border rounded py-1 px-2 has-focus-within:border-neutral-600 hover:border-neutral-700 transition duration-200">
                                <FontAwesomeIcon icon={faLock} />
                                <input
                                    type="password"
                                    data-slot="input"
                                    id="password"
                                    className="peer bg-transparent placeholder:text-gray-500 focus:outline-none w-full"
                                    {...field}
                                />
                            </div>
                        </div>
                    )}
                />
                <Button type="submit" className="w-full my-2">
                    Iniciar sesión
                </Button>
            </form>
        </div>
    );
}
