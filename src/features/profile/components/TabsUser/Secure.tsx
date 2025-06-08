import {useTranslations} from "next-intl";
import ChangePassword from "./SecureForm/ChangePasswordForm";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShield} from "@fortawesome/free-solid-svg-icons";
import {Separator} from "@/components/ui/separator";

function SecureTab() {
    const tSecure = useTranslations("profile");
    return (
        <>
            <div className="p-8 bg-neutral-950 rounded-2xl">
                <h2 className="text-2xl mb-2">
                    <FontAwesomeIcon icon={faShield} className="mr-2" />
                    {tSecure("changePasswordTitle")}
                </h2>
                <Separator />
                <div className="py-2">
                    <ChangePassword />
                </div>
            </div>
        </>
    );
}

export default SecureTab;
