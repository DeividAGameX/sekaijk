import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Separator} from "@/components/ui/separator";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Controller, SubmitHandler, useForm} from "react-hook-form";

interface InputType {
    order: string;
    search: string;
}

function SearchBar({
    count,
    apply,
}: {
    count: number;
    apply: (data: InputType) => void;
}) {
    const {
        register,
        control,
        handleSubmit,
        formState: {errors},
    } = useForm<InputType>();

    const onSubmit: SubmitHandler<InputType> = (data) => {
        if (errors) {
            console.log(errors);
        }
        apply(data);
    };

    return (
        <div className="w-full flex flex-col items-center gap-6 py-2 px-4 my-4 bg-neutral-900 rounded-lg md:flex-row">
            <div className="flex-1 flex items-center w-full gap-4">
                <Separator className="flex-1 md:max-w-5" />
                <h2 className="text-xl font-semibold">RESULTADOS: {count}</h2>
                <Separator className="flex-1" />
            </div>
            <form
                className="flex flex-col items-center gap-2 w-full md:w-auto md:flex-row"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Controller
                    name="order"
                    control={control}
                    defaultValue="createdAt:desc"
                    render={({field}) => (
                        <Select
                            value={field.value}
                            onValueChange={field.onChange}
                        >
                            <SelectTrigger className="w-full max-w-96">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="createdAt:desc">
                                    Ver mas nuevo
                                </SelectItem>
                                <SelectItem value="createdAt:asc">
                                    Ver mas antiguo
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
                <Input
                    className="w-full max-w-96"
                    placeholder="Buscar por titulo o descripción"
                    {...register("search")}
                />
                <Button className="max-w-96 w-full md:w-auto">
                    <FontAwesomeIcon icon={faSearch} /> Buscar
                </Button>
            </form>
        </div>
    );
}

export default SearchBar;
