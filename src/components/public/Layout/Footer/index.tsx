import {
    faFacebook,
    faInstagram,
    faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import moment from "moment";
import Link from "next/link";

function Footer() {
    return (
        <footer className="bg-body">
            <div className="max-w-7xl w-full mx-auto py-10">
                <div className="grid grid-cols-1 md:grid-cols-3 border-neutral-700 border-b-2 p-3">
                    <div className="p-4">
                        <h1 className="text-5xl">SekAiJK</h1>
                        <p>
                            Videojuegos, anime y mas, asi que bienvenido, puedes
                            saber mas sobre nosotros{" "}
                            <Link
                                className="font-bold transition duration-150 hover:text-primary"
                                href={"/aboutUs"}
                            >
                                aquí
                            </Link>
                        </p>
                    </div>
                    <div className="p-4">
                        <h1 className="font-bold">Publicaciones recientes</h1>
                    </div>
                    <div className="p-4">
                        <h1 className="text-lg font-bold">Redes sociales</h1>
                        <div className="flex">
                            <a
                                key="fb"
                                href="https://www.facebook.com/sekaijkoficial/"
                                className="mx-1 rounded-md w-10 h-10 flex justify-center items-center text-3xl hover:bg-fb hover:scale-110 transition"
                                target="_blank"
                            >
                                <FontAwesomeIcon icon={faFacebook} />
                            </a>
                            <a
                                key="ig"
                                href="https://www.instagram.com/sekai.j.k/"
                                className="mx-1 rounded-md w-10 h-10 flex justify-center items-center text-3xl hover:bg-ig hover:scale-110 transition"
                                target="_blank"
                            >
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                            <a
                                key="tt"
                                href="https://www.tiktok.com/@sekaijk"
                                className="mx-1 rounded-md w-10 h-10 flex justify-center items-center text-3xl hover:bg-tt hover:scale-110 transition"
                                target="_blank"
                            >
                                <FontAwesomeIcon icon={faTiktok} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="p-2 text-sm text-neutral-500">
                    <p>
                        SekAiJK {moment().format("YYYY")}. Derechos reservados
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
