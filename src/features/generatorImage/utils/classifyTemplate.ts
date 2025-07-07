import React from "react";
import Template1 from "../components/Template/Template1";
import Template2 from "../components/Template/Template2";
import Template3 from "../components/Template/Template3";
import {ImageProp, TemplateType} from "../types/ImageProps";

export default function classifyTemplate(
    template: TemplateType = "template1",
    params: ImageProp
) {
    switch (template) {
        case "template1":
            return React.createElement(Template1, params);
        case "template2":
            return React.createElement(Template2, params);
        case "template3":
            return React.createElement(Template3, params);
        // case "TEMPLATE2":
        //     return Template2({title, subTitle, render, banner});
        default:
            return React.createElement(Template1, params);
    }
}
