import { h, Host } from "@stencil/core";
export class FbAvatar {
    constructor() {
        this.src = '';
        this.alt = '';
        this.initials = '';
        this.size = 'default';
        this.shape = 'circle';
        this.status = 'none';
    }
    getStatusLabel() {
        var _a;
        const map = { online: 'Online', offline: 'Offline', busy: 'Busy' };
        return (_a = map[this.status]) !== null && _a !== void 0 ? _a : '';
    }
    render() {
        const classes = {
            'fb-avatar': true,
            [`fb-avatar--${this.size}`]: true,
            [`fb-avatar--${this.shape}`]: true,
        };
        const content = this.src
            ? h("img", { src: this.src, alt: this.alt, class: "fb-avatar__img" })
            : (h("span", { role: "img", "aria-label": this.alt || this.initials || 'Avatar', class: "fb-avatar__initials" }, this.initials));
        return (h(Host, { key: '8a47b60ace5e2558f5df50afd725485c13f0c7cc' }, h("span", { key: 'ef80a8d4d2351dc32f7c1b3f344fff8037db37ab', class: classes }, content, this.status !== 'none' && (h("span", { key: 'bee77714251bf6230e3b1bf9dc506f3b785c552d', class: `fb-avatar__status fb-avatar__status--${this.status}`, "aria-label": this.getStatusLabel(), role: "img" })))));
    }
    static get is() { return "fb-avatar"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["fb-avatar.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["fb-avatar.css"]
        };
    }
    static get properties() {
        return {
            "src": {
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
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "src",
                "defaultValue": "''"
            },
            "alt": {
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
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "alt",
                "defaultValue": "''"
            },
            "initials": {
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
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "initials",
                "defaultValue": "''"
            },
            "size": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'xs' | 'sm' | 'default' | 'lg' | 'xl'",
                    "resolved": "\"default\" | \"lg\" | \"sm\" | \"xl\" | \"xs\"",
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
                "attribute": "size",
                "defaultValue": "'default'"
            },
            "shape": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'circle' | 'square'",
                    "resolved": "\"circle\" | \"square\"",
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
                "attribute": "shape",
                "defaultValue": "'circle'"
            },
            "status": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'none' | 'online' | 'offline' | 'busy'",
                    "resolved": "\"busy\" | \"none\" | \"offline\" | \"online\"",
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
                "attribute": "status",
                "defaultValue": "'none'"
            }
        };
    }
}
