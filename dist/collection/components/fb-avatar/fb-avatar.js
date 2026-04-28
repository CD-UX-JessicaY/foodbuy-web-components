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
        return (h(Host, { key: '5dc6d20f9ef0cad0f27e5addbcc17ab6c5c38930' }, h("span", { key: 'bcb85fd9f2cd8b5b42bc5b2d3d3360cc7f5913ac', class: classes }, content, this.status !== 'none' && (h("span", { key: '018641dc7053f0a5f501b686875fef1be2a9ac34', class: `fb-avatar__status fb-avatar__status--${this.status}`, "aria-label": this.getStatusLabel(), role: "img" })))));
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
