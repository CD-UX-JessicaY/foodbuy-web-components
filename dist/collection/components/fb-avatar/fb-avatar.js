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
        return (h(Host, { key: '83acdef33deb57e218c2678dfd1342e34e0606d5' }, h("span", { key: '3977b42e1705915625fd999f86895f86c84d0579', class: classes }, content, this.status !== 'none' && (h("span", { key: '0a703e639732ded0bc7e30483dd93b32da585f40', class: `fb-avatar__status fb-avatar__status--${this.status}`, "aria-label": this.getStatusLabel(), role: "img" })))));
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
