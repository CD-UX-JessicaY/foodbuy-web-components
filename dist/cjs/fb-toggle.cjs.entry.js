'use strict';

var index = require('./index-CGtW1orf.js');

const fbToggleCss = () => `:host{display:inline-flex}.fb-toggle{display:inline-flex;align-items:center;justify-content:center;gap:var(--spacing-8);font-family:var(--font-family-primary);font-weight:var(--font-weight-medium);border-radius:var(--fb-toggle-radius, var(--radius-sm));cursor:pointer;transition:background 0.15s, color 0.15s, border-color 0.15s;user-select:none;flex-shrink:0;border:none;outline:none;box-sizing:border-box}.fb-toggle:focus-visible{outline:var(--focus-width) solid var(--focus-color);outline-offset:var(--focus-offset)}.size-sm{height:32px;padding:0 var(--spacing-8);font-size:var(--font-size-12)}.size-default{height:40px;padding:0 var(--spacing-12);font-size:var(--font-size-14)}.size-lg{height:48px;padding:0 var(--spacing-16);font-size:var(--font-size-16)}.variant-default{background:transparent;color:var(--color-neutral-600)}.variant-default:hover:not(.disabled){background:var(--color-neutral-100)}.variant-default.pressed{background:var(--color-primary-100);color:var(--color-primary-600)}.variant-outline{background:var(--color-neutral-white);color:var(--color-neutral-600);border:1px solid var(--color-neutral-300)}.variant-outline:hover:not(.disabled){background:var(--color-neutral-50)}.variant-outline.pressed{background:var(--color-primary-50);color:var(--color-primary-600);border-color:var(--color-primary-400)}.disabled{opacity:0.5;cursor:not-allowed;pointer-events:none}`;

const FbToggle = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.fbPressedChange = index.createEvent(this, "fbPressedChange");
        this.variant = 'default';
        this.size = 'default';
        this.pressed = false;
        this.disabled = false;
        this.handleClick = () => {
            if (this.disabled)
                return;
            this.pressed = !this.pressed;
            this.fbPressedChange.emit(this.pressed);
        };
    }
    render() {
        return (index.h(index.Host, { key: '2c2fc466f5bc90a2c2271d281e4e062c64e80a83' }, index.h("button", { key: '29594481a1d493136eee02d057451bad61c4b89b', type: "button", class: {
                'fb-toggle': true,
                [`variant-${this.variant}`]: true,
                [`size-${this.size}`]: true,
                'pressed': this.pressed,
                'disabled': this.disabled,
            }, "aria-pressed": String(this.pressed), "aria-label": this.label || null, disabled: this.disabled, onClick: this.handleClick }, index.h("slot", { key: 'c431c273a3473a9c3616a2c4b5c1a25d8a7f357d' }))));
    }
};
FbToggle.style = fbToggleCss();

exports.fb_toggle = FbToggle;
