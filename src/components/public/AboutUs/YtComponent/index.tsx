import {faYoutube} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button} from "antd";
import Image from "next/image";

function YtComponent() {
    return (
        <div className="w-full p-10">
            <div className="max-w-7xl w-full mx-auto">
                <div className="flex items-center flex-col gap-3">
                    <Image
                        src={"/assets/Perfil.jpg"}
                        alt={"Foto de perfil"}
                        className="w-80 h-80 rounded-full"
                        width={1080}
                        height={1080}
                    />
                    <h2 className="text-6xl font-bold text-[--primary]">
                        SekAiJK
                    </h2>
                    <Button
                        type="primary"
                        icon={<FontAwesomeIcon icon={faYoutube} />}
                        href="https://www.youtube.com/@sekaijk"
                    >
                        Suscríbete
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default YtComponent;
