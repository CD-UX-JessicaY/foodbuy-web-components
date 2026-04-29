import { h, Host } from "@stencil/core";
export class FbSpinner {
    constructor() {
        /** Size of the spinner */
        this.size = 'default';
        /** Accessible label announced to screen readers */
        this.label = 'Loading, please wait';
    }
    render() {
        return (h(Host, { key: '9651a8c17ef4fa4fb615c5f9b92e5a22cc2118d6' }, h("span", { key: '417c95ba1acb54da1dcf9ac64f4cc6881c409386', role: "status", "aria-label": this.label, class: { 'fb-spinner': true, [`size-${this.size}`]: true } }, h("svg", { key: '74051d76be7c1913a93115fc1d50c1c9d90e2140', "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", class: "spinner-svg" }, h("circle", { key: '5d85bf9351a5818b6ce5ddb0a76b3f1e7da8ce7f', class: "track", cx: "12", cy: "12", r: "10", "stroke-width": "2.5" }), h("path", { key: '704033688558476f78034933aef8aacc871d824b', class: "arc", d: "M12 2a10 10 0 0 1 10 10", "stroke-width": "2.5", "stroke-linecap": "round" })), h("span", { key: '2b2a77a99be9f7de2df583f8cf3edb4dc5b125c6', class: "visually-hidden" }, this.label))));
    }
    static get is() { return "fb-spinner"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["fb-spinner.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["fb-spinner.css"]
        };
    }
    static get properties() {
        return {
            "size": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "SpinnerSize",
                    "resolved": "\"default\" | \"lg\" | \"sm\"",
                    "references": {
                        "SpinnerSize": {
                            "location": "local",
                            "path": "/Users/jessica.yiu/Foodbuy Web Components/src/components/fb-spinner/fb-spinner.tsx",
                            "id": "src/components/fb-spinner/fb-spinner.tsx::SpinnerSize"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Size of the spinner"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "size",
                "defaultValue": "'default'"
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
                    "text": "Accessible label announced to screen readers"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "label",
                "defaultValue": "'Loading, please wait'"
            }
        };
    }
}
