import { h } from "@stencil/core";
const ERROR_ICON = (h("svg", { "aria-hidden": "true", class: "helper-icon", width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("circle", { cx: "12", cy: "12", r: "10" }), h("line", { x1: "12", y1: "8", x2: "12", y2: "12" }), h("line", { x1: "12", y1: "16", x2: "12.01", y2: "16" })));
/** Renders the field label with optional required asterisk */
export function renderFieldLabel(label, required, inputId, labelId) {
    if (!label)
        return null;
    return (h("label", { htmlFor: inputId, id: labelId, class: "fb-label" }, label, required && h("span", { class: "required-indicator", "aria-hidden": "true" }, " *")));
}
/** Renders helper / error text below a form control */
export function renderHelperText(helperText, helperId, isError) {
    if (!helperText)
        return null;
    return (h("div", { id: helperId, class: { 'fb-helper': true, 'fb-helper--error': isError }, role: isError ? 'alert' : undefined }, isError && ERROR_ICON, helperText));
}
