import Image from "next/image";
import Link from "next/link";

function notFound() {
    return (
        <div className="container mt-16 w-full max-h-[520px] h-[520px] min-h-[520px] flex flex-col justify-center items-center">
            <Image
                src="/assets/hikari/hikari-404.png"
                alt="404 Not Found"
                layout="intrinsic"
                className="w-[420px] object-cover"
                width={720}
                height={720}
            />
            <div className="text-center w-full">
                <h1 className="text-4xl font-bold font-lato">
                    Página no encontrada
                </h1>
                <p className="my-3">
                    Lo sentimos, pero la página que buscabas no existe.
                </p>
                <Link
                    href="/"
                    className="text-xl font-bold text-primary-500 hover:text-primary-600"
                >
                    Volver al inicio
                </Link>
            </div>
        </div>
    );
}

export default notFound;
