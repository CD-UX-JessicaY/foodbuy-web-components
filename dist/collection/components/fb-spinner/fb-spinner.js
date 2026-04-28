import { h, Host } from "@stencil/core";
export class FbSpinner {
    constructor() {
        /** Size of the spinner */
        this.size = 'default';
        /** Accessible label announced to screen readers */
        this.label = 'Loading, please wait';
    }
    render() {
        return (h(Host, { key: '5ed8ba7f076972e995fdaabff30f8025fb1bb988' }, h("span", { key: 'd14e37e65b2cfcc3965b265cb1d901d3171fbf06', role: "status", "aria-label": this.label, class: { 'fb-spinner': true, [`size-${this.size}`]: true } }, h("svg", { key: 'b36a1bab6ad78e7e1360483bdf30723105acb0f5', "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", class: "spinner-svg" }, h("circle", { key: '8289d3db112dc7f667d8e12c393a3eb8c24f2b18', class: "track", cx: "12", cy: "12", r: "10", "stroke-width": "2.5" }), h("path", { key: '4e3f71473babdecb930c5f136d365a7f144ea905', class: "arc", d: "M12 2a10 10 0 0 1 10 10", "stroke-width": "2.5", "stroke-linecap": "round" })), h("span", { key: '24bfc287f77d2f200b94273f911b7e90543fb297', class: "visually-hidden" }, this.label))));
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
