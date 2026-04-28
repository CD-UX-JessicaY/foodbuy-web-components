import { h, Host } from "@stencil/core";
export class FbSpinner {
    constructor() {
        /** Size of the spinner */
        this.size = 'default';
        /** Accessible label announced to screen readers */
        this.label = 'Loading, please wait';
    }
    render() {
        return (h(Host, { key: 'f7b81a6e7786ba712c69d4105deb5d80d892d843' }, h("span", { key: 'f5211020b990e4c84b08ab13d298379a6ef85832', role: "status", "aria-label": this.label, class: { 'fb-spinner': true, [`size-${this.size}`]: true } }, h("svg", { key: '52be63ba5b96b1d4bc9b5b9532d69752b3b3f308', "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", class: "spinner-svg" }, h("circle", { key: 'fad39a77e89f0f6873d19203bc27798b14396052', class: "track", cx: "12", cy: "12", r: "10", "stroke-width": "2.5" }), h("path", { key: 'c3698f366919189d55f0e3a418e8e46cd4a5afaf', class: "arc", d: "M12 2a10 10 0 0 1 10 10", "stroke-width": "2.5", "stroke-linecap": "round" })), h("span", { key: '8b7e57517f9fe470e4c85f1aaab8c02a633bf972', class: "visually-hidden" }, this.label))));
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
