import { h, Host } from "@stencil/core";
export class FbSpinner {
    constructor() {
        /** Size of the spinner */
        this.size = 'default';
        /** Accessible label announced to screen readers */
        this.label = 'Loading, please wait';
    }
    render() {
        return (h(Host, { key: '82406bca363db2a0d15837aef618bd3da581ea1f' }, h("span", { key: '0b27cb8ffe3e22f95ea519d96fcf3c85812c87b5', role: "status", "aria-label": this.label, class: { 'fb-spinner': true, [`size-${this.size}`]: true } }, h("svg", { key: '2439875da5a014ee63fcde783deb310d08827c1d', "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", class: "spinner-svg" }, h("circle", { key: 'd6ea3f7040060e54e0744ab31daa06902fb71f20', class: "track", cx: "12", cy: "12", r: "10", "stroke-width": "2.5" }), h("path", { key: '65c1d1d882cc9c76ee5c8bc157201ff3d5f044d8', class: "arc", d: "M12 2a10 10 0 0 1 10 10", "stroke-width": "2.5", "stroke-linecap": "round" })), h("span", { key: '33758a9667b49bfb4da326a18694fa227d89a984', class: "visually-hidden" }, this.label))));
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
