import * as yup from "yup";

export const createPostScheme = yup.object().shape({
    title: yup.string().required("title"),
    description: yup
        .string()
        .required("description")
        .max(5000, "maxCharacters"),
});
