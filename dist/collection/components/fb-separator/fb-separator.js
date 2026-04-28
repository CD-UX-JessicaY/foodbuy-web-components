import { h, Host } from "@stencil/core";
export class FbSeparator {
    constructor() {
        this.orientation = 'horizontal';
        /** Provide a label to make this separator a section divider with a title. */
        this.label = '';
        /** When true the separator is purely decorative and hidden from AT. */
        this.decorative = true;
    }
    render() {
        if (this.label) {
            return (h(Host, null, h("div", { role: "separator", "aria-label": this.label, class: `fb-separator fb-separator--${this.orientation} fb-separator--labeled` }, h("span", { class: "fb-separator__label" }, this.label))));
        }
        return (h(Host, null, h("hr", { class: `fb-separator fb-separator--${this.orientation}`, "aria-hidden": this.decorative ? 'true' : null, role: this.decorative ? null : 'separator' })));
    }
    static get is() { return "fb-separator"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["fb-separator.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["fb-separator.css"]
        };
    }
    static get properties() {
        return {
            "orientation": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'horizontal' | 'vertical'",
                    "resolved": "\"horizontal\" | \"vertical\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "orientation",
                "defaultValue": "'horizontal'"
            },
            "label": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Provide a label to make this separator a section divider with a title."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "label",
                "defaultValue": "''"
            },
            "decorative": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "When true the separator is purely decorative and hidden from AT."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "decorative",
                "defaultValue": "true"
            }
        };
    }
}
