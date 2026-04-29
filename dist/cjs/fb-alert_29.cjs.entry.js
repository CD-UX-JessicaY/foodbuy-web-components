'use strict';

var index = require('./index-DHbX5Dio.js');
var fieldHelpers = require('./field-helpers-cP-u8_x1.js');

const fbAlertCss = () => `:host{display:block}.fb-alert{display:flex;align-items:flex-start;gap:var(--spacing-12);padding:14px var(--spacing-16);border-radius:var(--radius-sm);border:1px solid transparent;font-family:var(--font-family-primary)}.variant-info{background:var(--color-primary-50);border-color:var(--color-primary-200);color:var(--color-primary-700)}.variant-success{background:var(--color-success-50);border-color:var(--color-success-200);color:var(--color-success-700)}.variant-warning{background:var(--color-warning-50);border-color:var(--color-warning-200);color:var(--color-warning-700)}.variant-danger{background:var(--color-danger-50);border-color:var(--color-danger-200);color:var(--color-danger-700)}.alert-icon{display:flex;flex-shrink:0;margin-top:1px}.alert-content{flex:1;display:flex;flex-direction:column;gap:var(--spacing-4)}.alert-title{margin:0;font-size:var(--font-size-14);font-weight:var(--font-weight-semibold)}.alert-description{margin:0;font-size:var(--font-size-14);opacity:0.85}.dismiss-btn{background:none;border:none;cursor:pointer;color:inherit;opacity:0.7;display:flex;align-items:center;padding:2px;border-radius:var(--radius-xs);flex-shrink:0}.dismiss-btn:hover{opacity:1}.dismiss-btn:focus-visible{outline:var(--focus-width) solid currentColor;outline-offset:var(--focus-offset)}`;

const FbAlert = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.fbDismiss = index.createEvent(this, "fbDismiss");
        this.variant = 'info';
        this.heading = '';
        this.description = '';
        this.dismissible = false;
        this.dismissed = false;
        this.handleDismiss = () => {
            this.dismissed = true;
            this.fbDismiss.emit();
        };
    }
    render() {
        if (this.dismissed)
            return null;
        return (index.h(index.Host, null, index.h("div", { role: this.variant === 'danger' || this.variant === 'warning' ? 'alert' : 'status', class: { 'fb-alert': true, [`variant-${this.variant}`]: true } }, index.h("span", { class: "alert-icon", "aria-hidden": "true" }, this.variant === 'info' && index.h("svg", { width: "18", height: "18", viewBox: "0 0 18 18", fill: "none" }, index.h("circle", { cx: "9", cy: "9", r: "8", stroke: "currentColor", "stroke-width": "1.5" }), index.h("path", { d: "M9 8v5", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" }), index.h("circle", { cx: "9", cy: "5.5", r: ".75", fill: "currentColor" })), this.variant === 'success' && index.h("svg", { width: "18", height: "18", viewBox: "0 0 18 18", fill: "none" }, index.h("circle", { cx: "9", cy: "9", r: "8", stroke: "currentColor", "stroke-width": "1.5" }), index.h("path", { d: "M5.5 9l2.5 2.5 4.5-5", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" })), this.variant === 'warning' && index.h("svg", { width: "18", height: "18", viewBox: "0 0 18 18", fill: "none" }, index.h("path", { d: "M9 2L16.5 15H1.5L9 2Z", stroke: "currentColor", "stroke-width": "1.5", "stroke-linejoin": "round" }), index.h("path", { d: "M9 7v4", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" }), index.h("circle", { cx: "9", cy: "12.5", r: ".75", fill: "currentColor" })), this.variant === 'danger' && index.h("svg", { width: "18", height: "18", viewBox: "0 0 18 18", fill: "none" }, index.h("circle", { cx: "9", cy: "9", r: "8", stroke: "currentColor", "stroke-width": "1.5" }), index.h("path", { d: "M6 6l6 6M12 6l-6 6", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" }))), index.h("div", { class: "alert-content" }, this.heading && index.h("p", { class: "alert-title" }, this.heading), this.description && index.h("p", { class: "alert-description" }, this.description), index.h("slot", null)), this.dismissible && (index.h("button", { type: "button", class: "dismiss-btn", "aria-label": "Dismiss alert", onClick: this.handleDismiss }, index.h("svg", { "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 16 16", fill: "none" }, index.h("path", { d: "M4 4l8 8M12 4l-8 8", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" })))))));
    }
};
FbAlert.style = fbAlertCss();

const fbAvatarCss = () => `:host{display:inline-flex}.fb-avatar{position:relative;display:inline-flex;align-items:center;justify-content:center;background:var(--color-primary-100);color:var(--color-primary-700);font-family:var(--font-family-primary);font-weight:var(--font-weight-semibold);overflow:hidden;flex-shrink:0}.fb-avatar--xs{width:24px;height:24px;font-size:var(--font-size-10)}.fb-avatar--sm{width:32px;height:32px;font-size:var(--font-size-12)}.fb-avatar--default{width:40px;height:40px;font-size:var(--font-size-14)}.fb-avatar--lg{width:48px;height:48px;font-size:var(--font-size-16)}.fb-avatar--xl{width:64px;height:64px;font-size:var(--font-size-20)}.fb-avatar--circle{border-radius:50%}.fb-avatar--square{border-radius:var(--radius-sm)}.fb-avatar__img{width:100%;height:100%;object-fit:cover}.fb-avatar__initials{line-height:1;text-transform:uppercase;user-select:none}.fb-avatar__status{position:absolute;bottom:0;right:0;width:25%;height:25%;min-width:8px;min-height:8px;border-radius:50%;border:2px solid var(--color-neutral-white)}.fb-avatar__status--online{background:var(--color-success-500)}.fb-avatar__status--offline{background:var(--color-neutral-400)}.fb-avatar__status--busy{background:var(--color-danger-500)}`;

const FbAvatar = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
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
            ? index.h("img", { src: this.src, alt: this.alt, class: "fb-avatar__img" })
            : (index.h("span", { role: "img", "aria-label": this.alt || this.initials || 'Avatar', class: "fb-avatar__initials" }, this.initials));
        return (index.h(index.Host, { key: '8a47b60ace5e2558f5df50afd725485c13f0c7cc' }, index.h("span", { key: 'ef80a8d4d2351dc32f7c1b3f344fff8037db37ab', class: classes }, content, this.status !== 'none' && (index.h("span", { key: 'bee77714251bf6230e3b1bf9dc506f3b785c552d', class: `fb-avatar__status fb-avatar__status--${this.status}`, "aria-label": this.getStatusLabel(), role: "img" })))));
    }
};
FbAvatar.style = fbAvatarCss();

const fbBadgeCss = () => `:host{display:inline-flex}.fb-badge{display:inline-flex;align-items:center;justify-content:center;font-family:var(--font-family-primary);font-weight:var(--font-weight-semibold);border-radius:var(--radius-xs);white-space:nowrap;border:1px solid transparent}.size-sm{font-size:var(--font-size-10);padding:1px var(--spacing-4)}.size-default{font-size:var(--font-size-12);padding:2px var(--spacing-8)}.size-lg{font-size:var(--font-size-14);padding:4px var(--spacing-12)}.variant-default{background-color:var(--color-primary-50);color:var(--color-primary-700);border-color:var(--color-primary-200)}.variant-success{background-color:var(--color-success-50);color:var(--color-success-700);border-color:var(--color-success-200)}.variant-warning{background-color:var(--color-warning-50);color:var(--color-warning-700);border-color:var(--color-warning-200)}.variant-danger{background-color:var(--color-danger-50);color:var(--color-danger-700);border-color:var(--color-danger-200)}.variant-neutral{background-color:var(--color-neutral-50);color:var(--color-neutral-700);border-color:var(--color-neutral-200)}.variant-info{background-color:var(--color-secondary-50);color:var(--color-secondary-700);border-color:var(--color-secondary-100)}.dot{width:8px;height:8px;border-radius:var(--radius-max);padding:0;border:none}.size-sm.dot{width:6px;height:6px}.size-lg.dot{width:10px;height:10px}`;

const FbBadge = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        /** Visual style */
        this.variant = 'default';
        /** Size */
        this.size = 'default';
        /**
         * Show a dot indicator instead of text.
         * When true, provide a label prop for screen readers — the dot conveys
         * meaning through colour alone which is a WCAG failure without a text alternative.
         */
        this.dot = false;
    }
    render() {
        const isDot = this.dot;
        return (index.h(index.Host, { key: '4c965685d99e0af592b690c2039783e4e62045d1' }, index.h("span", { key: 'a258fc4d7058299cd8a26ba156516dd4a6b1bb51', class: {
                'fb-badge': true,
                [`variant-${this.variant}`]: true,
                [`size-${this.size}`]: true,
                'dot': isDot,
            }, "aria-label": isDot && this.label ? this.label : null, role: isDot ? 'img' : null }, isDot ? null : (this.label || index.h("slot", null)))));
    }
};
FbBadge.style = fbBadgeCss();

const fbBreadcrumbCss = () => `:host{display:block}.fb-breadcrumb{font-family:var(--font-family-primary)}.breadcrumb-list{display:flex;flex-wrap:wrap;align-items:center;gap:var(--spacing-4);list-style:none;margin:0;padding:0}.breadcrumb-item{display:flex;align-items:center;gap:var(--spacing-4)}.breadcrumb-link{font-size:var(--font-size-14);color:var(--color-primary-500);text-decoration:none}.breadcrumb-link:hover{text-decoration:underline}.breadcrumb-link:focus-visible{outline:var(--focus-width) solid var(--focus-color);outline-offset:var(--focus-offset);border-radius:var(--radius-xs)}.breadcrumb-current{font-size:var(--font-size-14);color:var(--color-neutral-500);font-weight:var(--font-weight-semibold)}.breadcrumb-separator{font-size:var(--font-size-14);color:var(--color-neutral-500);user-select:none}`;

const FbBreadcrumb = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.items = '[]';
        this.label = 'Breadcrumb';
    }
    get parsedItems() {
        if (typeof this.items === 'string') {
            try {
                return JSON.parse(this.items);
            }
            catch (_a) {
                return [];
            }
        }
        return this.items;
    }
    render() {
        const items = this.parsedItems;
        return (index.h(index.Host, { key: 'aba6d80dd617271114973d282f123a46cf62b875' }, index.h("nav", { key: 'd6ec80064cf7f83d4f180ba3e0c51416246d4a21', "aria-label": this.label, class: "fb-breadcrumb" }, index.h("ol", { key: '5570687f17e3f875facb6239c3fa057a3c9244ba', class: "breadcrumb-list" }, items.map((item, index$1) => {
            const isLast = index$1 === items.length - 1;
            return (index.h("li", { key: index$1, class: "breadcrumb-item" }, isLast ? (index.h("span", { "aria-current": "page", class: "breadcrumb-current" }, item.label)) : (index.h("a", { href: item.href || '#', class: "breadcrumb-link" }, item.label)), !isLast && (index.h("span", { class: "breadcrumb-separator", "aria-hidden": "true" }, "/"))));
        })))));
    }
};
FbBreadcrumb.style = fbBreadcrumbCss();

const fbButtonCss = () => `:host{display:inline-flex}.fb-button{display:inline-flex;align-items:center;justify-content:center;gap:var(--spacing-8);font-family:var(--font-family-primary);font-weight:var(--font-weight-semibold);border-radius:var(--fb-button-radius, var(--radius-sm));border:none;cursor:pointer;transition:background-color 0.15s, color 0.15s, border-color 0.15s, opacity 0.15s;white-space:nowrap;line-height:1;text-decoration:none;box-sizing:border-box}.fb-button:focus-visible{outline:var(--focus-width) solid var(--focus-color);outline-offset:var(--focus-offset)}.size-xs{height:24px;padding:0 var(--spacing-8);font-size:var(--font-size-12)}.size-sm{height:28px;padding:0 var(--spacing-12);font-size:var(--font-size-12)}.size-default{height:36px;padding:0 var(--spacing-16);font-size:var(--font-size-14)}.size-lg{height:44px;padding:0 var(--spacing-20);font-size:var(--font-size-16)}.icon-only.size-xs{width:24px;padding:0}.icon-only.size-sm{width:28px;padding:0}.icon-only.size-default{width:36px;padding:0}.icon-only.size-lg{width:44px;padding:0}.rounded{border-radius:var(--radius-max)}.variant-default{background-color:var(--color-primary-500);color:var(--color-neutral-white);border:none}.variant-default:hover:not(:disabled){background-color:var(--color-primary-600)}.variant-default:active:not(:disabled){background-color:var(--color-primary-700)}.variant-secondary{background-color:var(--color-neutral-100);color:var(--color-neutral-black);border:none}.variant-secondary:hover:not(:disabled){background-color:var(--color-neutral-200)}.variant-secondary:active:not(:disabled){background-color:var(--color-neutral-300)}.variant-outline{background-color:transparent;color:var(--color-primary-500);border:1px solid var(--color-primary-500)}.variant-outline:hover:not(:disabled){background-color:var(--color-primary-50);color:var(--color-primary-600);border-color:var(--color-primary-600)}.variant-outline:active:not(:disabled){background-color:var(--color-primary-100);color:var(--color-primary-700);border-color:var(--color-primary-700)}.variant-ghost{background-color:transparent;color:var(--color-primary-500);border:none}.variant-ghost:hover:not(:disabled){background-color:var(--color-primary-50);color:var(--color-primary-600)}.variant-ghost:active:not(:disabled){background-color:var(--color-primary-100);color:var(--color-primary-700)}.variant-destructive{background-color:var(--color-danger-600);color:var(--color-neutral-white);border:none}.variant-destructive:hover:not(:disabled){background-color:var(--color-danger-700)}.variant-destructive:active:not(:disabled){background-color:var(--color-danger-800)}.variant-link{background-color:transparent;color:var(--color-primary-500);border:none;text-decoration:underline;border-radius:var(--radius-xs);padding:4px var(--spacing-8);height:auto}.variant-link:hover:not(:disabled){background-color:var(--color-primary-50);color:var(--color-primary-600)}.variant-link:active:not(:disabled){background-color:var(--color-primary-100);color:var(--color-primary-700)}.fb-button:disabled,.fb-button.disabled{opacity:0.5;cursor:not-allowed;pointer-events:none}.icon{display:inline-flex;align-items:center;flex-shrink:0}`;

const FbButton = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.fbClick = index.createEvent(this, "fbClick");
        /** Visual style of the button */
        this.variant = 'default';
        /** Size of the button */
        this.size = 'default';
        /** Position of the icon slot relative to the label */
        this.iconPosition = 'none';
        /** Full pill / circle border radius */
        this.rounded = false;
        /** Disables the button */
        this.disabled = false;
        /** HTML type attribute */
        this.type = 'button';
        this.handleClick = () => {
            if (!this.disabled) {
                this.fbClick.emit();
            }
        };
    }
    render() {
        const isIconOnly = this.iconPosition === 'only';
        return (index.h(index.Host, { key: 'd4f8e201c848cf5112a1424bf02790f8b49a746b' }, index.h("button", { key: 'f1756037c4904308387e6f76cc319d3658d0bab1', type: this.type, disabled: this.disabled, "aria-disabled": this.disabled ? 'true' : null, "aria-label": isIconOnly && this.label ? this.label : null, class: {
                'fb-button': true,
                [`variant-${this.variant}`]: true,
                [`size-${this.size}`]: true,
                'rounded': this.rounded,
                'icon-only': isIconOnly,
                'disabled': this.disabled,
            }, onClick: this.handleClick }, this.iconPosition === 'left' && (index.h("span", { key: 'dc97ee4e4f6d77d98c77f5b61c6f704247f68448', class: "icon icon--left", "aria-hidden": "true" }, index.h("slot", { key: 'b083a00b7382530c8a38ebcdef836d7212aaa61c', name: "icon-left" }))), !isIconOnly && (index.h("span", { key: 'a8ffbc605f07f05bd6cabde8711cb68241d2cca4', class: "label" }, index.h("slot", { key: '0cd018706421ce289992e8f3c15324f771a05e8f' }))), this.iconPosition === 'right' && (index.h("span", { key: '2359d02779234c8a2270645fa23b9a5b4a250609', class: "icon icon--right", "aria-hidden": "true" }, index.h("slot", { key: 'b24e38061776426f8900076a3821bbbf8b67c640', name: "icon-right" }))), isIconOnly && (index.h("span", { key: '22a9789089043614219cec949b75f9a487cbc291', class: "icon icon--only", "aria-hidden": "true" }, index.h("slot", { key: '63f262ad829dce18b6a1dc1a47fefbf142e3bf7a', name: "icon" }))))));
    }
};
FbButton.style = fbButtonCss();

const fbButtonGroupCss = () => `:host{display:inline-flex}.fb-button-group{display:inline-flex;flex-direction:row;align-items:center}.fb-button-group.vertical{flex-direction:column;align-items:stretch}`;

const FbButtonGroup = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.orientation = 'horizontal';
    }
    componentDidLoad() {
        var _a;
        const slot = (_a = this.el.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('slot');
        slot === null || slot === void 0 ? void 0 : slot.addEventListener('slotchange', () => this.applyToButtons());
        this.applyToButtons();
    }
    applyToButtons() {
        const buttons = Array.from(this.el.querySelectorAll('fb-button'));
        if (!buttons.length)
            return;
        const isVertical = this.orientation === 'vertical';
        const last = buttons.length - 1;
        buttons.forEach((btn, i) => {
            const isFirst = i === 0;
            const isLast = i === last;
            const isOnly = buttons.length === 1;
            let radius;
            if (isOnly) {
                radius = 'var(--radius-sm)';
            }
            else if (isVertical) {
                if (isFirst)
                    radius = 'var(--radius-sm) var(--radius-sm) 0 0';
                else if (isLast)
                    radius = '0 0 var(--radius-sm) var(--radius-sm)';
                else
                    radius = '0';
            }
            else {
                if (isFirst)
                    radius = 'var(--radius-sm) 0 0 var(--radius-sm)';
                else if (isLast)
                    radius = '0 var(--radius-sm) var(--radius-sm) 0';
                else
                    radius = '0';
            }
            btn.style.setProperty('--fb-button-radius', radius);
            if (isVertical) {
                btn.style.removeProperty('margin-left');
                btn.style.setProperty('margin-top', isFirst ? '0' : '-1px');
            }
            else {
                btn.style.removeProperty('margin-top');
                btn.style.setProperty('margin-left', isFirst ? '0' : '-1px');
            }
            if (this.variant)
                btn.variant = this.variant;
            if (this.size)
                btn.size = this.size;
        });
    }
    render() {
        var _a;
        return (index.h(index.Host, { key: '5c601bb732ee6eaa7d0a686ff3ed1ec720f59392' }, index.h("div", { key: '2128b5e8a21d74c6a1a175dea0c59667d226a632', role: "group", "aria-label": (_a = this.el.getAttribute('aria-label')) !== null && _a !== void 0 ? _a : 'Button group', class: { 'fb-button-group': true, 'vertical': this.orientation === 'vertical' } }, index.h("slot", { key: '4ce9420372bebd644c40a9caa176fa8bf8a236ad' }))));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "orientation": [{
                "applyToButtons": 0
            }],
        "variant": [{
                "applyToButtons": 0
            }],
        "size": [{
                "applyToButtons": 0
            }]
    }; }
};
FbButtonGroup.style = fbButtonGroupCss();

const fbCardCss = () => `:host{display:block}.fb-card{display:flex;flex-direction:column;background:var(--color-neutral-white);border:1px solid var(--color-neutral-200);border-radius:var(--radius-md);overflow:hidden;width:100%;box-sizing:border-box;text-align:left;color:inherit;text-decoration:none;font-family:var(--font-family-primary)}.fb-card--padding-none{padding:0}.fb-card--padding-sm{padding:var(--spacing-12)}.fb-card--padding-default{padding:var(--spacing-16)}.fb-card--padding-lg{padding:var(--spacing-24)}.fb-card--shadow-none{box-shadow:none}.fb-card--shadow-sm{box-shadow:var(--shadow-100)}.fb-card--shadow-default{box-shadow:var(--shadow-200)}.fb-card--shadow-lg{box-shadow:var(--shadow-300)}button.fb-card,a.fb-card{border:none;cursor:pointer}.fb-card--clickable:hover{border-color:var(--color-primary-300);box-shadow:var(--shadow-300);transition:box-shadow 0.15s, border-color 0.15s}.fb-card--clickable:focus-visible{outline:var(--focus-width) solid var(--focus-color);outline-offset:var(--focus-offset)}`;

const FbCard = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.fbCardClick = index.createEvent(this, "fbCardClick");
        this.href = '';
        this.clickable = false;
        this.label = '';
        this.padding = 'default';
        this.shadow = 'default';
    }
    render() {
        const classes = {
            'fb-card': true,
            [`fb-card--padding-${this.padding}`]: true,
            [`fb-card--shadow-${this.shadow}`]: true,
            'fb-card--clickable': this.clickable || !!this.href,
        };
        // Clickable cards must be real interactive elements for keyboard and AT support
        if (this.href) {
            return (index.h(index.Host, null, index.h("a", { href: this.href, class: classes, "aria-label": this.label || null }, index.h("slot", { name: "header" }), index.h("slot", null), index.h("slot", { name: "footer" }))));
        }
        if (this.clickable) {
            return (index.h(index.Host, null, index.h("button", { type: "button", class: classes, "aria-label": this.label || null, onClick: () => this.fbCardClick.emit() }, index.h("slot", { name: "header" }), index.h("slot", null), index.h("slot", { name: "footer" }))));
        }
        return (index.h(index.Host, null, index.h("div", { class: classes }, index.h("slot", { name: "header" }), index.h("slot", null), index.h("slot", { name: "footer" }))));
    }
};
FbCard.style = fbCardCss();

const fbCheckboxCss = () => `.fb-label{display:flex;align-items:center;gap:var(--spacing-4);font-size:var(--font-size-14);font-weight:var(--font-weight-regular);color:var(--color-neutral-700);cursor:default}.required-indicator{color:var(--color-danger-600);font-weight:var(--font-weight-regular)}.fb-helper{display:flex;align-items:center;gap:var(--spacing-4);font-size:var(--font-size-12);color:var(--color-neutral-500)}.fb-helper--error{color:var(--color-danger-600)}.helper-icon{flex-shrink:0}:host{display:block}.fb-checkbox-wrapper{display:flex;flex-direction:column;gap:var(--spacing-4);font-family:var(--font-family-primary)}.fb-checkbox-label{display:inline-flex;align-items:flex-start;gap:var(--spacing-8);cursor:pointer}.fb-checkbox-label.disabled{opacity:0.5;cursor:not-allowed}.native-checkbox{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}.native-checkbox:focus-visible+.checkbox-box{outline:var(--focus-width) solid var(--focus-color);outline-offset:var(--focus-offset)}.checkbox-box{display:inline-flex;align-items:center;justify-content:center;border:var(--border-standard) solid var(--color-neutral-400);border-radius:var(--radius-xs);background-color:var(--color-neutral-white);flex-shrink:0;margin-top:2px;transition:background-color 0.15s, border-color 0.15s}.size-sm{width:14px;height:14px}.size-md{width:18px;height:18px}.size-lg{width:22px;height:22px;border-radius:var(--radius-sm)}.checkbox-box.checked{background-color:var(--color-primary-500);border-color:var(--color-primary-500)}.checkbox-box.error{border-color:var(--color-danger-600);border-width:var(--border-thick)}.label-text{font-size:var(--font-size-14);color:var(--color-neutral-700);line-height:1.4}.fb-helper{padding-left:26px}`;

let idCounter$c = 0;
const FbCheckbox = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.fbChange = index.createEvent(this, "fbChange");
        /** Visible label */
        this.label = '';
        this.checked = false;
        /** Shows a dash/minus — used for "select all" when some items are selected */
        this.indeterminate = false;
        this.state = 'default';
        this.size = 'md';
        this.helperText = '';
        this.required = false;
        /** Explicit value used when inside a form */
        this.value = 'on';
    }
    connectedCallback() {
        idCounter$c++;
        this.inputId = `fb-checkbox-${idCounter$c}`;
        this.helperId = `fb-checkbox-helper-${idCounter$c}`;
    }
    get isDisabled() { return this.state === 'disabled'; }
    get isError() { return this.state === 'error'; }
    render() {
        const hasHelper = !!this.helperText;
        return (index.h(index.Host, { key: '61220a70cc6bb2f1e3bb22320e212bc6a115d8fc' }, index.h("div", { key: '1400c693a91b1f55859baebf67e147d4f06c934d', class: "fb-checkbox-wrapper" }, index.h("label", { key: 'e09e5bd0c60c67eaa5dab1c2ec3908b6fc7bd336', htmlFor: this.inputId, class: {
                'fb-checkbox-label': true,
                'disabled': this.isDisabled,
            } }, index.h("input", { key: '9a42317546b0d1a3fd787a3a85d9994ec7261d7f', id: this.inputId, type: "checkbox", checked: this.checked, disabled: this.isDisabled, required: this.required, value: this.value, "aria-label": !this.label ? 'Checkbox' : null, "aria-required": this.required ? 'true' : null, "aria-invalid": this.isError ? 'true' : null, "aria-describedby": hasHelper ? this.helperId : null,
            // indeterminate must be set as a property, not attribute
            ref: (el) => {
                if (el)
                    el.indeterminate = this.indeterminate;
            }, class: "native-checkbox", onChange: (e) => {
                this.checked = e.target.checked;
                this.fbChange.emit(this.checked);
            } }), index.h("span", { key: '6151f47f93fad42553f86277ba24c5a9e564decc', "aria-hidden": "true", class: {
                'checkbox-box': true,
                [`size-${this.size}`]: true,
                'checked': this.checked || this.indeterminate,
                'error': this.isError,
            } }, this.indeterminate
            ? index.h("svg", { width: "10", height: "2", viewBox: "0 0 10 2", fill: "none" }, index.h("path", { d: "M1 1h8", stroke: "white", "stroke-width": "2", "stroke-linecap": "round" }))
            : this.checked
                ? index.h("svg", { width: "10", height: "8", viewBox: "0 0 10 8", fill: "none" }, index.h("path", { d: "M1 4l3 3 5-5", stroke: "white", "stroke-width": "1.8", "stroke-linecap": "round", "stroke-linejoin": "round" }))
                : null), this.label && index.h("span", { key: '8a18867dea05826b18e3909c5c54fe73acc0846e', class: "label-text" }, this.label)), fieldHelpers.renderHelperText(this.helperText, this.helperId, this.isError))));
    }
};
FbCheckbox.style = fbCheckboxCss();

const fbChipCss = () => `:host{display:inline-flex}.fb-chip{display:inline-flex;align-items:center;gap:var(--spacing-4);border-radius:var(--radius-max);font-family:var(--font-family-primary);font-weight:var(--font-weight-medium);white-space:nowrap;cursor:default;border:1px solid transparent;transition:background-color 0.15s, border-color 0.15s}.fb-chip--default{padding:var(--spacing-4) var(--spacing-12);font-size:var(--font-size-14)}.fb-chip--sm{padding:var(--spacing-2) var(--spacing-8);font-size:var(--font-size-12)}.fb-chip--default-variant{background:var(--color-neutral-100);color:var(--color-neutral-700);border-color:var(--color-neutral-200)}.fb-chip--primary{background:var(--color-primary-50);color:var(--color-primary-700);border-color:var(--color-primary-200)}.fb-chip--success{background:var(--color-success-50);color:var(--color-success-700);border-color:var(--color-success-200)}.fb-chip--warning{background:var(--color-warning-50);color:var(--color-warning-700);border-color:var(--color-warning-200)}.fb-chip--danger{background:var(--color-danger-50);color:var(--color-danger-700);border-color:var(--color-danger-200)}.fb-chip--default{background:var(--color-neutral-100);color:var(--color-neutral-700);border-color:var(--color-neutral-200)}button.fb-chip{cursor:pointer}button.fb-chip:hover:not(:disabled){filter:brightness(0.96)}button.fb-chip:focus-visible{outline:var(--focus-width) solid var(--focus-color);outline-offset:var(--focus-offset)}button.fb-chip[aria-selected="true"]{background:var(--color-primary-500);color:var(--color-neutral-white);border-color:var(--color-primary-500)}.fb-chip--disabled{opacity:0.45;cursor:not-allowed}.fb-chip__label{line-height:1}.fb-chip__remove{display:inline-flex;align-items:center;justify-content:center;background:none;border:none;padding:2px;cursor:pointer;border-radius:50%;color:inherit;opacity:0.7;line-height:1}.fb-chip__remove:hover:not(:disabled){opacity:1;background:rgba(0,0,0,0.08)}.fb-chip__remove:focus-visible{outline:var(--focus-width) solid var(--focus-color);outline-offset:1px}`;

const FbChip = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.fbSelect = index.createEvent(this, "fbSelect");
        this.fbRemove = index.createEvent(this, "fbRemove");
        this.label = '';
        this.variant = 'default';
        this.size = 'default';
        /** Makes the chip selectable (toggle). Uses role="option" + aria-selected. */
        this.selectable = false;
        this.selected = false;
        /** Shows a remove (×) button. Emits fbRemove. */
        this.dismissible = false;
        this.disabled = false;
    }
    handleClick() {
        if (this.disabled || !this.selectable)
            return;
        this.selected = !this.selected;
        this.fbSelect.emit(this.selected);
    }
    render() {
        const classes = {
            'fb-chip': true,
            [`fb-chip--${this.variant}`]: true,
            [`fb-chip--${this.size}`]: true,
            'fb-chip--selected': this.selected,
            'fb-chip--disabled': this.disabled,
        };
        if (this.selectable) {
            return (index.h(index.Host, null, index.h("button", { type: "button", role: "option", "aria-selected": this.selected ? 'true' : 'false', "aria-disabled": this.disabled ? 'true' : null, disabled: this.disabled, class: classes, onClick: () => this.handleClick() }, index.h("slot", { name: "icon-left" }), index.h("span", { class: "fb-chip__label" }, this.label, index.h("slot", null)), this.dismissible && (index.h("span", { role: "button", "aria-label": `Remove ${this.label}`, tabindex: this.disabled ? -1 : 0, class: "fb-chip__remove", onClick: (e) => {
                    e.stopPropagation();
                    if (!this.disabled)
                        this.fbRemove.emit();
                }, onKeyDown: (e) => {
                    if ((e.key === 'Enter' || e.key === ' ') && !this.disabled) {
                        e.preventDefault();
                        e.stopPropagation();
                        this.fbRemove.emit();
                    }
                } }, index.h("svg", { "aria-hidden": "true", width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2.5", "stroke-linecap": "round", "stroke-linejoin": "round" }, index.h("path", { d: "M18 6L6 18M6 6l12 12" })))))));
        }
        return (index.h(index.Host, null, index.h("span", { class: classes, "aria-disabled": this.disabled ? 'true' : null }, index.h("slot", { name: "icon-left" }), index.h("span", { class: "fb-chip__label" }, this.label, index.h("slot", null)), this.dismissible && (index.h("button", { type: "button", "aria-label": `Remove ${this.label}`, disabled: this.disabled, class: "fb-chip__remove", onClick: () => {
                if (!this.disabled)
                    this.fbRemove.emit();
            } }, index.h("svg", { "aria-hidden": "true", width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2.5", "stroke-linecap": "round", "stroke-linejoin": "round" }, index.h("path", { d: "M18 6L6 18M6 6l12 12" })))))));
    }
};
FbChip.style = fbChipCss();

const fbDropdownCss = () => `:host{display:inline-block;position:relative}.fb-trigger{display:inline-flex;align-items:center;gap:var(--spacing-8);height:36px;padding:0 var(--spacing-16);font-family:var(--font-family-primary);font-size:var(--font-size-14);font-weight:var(--font-weight-semibold);border-radius:var(--radius-sm);cursor:pointer;transition:background-color 0.15s}.fb-trigger:focus-visible{outline:var(--focus-width) solid var(--focus-color);outline-offset:var(--focus-offset)}.fb-trigger:disabled{opacity:0.5;cursor:not-allowed}.variant-default{background:var(--color-primary-500);color:white;border:none}.variant-default:hover:not(:disabled){background:var(--color-primary-600)}.variant-secondary{background:var(--color-neutral-100);color:var(--color-neutral-black);border:none}.variant-secondary:hover:not(:disabled){background:var(--color-neutral-200)}.variant-ghost{background:transparent;color:var(--color-primary-500);border:none}.variant-ghost:hover:not(:disabled){background:var(--color-primary-50)}.chevron{transition:transform 0.2s;flex-shrink:0}.chevron--open{transform:rotate(180deg)}.fb-menu{position:absolute;top:calc(100% + 4px);left:0;min-width:180px;background:var(--color-neutral-white);border:1px solid var(--color-neutral-200);border-radius:var(--radius-sm);box-shadow:var(--shadow-200);z-index:50;padding:var(--spacing-4) 0;list-style:none;margin:0}.fb-menuitem{display:block;width:100%;padding:var(--spacing-8) var(--spacing-12);text-align:left;background:none;border:none;font-family:var(--font-family-primary);font-size:var(--font-size-14);color:var(--color-neutral-black);cursor:pointer;transition:background-color 0.1s}.fb-menuitem:hover:not(.disabled){background-color:var(--color-neutral-50)}.fb-menuitem:focus-visible{outline:var(--focus-width) solid var(--focus-color);outline-offset:-2px}.fb-menuitem.danger{color:var(--color-danger-700)}.fb-menuitem.danger:hover{background-color:var(--color-danger-50)}.fb-menuitem.disabled{opacity:0.4;cursor:not-allowed}`;

let idCounter$b = 0;
const FbDropdown = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.fbSelect = index.createEvent(this, "fbSelect");
        this.label = 'Actions';
        this.items = '[]';
        this.disabled = false;
        this.variant = 'secondary';
        this.open = false;
        this.focusedIndex = 0;
        this.handleTriggerKeyDown = (e) => {
            switch (e.key) {
                case 'Enter':
                case ' ':
                case 'ArrowDown':
                    e.preventDefault();
                    if (!this.open)
                        this.openMenu();
                    else {
                        this.focusedIndex = 0;
                        this.focusItem(0);
                    }
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    if (!this.open)
                        this.openMenu();
                    else {
                        const last = this.enabledItems.length - 1;
                        this.focusedIndex = last;
                        this.focusItem(last);
                    }
                    break;
                case 'Escape':
                    e.preventDefault();
                    this.close();
                    break;
            }
        };
        this.handleMenuKeyDown = (e) => {
            const enabled = this.enabledItems;
            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    this.focusedIndex = (this.focusedIndex + 1) % enabled.length;
                    this.focusItem(this.focusedIndex);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    this.focusedIndex = (this.focusedIndex - 1 + enabled.length) % enabled.length;
                    this.focusItem(this.focusedIndex);
                    break;
                case 'Home':
                    e.preventDefault();
                    this.focusedIndex = 0;
                    this.focusItem(0);
                    break;
                case 'End':
                    e.preventDefault();
                    this.focusedIndex = enabled.length - 1;
                    this.focusItem(enabled.length - 1);
                    break;
                case 'Escape':
                case 'Tab':
                    e.preventDefault();
                    this.close();
                    break;
            }
        };
    }
    connectedCallback() {
        idCounter$b++;
        this.triggerId = `fb-dropdown-trigger-${idCounter$b}`;
        this.menuId = `fb-dropdown-menu-${idCounter$b}`;
    }
    onDocumentClick(e) {
        if (this.open && !this.el.contains(e.target))
            this.close();
    }
    get parsedItems() {
        if (typeof this.items === 'string') {
            try {
                return JSON.parse(this.items);
            }
            catch (_a) {
                return [];
            }
        }
        return this.items;
    }
    get enabledItems() { return this.parsedItems.filter(i => !i.disabled); }
    toggle() {
        this.open ? this.close() : this.openMenu();
    }
    openMenu() {
        if (this.disabled)
            return;
        this.open = true;
        this.focusedIndex = 0;
        requestAnimationFrame(() => this.focusItem(0));
    }
    close() {
        var _a, _b;
        this.open = false;
        (_b = (_a = this.el.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(`#${this.triggerId}`)) === null || _b === void 0 ? void 0 : _b.focus();
    }
    select(item) {
        if (item.disabled)
            return;
        this.fbSelect.emit(item.id);
        this.close();
    }
    focusItem(index) {
        var _a, _b;
        const items = (_a = this.el.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll('[role="menuitem"]:not([aria-disabled="true"])');
        (_b = items === null || items === void 0 ? void 0 : items[index]) === null || _b === void 0 ? void 0 : _b.focus();
    }
    render() {
        const items = this.parsedItems;
        return (index.h(index.Host, { key: '863c05c8cba4b54f4064d7d24c9e5827679cc999', style: { position: 'relative', display: 'inline-block' } }, index.h("button", { key: 'aae8b8e8c16360691e845109a9289599b10c38de', id: this.triggerId, type: "button", "aria-haspopup": "true", "aria-expanded": this.open ? 'true' : 'false', "aria-controls": this.menuId, disabled: this.disabled, class: { 'fb-trigger': true, [`variant-${this.variant}`]: true }, onClick: () => this.toggle(), onKeyDown: this.handleTriggerKeyDown }, index.h("slot", { key: '1c6a2b3f50ab986c3050562bfbf2c778d97b5450', name: "trigger" }, this.label), index.h("svg", { key: '9813f5b297a60e844f657425b089867c621dd11e', "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.8", "stroke-linecap": "round", "stroke-linejoin": "round", class: { 'chevron': true, 'chevron--open': this.open } }, index.h("path", { key: '0d61662dc744a48886387d64f59c1f6aa77db8b5', d: "M6 9l6 6 6-6" }))), this.open && (index.h("ul", { key: '5556821bfe844de7e1230284beed7392314a8ca6', id: this.menuId, role: "menu", "aria-label": this.label, class: "fb-menu", onKeyDown: this.handleMenuKeyDown }, items.map(item => (index.h("li", { key: item.id, role: "none" }, index.h("button", { type: "button", role: "menuitem", "aria-disabled": item.disabled ? 'true' : null, class: { 'fb-menuitem': true, 'danger': !!item.danger, 'disabled': !!item.disabled }, tabindex: item.disabled ? -1 : 0, onClick: () => this.select(item) }, item.label))))))));
    }
    get el() { return index.getElement(this); }
};
FbDropdown.style = fbDropdownCss();

const fbInputCss = () => `.fb-label{display:flex;align-items:center;gap:var(--spacing-4);font-size:var(--font-size-14);font-weight:var(--font-weight-regular);color:var(--color-neutral-700);cursor:default}.required-indicator{color:var(--color-danger-600);font-weight:var(--font-weight-regular)}.fb-helper{display:flex;align-items:center;gap:var(--spacing-4);font-size:var(--font-size-12);color:var(--color-neutral-500)}.fb-helper--error{color:var(--color-danger-600)}.helper-icon{flex-shrink:0}:host{display:block}.fb-input-wrapper{display:flex;flex-direction:column;gap:var(--spacing-4);font-family:var(--font-family-primary);width:100%}.fb-input-field{display:flex;align-items:center;border:var(--border-standard) solid var(--color-neutral-400);border-radius:var(--radius-sm);background-color:var(--color-neutral-white);transition:border-color 0.15s, box-shadow 0.15s;box-sizing:border-box;width:100%}.fb-input-field:focus-within{border-color:var(--color-primary-500);box-shadow:0 0 0 var(--focus-width) color-mix(in srgb, var(--focus-color) 20%, transparent)}.state-error{border-color:var(--color-danger-600);border-width:var(--border-thick)}.state-error:focus-within{border-color:var(--color-danger-600);box-shadow:0 0 0 var(--focus-width) color-mix(in srgb, var(--color-danger-600) 20%, transparent)}.state-disabled{background-color:var(--color-neutral-100);border-color:var(--color-neutral-200);opacity:0.6;cursor:not-allowed}.state-readonly{background-color:var(--color-neutral-50)}.size-sm{height:32px}.size-default{height:40px}.size-lg{height:48px}.native-input{flex:1;border:none;outline:none;background:transparent;font-family:var(--font-family-primary);color:var(--color-neutral-black);min-width:0;height:100%;box-sizing:border-box}.size-sm .native-input{font-size:var(--font-size-12);padding:0 var(--spacing-8)}.size-default .native-input{font-size:var(--font-size-14);padding:0 var(--spacing-12)}.size-lg .native-input{font-size:var(--font-size-16);padding:0 var(--spacing-16)}.native-input::placeholder{color:var(--color-neutral-600)}.native-input:disabled{cursor:not-allowed}.adornment{display:flex;align-items:center;flex-shrink:0;color:var(--color-neutral-500);font-size:var(--font-size-14);height:100%}.adornment--prefix{padding:0 var(--spacing-8) 0 var(--spacing-12);border-right:1px solid var(--color-neutral-200)}.adornment--suffix{padding:0 var(--spacing-12) 0 var(--spacing-8);border-left:1px solid var(--color-neutral-200)}.adornment--prefix-icon{padding:0 var(--spacing-4) 0 var(--spacing-12);color:var(--color-neutral-600)}.adornment-btn{display:flex;align-items:center;justify-content:center;padding:0 var(--spacing-8);height:100%;background:none;border:none;cursor:pointer;color:var(--color-neutral-600);flex-shrink:0;border-radius:0}.adornment-btn:hover{color:var(--color-neutral-600)}.adornment-btn:focus-visible{outline:var(--focus-width) solid var(--focus-color);outline-offset:-2px}`;

let idCounter$a = 0;
const FbInput = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.fbChange = index.createEvent(this, "fbChange");
        this.fbFocus = index.createEvent(this, "fbFocus");
        this.fbBlur = index.createEvent(this, "fbBlur");
        /** Visible label text — always provide this for accessibility */
        this.label = '';
        /** HTML input type */
        this.type = 'text';
        /** Size variant */
        this.size = 'default';
        /** Visual and interaction state */
        this.state = 'default';
        /** Placeholder text */
        this.placeholder = '';
        /** Current value */
        this.value = '';
        /** Helper or error message shown below the input */
        this.helperText = '';
        /** Marks the field as required */
        this.required = false;
        /** Marks the field as required */
        this.clearable = false;
        /** Left adornment text (e.g. "$") */
        this.prefixText = '';
        /** Right adornment text (e.g. ".00") */
        this.suffixText = '';
        this.showPassword = false;
        this.handleInput = (e) => {
            const val = e.target.value;
            this.value = val;
            this.fbChange.emit(val);
        };
        this.handleClear = () => {
            var _a, _b;
            this.value = '';
            this.fbChange.emit('');
            // Return focus to the input after clearing
            (_b = (_a = this.el.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('input')) === null || _b === void 0 ? void 0 : _b.focus();
        };
        this.togglePassword = () => {
            this.showPassword = !this.showPassword;
        };
    }
    connectedCallback() {
        idCounter$a++;
        this.inputId = `fb-input-${idCounter$a}`;
        this.helperId = `fb-input-helper-${idCounter$a}`;
    }
    get isDisabled() { return this.state === 'disabled'; }
    get isReadOnly() { return this.state === 'read-only'; }
    get isError() { return this.state === 'error'; }
    render() {
        const isPassword = this.type === 'password';
        const isSearch = this.type === 'search';
        const inputType = isPassword && this.showPassword ? 'text' : this.type;
        const showClear = this.clearable && !!this.value && !this.isDisabled && !this.isReadOnly;
        const hasHelper = !!this.helperText;
        return (index.h(index.Host, { key: 'fd8bcedfdd1cfa188e8efe9c5a449bfd32376f1c' }, index.h("div", { key: 'de8e510b90b21522d9608463afec07d44a1cb824', class: "fb-input-wrapper" }, fieldHelpers.renderFieldLabel(this.label, this.required, this.inputId), index.h("div", { key: 'ee50c44e40a05a0bda94a623aac808dcfb0a2266', class: {
                'fb-input-field': true,
                [`size-${this.size}`]: true,
                'state-error': this.isError,
                'state-disabled': this.isDisabled,
                'state-readonly': this.isReadOnly,
            } }, isSearch && (index.h("span", { key: '69e363400ac11cee6bb262034cff4efee898f6dd', class: "adornment adornment--prefix-icon", "aria-hidden": "true" }, index.h("svg", { key: 'cbc4cee118d5275c7ba22582f45cc6bec0a0eae7', width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.8", "stroke-linecap": "round", "stroke-linejoin": "round" }, index.h("circle", { key: 'fa822db0b34dee1d06ef9d2286f58de94bb5edbf', cx: "11", cy: "11", r: "8" }), index.h("path", { key: '94c9e037ab8d02cbdfdc142b3ac7ada3052f6d22', d: "M21 21l-4.35-4.35" })))), this.prefixText && (index.h("span", { key: '49696a6da27d0f4c7cdcbc293be527660244e419', class: "adornment adornment--prefix", "aria-hidden": "true" }, this.prefixText)), index.h("input", { key: '1277177f67bb62333f5334cc895087758b7f8890', id: this.inputId, type: inputType, value: this.value, placeholder: this.placeholder, disabled: this.isDisabled, readOnly: this.isReadOnly, required: this.required, "aria-required": this.required ? 'true' : null, "aria-invalid": this.isError ? 'true' : null, "aria-describedby": hasHelper ? this.helperId : null, class: "native-input", onInput: this.handleInput, onFocus: () => this.fbFocus.emit(), onBlur: () => this.fbBlur.emit() }), showClear && (index.h("button", { key: '692c94a84cf32d63657a845fb5431fbc233f99e7', type: "button", class: "adornment-btn", "aria-label": "Clear input", onClick: this.handleClear }, index.h("svg", { key: 'ed742dde60da4c5732a5d2e82aba4ac3de8ea8fc', "aria-hidden": "true", width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" }, index.h("path", { key: 'c8b721621e4c7cc57db989509fd5e4a28e5b732d', d: "M2 2l8 8M10 2l-8 8" })))), this.suffixText && (index.h("span", { key: 'cadaaa9331bea4e5db0df691e4de182ff38556c6', class: "adornment adornment--suffix", "aria-hidden": "true" }, this.suffixText)), isPassword && (index.h("button", { key: 'd5af5315bdfc290a908a8348592d829de21804ed', type: "button", class: "adornment-btn", "aria-label": this.showPassword ? 'Hide password' : 'Show password', "aria-pressed": this.showPassword ? 'true' : 'false', onClick: this.togglePassword }, this.showPassword
            ? index.h("svg", { "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.8", "stroke-linecap": "round", "stroke-linejoin": "round" }, index.h("path", { d: "M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" }), index.h("line", { x1: "1", y1: "1", x2: "23", y2: "23" }))
            : index.h("svg", { "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.8", "stroke-linecap": "round", "stroke-linejoin": "round" }, index.h("path", { d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" }), index.h("circle", { cx: "12", cy: "12", r: "3" }))))), fieldHelpers.renderHelperText(this.helperText, this.helperId, this.isError))));
    }
    get el() { return index.getElement(this); }
};
FbInput.style = fbInputCss();

const fbModalCss = () => `:host{display:contents}.fb-overlay{position:fixed;inset:0;background:rgba(21, 33, 54, 0.5);backdrop-filter:blur(2px);z-index:100;animation:fb-fade-in 0.15s ease-out}.fb-modal{position:fixed;top:50%;left:50%;transform:translate(-50%, -50%);z-index:101;background:var(--color-neutral-white);border-radius:var(--radius-md);box-shadow:var(--shadow-900);display:flex;flex-direction:column;max-height:90vh;width:100%;overflow:hidden;animation:fb-modal-in 0.2s ease-out}.size-sm{max-width:400px}.size-default{max-width:560px}.size-lg{max-width:760px}.size-fullscreen{max-width:100vw;max-height:100vh;top:0;left:0;transform:none;border-radius:0}.modal-header{display:flex;align-items:flex-start;justify-content:space-between;gap:var(--spacing-16);padding:var(--spacing-20) var(--spacing-24);border-bottom:1px solid var(--color-neutral-100);flex-shrink:0}.modal-heading-group{flex:1}.modal-title{margin:0;font-family:var(--font-family-primary);font-size:var(--font-size-16);font-weight:var(--font-weight-semibold);color:var(--color-neutral-black);line-height:var(--line-height-24)}.modal-description{margin:var(--spacing-4) 0 0;font-family:var(--font-family-primary);font-size:var(--font-size-14);color:var(--color-neutral-500);line-height:1.5}.close-btn{background:none;border:none;cursor:pointer;color:var(--color-neutral-500);display:flex;align-items:center;padding:var(--spacing-4);border-radius:var(--radius-xs);flex-shrink:0;transition:background-color 0.15s}.close-btn:hover{background-color:var(--color-neutral-50);color:var(--color-neutral-700)}.close-btn:focus-visible{outline:var(--focus-width) solid var(--focus-color);outline-offset:var(--focus-offset)}.modal-body{padding:var(--spacing-24);overflow-y:auto;flex:1;font-family:var(--font-family-primary);font-size:var(--font-size-14);color:var(--color-neutral-500);line-height:1.6}.modal-footer{display:flex;align-items:center;justify-content:flex-end;gap:var(--spacing-8);padding:var(--spacing-16) var(--spacing-24);border-top:1px solid var(--color-neutral-100);flex-shrink:0}.btn-cancel{padding:0 var(--spacing-16);height:36px;font-family:var(--font-family-primary);font-size:var(--font-size-14);font-weight:var(--font-weight-semibold);background:transparent;border:1px solid var(--color-primary-500);border-radius:var(--radius-sm);color:var(--color-primary-500);cursor:pointer;transition:background-color 0.15s}.btn-cancel:hover{background-color:var(--color-primary-50)}.btn-cancel:focus-visible{outline:var(--focus-width) solid var(--focus-color);outline-offset:var(--focus-offset)}.btn-confirm{padding:0 var(--spacing-16);height:36px;font-family:var(--font-family-primary);font-size:var(--font-size-14);font-weight:var(--font-weight-semibold);background:var(--color-primary-500);border:none;border-radius:var(--radius-sm);color:var(--color-neutral-white);cursor:pointer;transition:background-color 0.15s}.btn-confirm:hover{background-color:var(--color-primary-600)}.btn-confirm:focus-visible{outline:var(--focus-width) solid var(--focus-color);outline-offset:var(--focus-offset)}@keyframes fb-fade-in{from{opacity:0}to{opacity:1}}@keyframes fb-modal-in{from{opacity:0;transform:translate(-50%, calc(-50% + 8px))}to{opacity:1;transform:translate(-50%, -50%)}}.size-fullscreen{animation-name:fb-fade-in}@media (prefers-reduced-motion: reduce){.fb-overlay,.fb-modal{animation:none}}`;

let idCounter$9 = 0;
const FbModal = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.fbClose = index.createEvent(this, "fbClose");
        this.fbConfirm = index.createEvent(this, "fbConfirm");
        this.open = false;
        this.size = 'default';
        this.heading = '';
        this.description = '';
        this.showFooter = true;
        this.closeOnOverlay = true;
        this.confirmLabel = 'Confirm';
        this.cancelLabel = 'Cancel';
        this.triggerElement = null;
        this.handleKeyDown = (e) => {
            var _a, _b, _c;
            if (!this.open)
                return;
            if (e.key === 'Escape') {
                e.preventDefault();
                this.close();
                return;
            }
            // Focus trap: keep Tab/Shift+Tab cycling within the modal
            if (e.key === 'Tab') {
                const modal = (_a = this.el.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.fb-modal');
                if (!modal)
                    return;
                const focusable = this.getFocusableElements(modal);
                if (focusable.length === 0) {
                    e.preventDefault();
                    return;
                }
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey) {
                    if (document.activeElement === first || ((_b = this.el.shadowRoot) === null || _b === void 0 ? void 0 : _b.activeElement) === first) {
                        e.preventDefault();
                        last.focus();
                    }
                }
                else {
                    if (document.activeElement === last || ((_c = this.el.shadowRoot) === null || _c === void 0 ? void 0 : _c.activeElement) === last) {
                        e.preventDefault();
                        first.focus();
                    }
                }
            }
        };
    }
    connectedCallback() {
        idCounter$9++;
        this.titleId = `fb-modal-title-${idCounter$9}`;
        this.descId = `fb-modal-desc-${idCounter$9}`;
    }
    onOpenChange(isOpen) {
        var _a;
        if (isOpen) {
            // Store the element that triggered the modal so we can return focus later
            this.triggerElement = document.activeElement;
            // Move focus into the modal after the next render
            requestAnimationFrame(() => this.focusFirstElement());
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = '';
            // Return focus to the trigger element
            (_a = this.triggerElement) === null || _a === void 0 ? void 0 : _a.focus();
            this.triggerElement = null;
        }
    }
    focusFirstElement() {
        var _a, _b;
        const modal = (_a = this.el.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.fb-modal');
        if (!modal)
            return;
        const focusable = this.getFocusableElements(modal);
        (_b = focusable[0]) === null || _b === void 0 ? void 0 : _b.focus();
    }
    getFocusableElements(container) {
        return Array.from(container.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(el => !el.closest('[hidden]'));
    }
    close() {
        this.fbClose.emit();
    }
    render() {
        if (!this.open)
            return index.h(index.Host, null);
        return (index.h(index.Host, { onKeyDown: this.handleKeyDown }, index.h("div", { class: "fb-overlay", "aria-hidden": "true", onClick: () => this.closeOnOverlay && this.close() }), index.h("div", { class: { 'fb-modal': true, [`size-${this.size}`]: true }, role: "dialog", "aria-modal": "true", "aria-labelledby": this.heading ? this.titleId : null, "aria-describedby": this.description ? this.descId : null, onClick: (e) => e.stopPropagation() }, index.h("div", { class: "modal-header" }, index.h("div", { class: "modal-heading-group" }, this.heading && (index.h("h2", { id: this.titleId, class: "modal-title" }, this.heading)), this.description && (index.h("p", { id: this.descId, class: "modal-description" }, this.description))), index.h("button", { type: "button", class: "close-btn", "aria-label": "Close dialog", onClick: () => this.close() }, index.h("svg", { "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 16 16", fill: "none" }, index.h("path", { d: "M3 3l10 10M13 3L3 13", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" })))), index.h("div", { class: "modal-body" }, index.h("slot", null)), this.showFooter && (index.h("div", { class: "modal-footer" }, index.h("button", { type: "button", class: "btn-cancel", onClick: () => this.close() }, this.cancelLabel), index.h("button", { type: "button", class: "btn-confirm", onClick: () => this.fbConfirm.emit() }, this.confirmLabel))))));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "open": [{
                "onOpenChange": 0
            }]
    }; }
};
FbModal.style = fbModalCss();

const fbPaginationCss = () => `:host{display:block}.fb-pagination{display:flex;align-items:center;gap:var(--spacing-4);font-family:var(--font-family-primary)}.page-btn{display:inline-flex;align-items:center;justify-content:center;min-width:36px;height:36px;padding:0 var(--spacing-4);border:1px solid var(--color-neutral-200);border-radius:var(--radius-sm);background:var(--color-neutral-white);color:var(--color-neutral-700);font-family:var(--font-family-primary);font-size:var(--font-size-14);cursor:pointer;transition:background-color 0.15s, border-color 0.15s}.page-btn:hover:not(:disabled){background-color:var(--color-neutral-50);border-color:var(--color-neutral-300)}.page-btn:focus-visible{outline:var(--focus-width) solid var(--focus-color);outline-offset:var(--focus-offset)}.page-btn:disabled{opacity:0.4;cursor:not-allowed}.page-btn.active{background-color:var(--color-primary-500);border-color:var(--color-primary-500);color:var(--color-neutral-white);font-weight:var(--font-weight-semibold)}.nav-btn{color:var(--color-neutral-500)}.ellipsis{display:inline-flex;align-items:center;justify-content:center;min-width:36px;height:36px;color:var(--color-neutral-500);font-size:var(--font-size-14);user-select:none}`;

const FbPagination = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.fbPageChange = index.createEvent(this, "fbPageChange");
        this.currentPage = 1;
        this.totalPages = 1;
        this.label = 'Pagination';
    }
    go(page) {
        if (page < 1 || page > this.totalPages || page === this.currentPage)
            return;
        this.currentPage = page;
        this.fbPageChange.emit(page);
    }
    getPages() {
        const total = this.totalPages;
        const cur = this.currentPage;
        if (total <= 7)
            return Array.from({ length: total }, (_, i) => i + 1);
        const pages = [1];
        if (cur > 3)
            pages.push('...');
        for (let i = Math.max(2, cur - 1); i <= Math.min(total - 1, cur + 1); i++)
            pages.push(i);
        if (cur < total - 2)
            pages.push('...');
        pages.push(total);
        return pages;
    }
    render() {
        const pages = this.getPages();
        const isFirst = this.currentPage === 1;
        const isLast = this.currentPage === this.totalPages;
        return (index.h(index.Host, { key: '17247fb2c383fdf4fec913604ea4dcae9d9d4c89' }, index.h("nav", { key: 'f49a89ea250d7fee3332c58691b2d03166301769', "aria-label": this.label, class: "fb-pagination" }, index.h("button", { key: '696bc555b6dffd5aca62126fa1663481fd022ce7', type: "button", class: "page-btn nav-btn", "aria-label": "Go to previous page", disabled: isFirst, "aria-disabled": isFirst ? 'true' : null, onClick: () => this.go(this.currentPage - 1) }, index.h("svg", { key: '1bfd4890fc18deb8cd3c1fddec042aee6f799e45', "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.8", "stroke-linecap": "round", "stroke-linejoin": "round" }, index.h("path", { key: '1b4512f0c1ca85f0a23594f8105450afe2462c6b', d: "M15 18l-6-6 6-6" }))), pages.map((page, i) => page === '...'
            ? index.h("span", { key: `ellipsis-${i}`, class: "ellipsis", "aria-hidden": "true" }, "\u2026")
            : (index.h("button", { key: page, type: "button", class: { 'page-btn': true, 'active': page === this.currentPage }, "aria-label": `Go to page ${page}`, "aria-current": page === this.currentPage ? 'page' : null, onClick: () => this.go(page) }, page))), index.h("button", { key: 'c13ddf981b05422ca2402c43e33b1a62db6cc010', type: "button", class: "page-btn nav-btn", "aria-label": "Go to next page", disabled: isLast, "aria-disabled": isLast ? 'true' : null, onClick: () => this.go(this.currentPage + 1) }, index.h("svg", { key: '3234c89a68bdd4bd25a9762cf23e980ebfd432c1', "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.8", "stroke-linecap": "round", "stroke-linejoin": "round" }, index.h("path", { key: 'dc06e763c32ee37ef636eb68bab9428ee39229cf', d: "M9 18l6-6-6-6" }))))));
    }
};
FbPagination.style = fbPaginationCss();

const fbPopoverCss = () => `:host{display:contents}.fb-popover-anchor{display:inline-flex;position:relative}.fb-popover-trigger{background:none;border:none;padding:0;cursor:pointer;font-family:var(--font-family-primary)}.fb-popover-trigger:focus-visible{outline:var(--focus-width) solid var(--focus-color);outline-offset:var(--focus-offset)}.fb-popover{position:absolute;z-index:60;min-width:240px;max-width:320px;background:var(--color-neutral-white);border:1px solid var(--color-neutral-200);border-radius:var(--radius-md);box-shadow:var(--shadow-300);padding:0}.fb-popover--bottom{top:calc(100% + 8px);left:0}.fb-popover--top{bottom:calc(100% + 8px);left:0}.fb-popover--right{left:calc(100% + 8px);top:0}.fb-popover--left{right:calc(100% + 8px);top:0}.fb-popover__header{display:flex;align-items:center;justify-content:space-between;padding:var(--spacing-12) var(--spacing-16) var(--spacing-8);border-bottom:1px solid var(--color-neutral-100)}.fb-popover__heading{font-family:var(--font-family-primary);font-size:var(--font-size-14);font-weight:var(--font-weight-semibold);color:var(--color-neutral-black)}.fb-popover__close{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;background:none;border:none;border-radius:var(--radius-xs);cursor:pointer;color:var(--color-neutral-500);padding:0;margin-left:auto}.fb-popover__close:hover{background:var(--color-neutral-100);color:var(--color-neutral-800)}.fb-popover__close:focus-visible{outline:var(--focus-width) solid var(--focus-color);outline-offset:var(--focus-offset)}.fb-popover__body{padding:var(--spacing-12) var(--spacing-16) var(--spacing-16);font-family:var(--font-family-primary);font-size:var(--font-size-14);color:var(--color-neutral-700)}`;

let idCounter$8 = 0;
const FbPopover = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.fbOpen = index.createEvent(this, "fbOpen");
        this.fbClose = index.createEvent(this, "fbClose");
        this.heading = '';
        this.placement = 'bottom';
        this.open = false;
        this._open = false;
        this.triggerEl = null;
        this.handleKeyDown = (e) => {
            var _a, _b;
            if (e.key === 'Escape') {
                e.preventDefault();
                this.closePopover();
                return;
            }
            if (e.key === 'Tab') {
                const focusable = this.getFocusableElements();
                if (focusable.length === 0)
                    return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey) {
                    if (document.activeElement === first || ((_a = this.el.shadowRoot) === null || _a === void 0 ? void 0 : _a.activeElement) === first) {
                        e.preventDefault();
                        last.focus();
                    }
                }
                else {
                    if (document.activeElement === last || ((_b = this.el.shadowRoot) === null || _b === void 0 ? void 0 : _b.activeElement) === last) {
                        e.preventDefault();
                        first.focus();
                    }
                }
            }
        };
    }
    connectedCallback() {
        idCounter$8++;
        this.triggerId = `fb-popover-trigger-${idCounter$8}`;
        this.popoverId = `fb-popover-content-${idCounter$8}`;
    }
    onOpenChange(val) {
        this._open = val;
    }
    onDocumentClick(e) {
        if (this._open && !this.el.contains(e.target))
            this.closePopover();
    }
    toggle() {
        this._open ? this.closePopover() : this.openPopover();
    }
    openPopover() {
        var _a, _b;
        this.triggerEl = (_b = (_a = this.el.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(`#${this.triggerId}`)) !== null && _b !== void 0 ? _b : null;
        this._open = true;
        this.fbOpen.emit();
        requestAnimationFrame(() => {
            var _a, _b;
            (_b = (_a = this.el.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.fb-popover__close')) === null || _b === void 0 ? void 0 : _b.focus();
        });
    }
    closePopover() {
        var _a;
        this._open = false;
        this.fbClose.emit();
        (_a = this.triggerEl) === null || _a === void 0 ? void 0 : _a.focus();
    }
    getFocusableElements() {
        var _a, _b;
        return Array.from((_b = (_a = this.el.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')) !== null && _b !== void 0 ? _b : []);
    }
    render() {
        return (index.h(index.Host, { key: '45c68f88cf3002f68ab2dbb361106cedd2ffcde3' }, index.h("span", { key: '52868074522371dcdc1fca800f434ab512b2e9de', class: "fb-popover-anchor" }, index.h("button", { key: 'cd9b96d8bfb7e932068daa02e954259d1995962a', id: this.triggerId, type: "button", "aria-haspopup": "dialog", "aria-expanded": this._open ? 'true' : 'false', "aria-controls": this._open ? this.popoverId : null, class: "fb-popover-trigger", onClick: () => this.toggle() }, index.h("slot", { key: '9dc468a1b2d2d312ac18d2064e86d1f24901ad19', name: "trigger" }, "Open")), this._open && (index.h("div", { key: '3676d972a5fd363372afa109eb111debb02b4f3a', id: this.popoverId, role: "dialog", "aria-modal": "false", "aria-label": this.heading || 'Popover', class: `fb-popover fb-popover--${this.placement}`, onKeyDown: this.handleKeyDown }, index.h("div", { key: 'd2ad8434d99247349a6a65a4c033106aa969805d', class: "fb-popover__header" }, this.heading && index.h("span", { key: 'c2bb41374c9cd0f49571b3812219a6dca57d50d1', class: "fb-popover__heading" }, this.heading), index.h("button", { key: 'eca2f693c6e2a58a7afb16f92e7a4a9a1b212c0d', type: "button", class: "fb-popover__close", "aria-label": "Close popover", onClick: () => this.closePopover() }, index.h("svg", { key: '94a56e8bb476c1d6b86156308cc1c35273334507', "aria-hidden": "true", width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, index.h("path", { key: '331cb45b78051635700de59732773d11514547c1', d: "M18 6L6 18M6 6l12 12" })))), index.h("div", { key: 'ee122cd14052e336e4c9bf9805bccbb205a6f8d5', class: "fb-popover__body" }, index.h("slot", { key: 'b2c2ccec0a9ef5f41c5726641871d34a54050617' })))))));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "open": [{
                "onOpenChange": 0
            }]
    }; }
};
FbPopover.style = fbPopoverCss();

const fbRadioGroupCss = () => `:host{display:block}.fb-radio-group{border:none;padding:0;margin:0;font-family:var(--font-family-primary)}.fb-legend{font-size:var(--font-size-14);font-weight:var(--font-weight-semibold);color:var(--color-neutral-700);margin-bottom:var(--spacing-8);padding:0}.options-list{display:flex;flex-direction:column;gap:var(--spacing-8)}.fb-radio-label{display:inline-flex;align-items:center;gap:var(--spacing-8);cursor:pointer;font-size:var(--font-size-14);color:var(--color-neutral-700)}.fb-radio-label.disabled{opacity:0.5;cursor:not-allowed}.native-radio{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}.native-radio:focus-visible+.radio-dot{outline:var(--focus-width) solid var(--focus-color);outline-offset:var(--focus-offset)}.radio-dot{width:18px;height:18px;border-radius:var(--radius-max);border:var(--border-standard) solid var(--color-neutral-400);background-color:var(--color-neutral-white);display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;transition:border-color 0.15s}.radio-dot::after{content:'';width:8px;height:8px;border-radius:var(--radius-max);background-color:transparent;transition:background-color 0.15s}.radio-dot.checked{border-color:var(--color-primary-500)}.radio-dot.checked::after{background-color:var(--color-primary-500)}.has-error .radio-dot{border-color:var(--color-danger-600)}.fb-helper{margin-top:var(--spacing-4);font-size:var(--font-size-12);color:var(--color-neutral-500)}.fb-helper--error{color:var(--color-danger-600)}`;

let idCounter$7 = 0;
const FbRadioGroup = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.fbChange = index.createEvent(this, "fbChange");
        /** Group label — rendered as <legend> inside a <fieldset> */
        this.label = '';
        this.options = '[]';
        this.value = '';
        this.required = false;
        this.disabled = false;
        this.helperText = '';
        this.state = 'default';
    }
    connectedCallback() {
        idCounter$7++;
        this.groupName = `fb-radio-group-${idCounter$7}`;
        this.helperId = `fb-radio-helper-${idCounter$7}`;
    }
    get parsedOptions() {
        if (typeof this.options === 'string') {
            try {
                return JSON.parse(this.options);
            }
            catch (_a) {
                return [];
            }
        }
        return this.options;
    }
    get isError() { return this.state === 'error'; }
    render() {
        const options = this.parsedOptions;
        const hasHelper = !!this.helperText;
        return (index.h(index.Host, { key: 'd2f0a4c4fda313063c52d5854e73a7ed0817cf81' }, index.h("fieldset", { key: '52b53763d30813bb8564f3fc555c1a8e00bac2b4', class: { 'fb-radio-group': true, 'has-error': this.isError }, disabled: this.disabled, "aria-describedby": hasHelper ? this.helperId : null, "aria-required": this.required ? 'true' : null }, index.h("legend", { key: '61d4795f2347314244399848cf4fdff66fe2adb6', class: "fb-legend" }, this.label || 'Select an option'), index.h("div", { key: '4b485fd0e61856627c4b5a7149b8a23f16aa9f8f', class: "options-list" }, options.map((opt) => {
            const optId = `${this.groupName}-${opt.value}`;
            return (index.h("label", { key: opt.value, htmlFor: optId, class: {
                    'fb-radio-label': true,
                    'disabled': opt.disabled || this.disabled,
                } }, index.h("input", { id: optId, type: "radio", name: this.groupName, value: opt.value, checked: this.value === opt.value, disabled: opt.disabled || this.disabled, required: this.required, class: "native-radio", onChange: () => {
                    this.value = opt.value;
                    this.fbChange.emit(opt.value);
                } }), index.h("span", { "aria-hidden": "true", class: { 'radio-dot': true, 'checked': this.value === opt.value } }), index.h("span", { class: "option-label" }, opt.label)));
        })), hasHelper && (index.h("div", { key: '80261067a09a820c6ae1813395aceccc3a4fe1a2', id: this.helperId, class: { 'fb-helper': true, 'fb-helper--error': this.isError }, role: this.isError ? 'alert' : null }, this.helperText)))));
    }
};
FbRadioGroup.style = fbRadioGroupCss();

const fbSelectCss = () => `.fb-label{display:flex;align-items:center;gap:var(--spacing-4);font-size:var(--font-size-14);font-weight:var(--font-weight-regular);color:var(--color-neutral-700);cursor:default}.required-indicator{color:var(--color-danger-600);font-weight:var(--font-weight-regular)}.fb-helper{display:flex;align-items:center;gap:var(--spacing-4);font-size:var(--font-size-12);color:var(--color-neutral-500)}.fb-helper--error{color:var(--color-danger-600)}.helper-icon{flex-shrink:0}:host{display:block}.fb-select-wrapper{display:flex;flex-direction:column;gap:var(--spacing-4);width:100%}.fb-select-trigger{display:flex;align-items:center;justify-content:space-between;width:100%;font-family:var(--font-family-primary);text-align:left;border:var(--border-standard) solid var(--color-neutral-400);border-radius:var(--radius-sm);background-color:var(--color-neutral-white);cursor:pointer;box-sizing:border-box;transition:border-color 0.15s}.fb-select-trigger:focus-visible{outline:var(--focus-width) solid var(--focus-color);outline-offset:var(--focus-offset)}.fb-select-trigger.open{border-color:var(--color-primary-500)}.fb-select-trigger.state-error{border-color:var(--color-danger-600);border-width:var(--border-thick)}.fb-select-trigger.state-disabled{background-color:var(--color-neutral-100);opacity:0.6;cursor:not-allowed}.size-sm{height:32px;padding:0 var(--spacing-8);font-size:var(--font-size-12)}.size-default{height:40px;padding:0 var(--spacing-12);font-size:var(--font-size-14)}.size-lg{height:48px;padding:0 var(--spacing-16);font-size:var(--font-size-16)}.trigger-text{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--color-neutral-600)}.fb-select-trigger.has-value .trigger-text{color:var(--color-neutral-black)}.chevron{display:flex;align-items:center;color:var(--color-neutral-600);transition:transform 0.2s;flex-shrink:0}.chevron--open{transform:rotate(180deg)}.fb-listbox{position:absolute;top:calc(100% + 4px);left:0;right:0;background-color:var(--color-neutral-white);border:var(--border-standard) solid var(--color-neutral-200);border-radius:var(--radius-sm);box-shadow:var(--shadow-200);z-index:50;overflow-y:auto;max-height:240px;padding:var(--spacing-4) 0;margin:0;list-style:none}.fb-option{display:flex;align-items:center;justify-content:space-between;padding:var(--spacing-8) var(--spacing-12);font-size:var(--font-size-14);font-family:var(--font-family-primary);color:var(--color-neutral-black);cursor:pointer;transition:background-color 0.1s}.fb-option:hover:not(.disabled){background-color:var(--color-neutral-50)}.fb-option.focused:not(.disabled){background-color:var(--color-primary-50)}.fb-option.selected{background-color:var(--color-primary-50);color:var(--color-primary-600)}.fb-option.disabled{opacity:0.4;cursor:not-allowed}`;

let idCounter$6 = 0;
const FbSelect = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.fbChange = index.createEvent(this, "fbChange");
        this.label = '';
        this.options = '[]';
        this.value = '';
        this.placeholder = 'Select an option';
        this.state = 'default';
        this.size = 'default';
        this.helperText = '';
        this.required = false;
        this.open = false;
        this.focusedIndex = -1;
        this.handleTriggerKeyDown = (e) => {
            const opts = this.parsedOptions.filter(o => !o.disabled);
            switch (e.key) {
                case 'Enter':
                case ' ':
                case 'ArrowDown':
                    e.preventDefault();
                    if (!this.open) {
                        this.open_();
                    }
                    else if (this.focusedIndex < opts.length - 1) {
                        this.focusedIndex++;
                    }
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    if (this.open && this.focusedIndex > 0) {
                        this.focusedIndex--;
                    }
                    break;
                case 'Home':
                    e.preventDefault();
                    if (this.open) {
                        this.focusedIndex = 0;
                    }
                    break;
                case 'End':
                    e.preventDefault();
                    if (this.open) {
                        this.focusedIndex = opts.length - 1;
                    }
                    break;
                case 'Escape':
                    e.preventDefault();
                    this.close();
                    break;
                case 'Tab':
                    if (this.open) {
                        this.close();
                    }
                    break;
                default:
                    // Type-ahead: jump to first option starting with pressed character
                    if (e.key.length === 1) {
                        const char = e.key.toLowerCase();
                        const idx = opts.findIndex((o, i) => i > this.focusedIndex && o.label.toLowerCase().startsWith(char));
                        const fallback = opts.findIndex(o => o.label.toLowerCase().startsWith(char));
                        const target = idx >= 0 ? idx : fallback;
                        if (target >= 0) {
                            this.focusedIndex = target;
                            if (!this.open)
                                this.open_();
                        }
                    }
            }
        };
        this.handleOptionKeyDown = (e, opt) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.selectOption(opt);
            }
        };
    }
    connectedCallback() {
        idCounter$6++;
        this.triggerId = `fb-select-trigger-${idCounter$6}`;
        this.listboxId = `fb-select-listbox-${idCounter$6}`;
        this.helperId = `fb-select-helper-${idCounter$6}`;
        this.labelId = `fb-select-label-${idCounter$6}`;
    }
    // Close on outside click
    onDocumentClick(e) {
        if (this.open && !this.el.contains(e.target)) {
            this.close();
        }
    }
    get parsedOptions() {
        if (typeof this.options === 'string') {
            try {
                return JSON.parse(this.options);
            }
            catch (_a) {
                return [];
            }
        }
        return this.options;
    }
    get isDisabled() { return this.state === 'disabled'; }
    get isError() { return this.state === 'error'; }
    get selectedOption() { return this.parsedOptions.find(o => o.value === this.value); }
    open_() {
        if (this.isDisabled)
            return;
        this.open = true;
        // Focus the currently selected option, or the first one
        const opts = this.parsedOptions.filter(o => !o.disabled);
        const selIdx = opts.findIndex(o => o.value === this.value);
        this.focusedIndex = selIdx >= 0 ? selIdx : 0;
    }
    close() {
        var _a, _b;
        this.open = false;
        this.focusedIndex = -1;
        // Return focus to trigger
        (_b = (_a = this.el.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(`#${this.triggerId}`)) === null || _b === void 0 ? void 0 : _b.focus();
    }
    selectOption(opt) {
        if (opt.disabled)
            return;
        this.value = opt.value;
        this.fbChange.emit(opt.value);
        this.close();
    }
    render() {
        var _a;
        const opts = this.parsedOptions;
        const enabledOpts = opts.filter(o => !o.disabled);
        const hasHelper = !!this.helperText;
        const activeId = this.open && this.focusedIndex >= 0
            ? `${this.listboxId}-opt-${(_a = enabledOpts[this.focusedIndex]) === null || _a === void 0 ? void 0 : _a.value}`
            : undefined;
        return (index.h(index.Host, { key: '3bbe86ccdf4523d2ec3f29961829d4af297698c8' }, index.h("div", { key: 'e703ac3823f68718dd1691f86f10994855f443cb', class: "fb-select-wrapper", style: { fontFamily: 'var(--font-family-primary)' } }, fieldHelpers.renderFieldLabel(this.label, this.required, this.triggerId, this.labelId), index.h("div", { key: '59a87b49af3e1c085643cda07aa04589e9bc1359', class: "fb-select-container", style: { position: 'relative' } }, index.h("button", { key: '63530fc441ae62f574ae99522f00c76e658f0830', id: this.triggerId, type: "button", role: "combobox", "aria-haspopup": "listbox", "aria-expanded": this.open ? 'true' : 'false', "aria-controls": this.listboxId, "aria-labelledby": this.label ? `${this.labelId} ${this.triggerId}` : null, "aria-activedescendant": activeId, "aria-required": this.required ? 'true' : null, "aria-invalid": this.isError ? 'true' : null, "aria-describedby": hasHelper ? this.helperId : null, disabled: this.isDisabled, class: {
                'fb-select-trigger': true,
                [`size-${this.size}`]: true,
                'open': this.open,
                'state-error': this.isError,
                'state-disabled': this.isDisabled,
                'has-value': !!this.selectedOption,
            }, onClick: () => this.open ? this.close() : this.open_(), onKeyDown: this.handleTriggerKeyDown }, index.h("span", { key: '057b181852a367e16e0b54637f33f07f89dabb0e', class: "trigger-text" }, this.selectedOption ? this.selectedOption.label : this.placeholder), index.h("span", { key: 'd5e4fd198c621a4f5de7aa64ab5ffb8200412686', "aria-hidden": "true", class: { 'chevron': true, 'chevron--open': this.open } }, index.h("svg", { key: '370a90ea05d8daf05cc1e0f1d313e815813fbab4', width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.8", "stroke-linecap": "round", "stroke-linejoin": "round" }, index.h("path", { key: 'f54b269df6dd75c29a0962dfef4f1b2447eeb98b', d: "M6 9l6 6 6-6" })))), this.open && (index.h("ul", { key: '1435dac6e64f743254d8cfbfb6a73180a03c605f', id: this.listboxId, role: "listbox", "aria-label": this.label || 'Options', class: "fb-listbox" }, opts.map((opt) => {
            var _a;
            const isSelected = this.value === opt.value;
            const isFocused = ((_a = enabledOpts[this.focusedIndex]) === null || _a === void 0 ? void 0 : _a.value) === opt.value;
            const optionId = `${this.listboxId}-opt-${opt.value}`;
            return (index.h("li", { key: opt.value, id: optionId, role: "option", "aria-selected": isSelected ? 'true' : 'false', "aria-disabled": opt.disabled ? 'true' : null, class: {
                    'fb-option': true,
                    'selected': isSelected,
                    'focused': isFocused,
                    'disabled': !!opt.disabled,
                }, onClick: () => this.selectOption(opt), onKeyDown: (e) => this.handleOptionKeyDown(e, opt) }, index.h("span", null, opt.label), isSelected && (index.h("svg", { "aria-hidden": "true", width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, index.h("path", { d: "M20 6L9 17l-5-5" })))));
        })))), fieldHelpers.renderHelperText(this.helperText, this.helperId, this.isError))));
    }
    get el() { return index.getElement(this); }
};
FbSelect.style = fbSelectCss();

const fbSeparatorCss = () => `:host{display:block}:host([orientation="vertical"]){display:inline-flex;align-self:stretch}.fb-separator{border:none;margin:0}.fb-separator--horizontal{width:100%;height:1px;background:var(--color-neutral-200);display:block}.fb-separator--vertical{width:1px;height:100%;background:var(--color-neutral-200);display:inline-block;align-self:stretch}.fb-separator--labeled{display:flex;align-items:center;gap:var(--spacing-12);height:auto;background:none}.fb-separator--labeled::before,.fb-separator--labeled::after{content:'';flex:1;height:1px;background:var(--color-neutral-200)}.fb-separator__label{font-family:var(--font-family-primary);font-size:var(--font-size-12);font-weight:var(--font-weight-medium);color:var(--color-neutral-500);white-space:nowrap;user-select:none}`;

const FbSeparator = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.orientation = 'horizontal';
        /** Provide a label to make this separator a section divider with a title. */
        this.label = '';
        /** When true the separator is purely decorative and hidden from AT. */
        this.decorative = true;
    }
    render() {
        if (this.label) {
            return (index.h(index.Host, null, index.h("div", { role: "separator", "aria-label": this.label, class: `fb-separator fb-separator--${this.orientation} fb-separator--labeled` }, index.h("span", { class: "fb-separator__label" }, this.label))));
        }
        return (index.h(index.Host, null, index.h("hr", { class: `fb-separator fb-separator--${this.orientation}`, "aria-hidden": this.decorative ? 'true' : null, role: this.decorative ? null : 'separator' })));
    }
};
FbSeparator.style = fbSeparatorCss();

const fbSideSheetCss = () => `:host{display:contents}.fb-side-sheet__overlay{position:fixed;inset:0;background:rgba(0, 0, 0, 0.4);z-index:200}.fb-side-sheet{position:fixed;top:0;bottom:0;z-index:201;display:flex;flex-direction:column;background:var(--color-neutral-white);box-shadow:var(--shadow-400);transition:transform 0.25s ease}.fb-side-sheet--right{right:0;transform:translateX(100%)}.fb-side-sheet--left{left:0;transform:translateX(-100%)}.fb-side-sheet--right.fb-side-sheet--open{transform:translateX(0)}.fb-side-sheet--left.fb-side-sheet--open{transform:translateX(0)}.fb-side-sheet--sm{width:320px}.fb-side-sheet--default{width:480px}.fb-side-sheet--lg{width:640px}@media (max-width: 640px){.fb-side-sheet{width:100% !important}}.fb-side-sheet__header{display:flex;align-items:center;justify-content:space-between;padding:var(--spacing-16) var(--spacing-24);border-bottom:1px solid var(--color-neutral-200);flex-shrink:0}.fb-side-sheet__heading{font-family:var(--font-family-primary);font-size:var(--font-size-18);font-weight:var(--font-weight-semibold);color:var(--color-neutral-black);margin:0}.fb-side-sheet__close{display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;background:none;border:none;border-radius:var(--radius-sm);cursor:pointer;color:var(--color-neutral-500);padding:0}.fb-side-sheet__close:hover{background:var(--color-neutral-100);color:var(--color-neutral-800)}.fb-side-sheet__close:focus-visible{outline:var(--focus-width) solid var(--focus-color);outline-offset:var(--focus-offset)}.fb-side-sheet__body{flex:1;overflow-y:auto;padding:var(--spacing-24);font-family:var(--font-family-primary);font-size:var(--font-size-14);color:var(--color-neutral-700)}.fb-side-sheet__footer{padding:var(--spacing-16) var(--spacing-24);border-top:1px solid var(--color-neutral-200);flex-shrink:0}.fb-side-sheet__footer:empty{display:none}@media (prefers-reduced-motion: reduce){.fb-side-sheet{transition:none}}`;

let idCounter$5 = 0;
const FbSideSheet = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.fbClose = index.createEvent(this, "fbClose");
        this.open = false;
        this.heading = '';
        this.side = 'right';
        this.size = 'default';
        this._open = false;
        this.triggerElement = null;
    }
    connectedCallback() {
        idCounter$5++;
        this.sheetId = `fb-side-sheet-${idCounter$5}`;
        this.headingId = `fb-side-sheet-heading-${idCounter$5}`;
    }
    onOpenChange(val) {
        var _a, _b;
        if (val && !this._open) {
            this.triggerElement = document.activeElement;
            this._open = true;
            document.body.style.overflow = 'hidden';
            requestAnimationFrame(() => {
                var _a, _b;
                (_b = (_a = this.el.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.fb-side-sheet__close')) === null || _b === void 0 ? void 0 : _b.focus();
            });
        }
        else if (!val && this._open) {
            this._open = false;
            document.body.style.overflow = '';
            (_b = (_a = this.triggerElement) === null || _a === void 0 ? void 0 : _a.focus) === null || _b === void 0 ? void 0 : _b.call(_a);
        }
    }
    onWindowKeydown(e) {
        if (!this._open)
            return;
        if (e.key === 'Escape') {
            e.preventDefault();
            this.close();
        }
        if (e.key === 'Tab') {
            this.trapFocus(e);
        }
    }
    trapFocus(e) {
        var _a, _b, _c;
        const focusable = Array.from((_b = (_a = this.el.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')) !== null && _b !== void 0 ? _b : []);
        if (focusable.length === 0)
            return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = (_c = this.el.shadowRoot) === null || _c === void 0 ? void 0 : _c.activeElement;
        if (e.shiftKey) {
            if (active === first) {
                e.preventDefault();
                last.focus();
            }
        }
        else {
            if (active === last) {
                e.preventDefault();
                first.focus();
            }
        }
    }
    close() {
        var _a, _b;
        this.open = false;
        this.fbClose.emit();
        this._open = false;
        document.body.style.overflow = '';
        (_b = (_a = this.triggerElement) === null || _a === void 0 ? void 0 : _a.focus) === null || _b === void 0 ? void 0 : _b.call(_a);
    }
    render() {
        if (!this._open && !this.open)
            return index.h(index.Host, null);
        return (index.h(index.Host, null, index.h("div", { class: "fb-side-sheet__overlay", "aria-hidden": "true", onClick: () => this.close() }), index.h("div", { id: this.sheetId, role: "dialog", "aria-modal": "true", "aria-labelledby": this.headingId, class: {
                'fb-side-sheet': true,
                [`fb-side-sheet--${this.side}`]: true,
                [`fb-side-sheet--${this.size}`]: true,
                'fb-side-sheet--open': this._open || this.open,
            } }, index.h("div", { class: "fb-side-sheet__header" }, this.heading
            ? index.h("h2", { id: this.headingId, class: "fb-side-sheet__heading" }, this.heading)
            : index.h("span", { id: this.headingId }, index.h("slot", { name: "heading" })), index.h("button", { type: "button", class: "fb-side-sheet__close", "aria-label": "Close panel", onClick: () => this.close() }, index.h("svg", { "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, index.h("path", { d: "M18 6L6 18M6 6l12 12" })))), index.h("div", { class: "fb-side-sheet__body" }, index.h("slot", null)), index.h("div", { class: "fb-side-sheet__footer" }, index.h("slot", { name: "footer" })))));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "open": [{
                "onOpenChange": 0
            }]
    }; }
};
FbSideSheet.style = fbSideSheetCss();

const fbSidebarCss = () => `:host{display:block}.fb-sidebar{display:flex;flex-direction:column;height:100%;width:240px;background:var(--color-neutral-white);border-right:1px solid var(--color-neutral-200);padding:var(--spacing-8) 0;transition:width 0.2s;overflow-x:hidden;overflow-y:auto}.fb-sidebar--collapsed{width:56px}.fb-sidebar__list,.fb-sidebar__submenu{list-style:none;margin:0;padding:0}.fb-sidebar__item{display:block}.fb-sidebar__link{display:flex;align-items:center;gap:var(--spacing-8);width:100%;padding:var(--spacing-8) var(--spacing-16);font-family:var(--font-family-primary);font-size:var(--font-size-14);color:var(--color-neutral-700);text-decoration:none;background:none;border:none;cursor:pointer;border-radius:var(--radius-sm);white-space:nowrap;transition:background-color 0.1s;text-align:left}.fb-sidebar__link:hover:not(:disabled):not(.fb-sidebar__link--disabled){background:var(--color-neutral-50);color:var(--color-neutral-900)}.fb-sidebar__link:focus-visible{outline:var(--focus-width) solid var(--focus-color);outline-offset:-2px}.fb-sidebar__link--active{background:var(--color-primary-50);color:var(--color-primary-700);font-weight:var(--font-weight-semibold)}.fb-sidebar__link--disabled{opacity:0.45;cursor:not-allowed}.fb-sidebar__link--depth-0{padding-left:var(--spacing-16)}.fb-sidebar__link--depth-1{padding-left:var(--spacing-32)}.fb-sidebar__link--depth-2{padding-left:var(--spacing-48)}.fb-sidebar__icon{display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;flex-shrink:0;color:inherit}.fb-sidebar__label{flex:1}.fb-sidebar__chevron{margin-left:auto;flex-shrink:0;transition:transform 0.2s}.fb-sidebar__chevron--open{transform:rotate(180deg)}.fb-sidebar__submenu{background:var(--color-neutral-50);border-left:2px solid var(--color-neutral-200);margin-left:var(--spacing-24)}@media (prefers-reduced-motion: reduce){.fb-sidebar{transition:none}.fb-sidebar__chevron{transition:none}}`;

let idCounter$4 = 0;
const FbSidebar = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.fbNavigate = index.createEvent(this, "fbNavigate");
        this.items = '[]';
        this.label = 'Main navigation';
        this.activeId = '';
        this.collapsed = false;
        this.expandedIds = new Set();
    }
    connectedCallback() {
        idCounter$4++;
        this._instanceId = idCounter$4;
    }
    get parsedItems() {
        if (typeof this.items === 'string') {
            try {
                return JSON.parse(this.items);
            }
            catch (_a) {
                return [];
            }
        }
        return this.items;
    }
    toggleExpand(id) {
        const next = new Set(this.expandedIds);
        next.has(id) ? next.delete(id) : next.add(id);
        this.expandedIds = next;
    }
    navigate(item) {
        if (item.disabled)
            return;
        this.activeId = item.id;
        this.fbNavigate.emit(item.id);
    }
    panelId(id) { return `fb-sidebar-panel-${this._instanceId}-${id}`; }
    triggerId(id) { return `fb-sidebar-trigger-${this._instanceId}-${id}`; }
    renderItems(items, depth = 0) {
        return items.map(item => {
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = this.expandedIds.has(item.id);
            const isActive = this.activeId === item.id;
            return (index.h("li", { key: item.id, class: "fb-sidebar__item" }, hasChildren ? (index.h("div", null, index.h("button", { id: this.triggerId(item.id), type: "button", "aria-expanded": isExpanded ? 'true' : 'false', "aria-controls": this.panelId(item.id), disabled: item.disabled, class: {
                    'fb-sidebar__link': true,
                    'fb-sidebar__link--group': true,
                    [`fb-sidebar__link--depth-${depth}`]: true,
                    'fb-sidebar__link--disabled': !!item.disabled,
                }, onClick: () => this.toggleExpand(item.id) }, item.icon && index.h("span", { class: "fb-sidebar__icon", "aria-hidden": "true", innerHTML: item.icon }), !this.collapsed && index.h("span", { class: "fb-sidebar__label" }, item.label), !this.collapsed && (index.h("svg", { "aria-hidden": "true", class: { 'fb-sidebar__chevron': true, 'fb-sidebar__chevron--open': isExpanded }, width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, index.h("path", { d: "M6 9l6 6 6-6" })))), isExpanded && (index.h("ul", { id: this.panelId(item.id), role: "list", class: "fb-sidebar__submenu" }, this.renderItems(item.children, depth + 1))))) : (item.href
                ? (index.h("a", { href: item.href, "aria-current": isActive ? 'page' : null, "aria-disabled": item.disabled ? 'true' : null, class: {
                        'fb-sidebar__link': true,
                        'fb-sidebar__link--active': isActive,
                        [`fb-sidebar__link--depth-${depth}`]: true,
                        'fb-sidebar__link--disabled': !!item.disabled,
                    }, onClick: (e) => { e.preventDefault(); this.navigate(item); } }, item.icon && index.h("span", { class: "fb-sidebar__icon", "aria-hidden": "true", innerHTML: item.icon }), !this.collapsed && index.h("span", { class: "fb-sidebar__label" }, item.label)))
                : (index.h("button", { type: "button", "aria-current": isActive ? 'page' : null, disabled: item.disabled, class: {
                        'fb-sidebar__link': true,
                        'fb-sidebar__link--active': isActive,
                        [`fb-sidebar__link--depth-${depth}`]: true,
                        'fb-sidebar__link--disabled': !!item.disabled,
                    }, onClick: () => this.navigate(item) }, item.icon && index.h("span", { class: "fb-sidebar__icon", "aria-hidden": "true", innerHTML: item.icon }), !this.collapsed && index.h("span", { class: "fb-sidebar__label" }, item.label))))));
        });
    }
    render() {
        const items = this.parsedItems;
        return (index.h(index.Host, { key: 'aabf63be5d3e2cb6edd974df994926b02d2feaf1' }, index.h("nav", { key: '5e1e21a12ea4cbac29c5810ab8e347d102de278e', "aria-label": this.label, class: { 'fb-sidebar': true, 'fb-sidebar--collapsed': this.collapsed } }, index.h("ul", { key: '17513d7b279cb9bb583b6a5d97d18e8478e387e8', role: "list", class: "fb-sidebar__list" }, this.renderItems(items)), index.h("slot", { key: 'd8a55e0c0d3e204d3ce79310fedda0b4ae1eb969', name: "footer" }))));
    }
};
FbSidebar.style = fbSidebarCss();

const fbSkeletonCss = () => `:host{display:block}.fb-skeleton{display:block;background:linear-gradient(     90deg,     var(--color-neutral-100) 25%,     var(--color-neutral-50)  50%,     var(--color-neutral-100) 75%   );background-size:200% 100%;animation:fb-shimmer 1.4s ease-in-out infinite}.variant-text{border-radius:var(--radius-xs)}.variant-rect{border-radius:var(--radius-sm)}.variant-circle{border-radius:var(--radius-max)}@keyframes fb-shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}@media (prefers-reduced-motion: reduce){.fb-skeleton{animation:none;opacity:0.6}}`;

const FbSkeleton = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        /** Shape of the skeleton placeholder */
        this.variant = 'text';
        /** Width — any CSS value e.g. "200px", "100%", "12rem" */
        this.width = '100%';
    }
    render() {
        const style = {
            width: this.width,
            height: this.height || (this.variant === 'text' ? '1em' : this.variant === 'circle' ? this.width : '80px'),
        };
        return (index.h(index.Host, { key: '3b6e25acdc3bd3b6a8952aa85745d622b23e3741' }, index.h("span", { key: 'b5a5a517b82211e59209512f5b6c2dc8f8d8dfce', "aria-hidden": "true", class: { 'fb-skeleton': true, [`variant-${this.variant}`]: true }, style: style })));
    }
};
FbSkeleton.style = fbSkeletonCss();

const fbSpinnerCss = () => `:host{display:inline-flex}.fb-spinner{display:inline-flex;align-items:center;justify-content:center}.spinner-svg{animation:fb-spin 0.75s linear infinite}.track{stroke:var(--color-neutral-200)}.arc{stroke:var(--color-primary-500)}.size-sm .spinner-svg{width:16px;height:16px}.size-default .spinner-svg{width:24px;height:24px}.size-lg .spinner-svg{width:36px;height:36px}.fb-spinner .spinner-svg{width:24px;height:24px}@keyframes fb-spin{to{transform:rotate(360deg)}}@media (prefers-reduced-motion: reduce){.spinner-svg{animation-duration:2s}}.visually-hidden{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border:0}`;

const FbSpinner = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        /** Size of the spinner */
        this.size = 'default';
        /** Accessible label announced to screen readers */
        this.label = 'Loading, please wait';
    }
    render() {
        return (index.h(index.Host, { key: '9651a8c17ef4fa4fb615c5f9b92e5a22cc2118d6' }, index.h("span", { key: '417c95ba1acb54da1dcf9ac64f4cc6881c409386', role: "status", "aria-label": this.label, class: { 'fb-spinner': true, [`size-${this.size}`]: true } }, index.h("svg", { key: '74051d76be7c1913a93115fc1d50c1c9d90e2140', "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", class: "spinner-svg" }, index.h("circle", { key: '5d85bf9351a5818b6ce5ddb0a76b3f1e7da8ce7f', class: "track", cx: "12", cy: "12", r: "10", "stroke-width": "2.5" }), index.h("path", { key: '704033688558476f78034933aef8aacc871d824b', class: "arc", d: "M12 2a10 10 0 0 1 10 10", "stroke-width": "2.5", "stroke-linecap": "round" })), index.h("span", { key: '2b2a77a99be9f7de2df583f8cf3edb4dc5b125c6', class: "visually-hidden" }, this.label))));
    }
};
FbSpinner.style = fbSpinnerCss();

const fbSwitchCss = () => `.fb-label{display:flex;align-items:center;gap:var(--spacing-4);font-size:var(--font-size-14);font-weight:var(--font-weight-regular);color:var(--color-neutral-700);cursor:default}.required-indicator{color:var(--color-danger-600);font-weight:var(--font-weight-regular)}.fb-helper{display:flex;align-items:center;gap:var(--spacing-4);font-size:var(--font-size-12);color:var(--color-neutral-500)}.fb-helper--error{color:var(--color-danger-600)}.helper-icon{flex-shrink:0}:host{display:block}.fb-switch-wrapper{display:flex;flex-direction:column;gap:var(--spacing-4);font-family:var(--font-family-primary)}.fb-switch-label{display:inline-flex;align-items:center;gap:var(--spacing-8);cursor:pointer}.fb-switch-label.disabled{opacity:0.5;cursor:not-allowed}.native-switch{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}.native-switch:focus-visible+.switch-track{outline:var(--focus-width) solid var(--focus-color);outline-offset:var(--focus-offset)}.switch-track{position:relative;width:44px;height:24px;border-radius:var(--radius-max);background-color:var(--color-neutral-300);transition:background-color 0.2s;flex-shrink:0}.switch-track.on{background-color:var(--color-primary-500)}.switch-thumb{position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:var(--radius-max);background-color:white;box-shadow:0 1px 3px rgba(0,0,0,0.2);transition:transform 0.2s}.switch-track.on .switch-thumb{transform:translateX(20px)}.label-text{font-size:var(--font-size-14);color:var(--color-neutral-700)}.fb-helper{padding-left:52px}`;

let idCounter$3 = 0;
const FbSwitch = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.fbChange = index.createEvent(this, "fbChange");
        /** Visible label */
        this.label = '';
        this.checked = false;
        this.disabled = false;
        this.helperText = '';
    }
    connectedCallback() {
        idCounter$3++;
        this.switchId = `fb-switch-${idCounter$3}`;
        this.helperId = `fb-switch-helper-${idCounter$3}`;
    }
    render() {
        const hasHelper = !!this.helperText;
        return (index.h(index.Host, { key: '1f20ad8e9908e49a6f555f065fe73acb3c577d62' }, index.h("div", { key: 'cc49c559d29f3df52740ca155b13582d71256f10', class: "fb-switch-wrapper" }, index.h("label", { key: '1c70923ed593c912c4724451e78a7e8d895bdfc0', htmlFor: this.switchId, class: { 'fb-switch-label': true, 'disabled': this.disabled } }, index.h("input", { key: 'd234efe828b758cf684f1d39bcb6ebc7f0463476', id: this.switchId, type: "checkbox", role: "switch", checked: this.checked, disabled: this.disabled, "aria-label": !this.label ? 'Toggle' : null, "aria-checked": this.checked ? 'true' : 'false', "aria-describedby": hasHelper ? this.helperId : null, class: "native-switch", onChange: (e) => {
                this.checked = e.target.checked;
                this.fbChange.emit(this.checked);
            } }), index.h("span", { key: '78bcbd1b78eddf650452a6a6e4c43cc5c15c6e9c', "aria-hidden": "true", class: { 'switch-track': true, 'on': this.checked } }, index.h("span", { key: '65ab5bc9886bae3b1c046d6d48210e92cc47a83e', class: "switch-thumb" })), this.label && index.h("span", { key: '17d67d16afeb29260fb06d28e6f9c4f036952dfd', class: "label-text" }, this.label)), fieldHelpers.renderHelperText(this.helperText, this.helperId, false))));
    }
};
FbSwitch.style = fbSwitchCss();

const fbTabsCss = () => `:host{display:block}.fb-tablist{display:flex;align-items:center}.variant-underline{border-bottom:1px solid var(--color-neutral-400);gap:0}.variant-pill{background:var(--color-primary-50);padding:var(--spacing-4);border-radius:var(--radius-sm);gap:var(--spacing-4)}.fb-tablist.full-width{width:100%}.fb-tab{background:transparent;border:none;cursor:pointer;font-family:var(--font-family-primary);font-weight:var(--font-weight-regular);color:var(--color-neutral-500);white-space:nowrap;transition:color 0.15s, background-color 0.15s;outline-offset:-2px}.fb-tab:focus-visible{outline:var(--focus-width) solid var(--focus-color);border-radius:var(--radius-xs)}.fb-tab.full-width{flex:1;text-align:center}.size-sm{font-size:var(--font-size-12);padding:6px var(--spacing-12)}.size-default{font-size:var(--font-size-14);padding:10px var(--spacing-16)}.size-lg{font-size:var(--font-size-16);padding:var(--spacing-12) var(--spacing-20)}.variant-underline .fb-tab{border-bottom:2px solid transparent;margin-bottom:-1px;border-radius:0}.variant-underline .fb-tab:hover:not(.disabled):not(.active){color:var(--color-neutral-700);border-bottom-color:var(--color-neutral-200)}.variant-underline .fb-tab.active{color:var(--color-primary-500);font-weight:var(--font-weight-semibold);border-bottom-color:var(--color-primary-500)}.variant-pill .fb-tab{border-radius:var(--radius-xs);border:1px solid transparent}.variant-pill .fb-tab:hover:not(.disabled):not(.active){background-color:color-mix(in srgb, var(--color-primary-100) 50%, transparent)}.variant-pill .fb-tab.active{background-color:var(--color-neutral-white);border-color:var(--color-primary-500);color:var(--color-primary-600);font-weight:var(--font-weight-semibold)}.fb-tab.disabled{opacity:0.4;cursor:not-allowed}.fb-tabpanel{padding-top:var(--spacing-16);font-family:var(--font-family-primary);outline:none}.fb-tabpanel:focus-visible{outline:var(--focus-width) solid var(--focus-color);outline-offset:var(--focus-offset);border-radius:var(--radius-xs)}`;

let idCounter$2 = 0;
const FbTabs = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.fbTabChange = index.createEvent(this, "fbTabChange");
        this.tabs = '[]';
        this.activeTab = '';
        this.variant = 'underline';
        this.size = 'default';
        this.fullWidth = false;
        this.label = 'Page sections';
        this._activeTab = '';
        this.handleKeyDown = (e, currentIndex) => {
            var _a, _b;
            const enabled = this.parsedTabs.filter(t => !t.disabled);
            const pos = enabled.findIndex(t => { var _a; return t.id === ((_a = this.parsedTabs[currentIndex]) === null || _a === void 0 ? void 0 : _a.id); });
            let target;
            switch (e.key) {
                case 'ArrowRight':
                    e.preventDefault();
                    target = enabled[(pos + 1) % enabled.length];
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    target = enabled[(pos - 1 + enabled.length) % enabled.length];
                    break;
                case 'Home':
                    e.preventDefault();
                    target = enabled[0];
                    break;
                case 'End':
                    e.preventDefault();
                    target = enabled[enabled.length - 1];
                    break;
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    this.activate(this.parsedTabs[currentIndex].id);
                    return;
            }
            if (target) {
                this.activate(target.id);
                // Move DOM focus to the newly active tab button
                const tabEl = (_b = (_a = this.el) === null || _a === void 0 ? void 0 : _a.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector(`#${this.tabId(target.id)}`);
                tabEl === null || tabEl === void 0 ? void 0 : tabEl.focus();
            }
        };
    }
    connectedCallback() {
        var _a;
        idCounter$2++;
        this.baseId = `fb-tabs-${idCounter$2}`;
        this._activeTab = this.activeTab || ((_a = this.parsedTabs.find(t => !t.disabled)) === null || _a === void 0 ? void 0 : _a.id) || '';
    }
    get parsedTabs() {
        if (typeof this.tabs === 'string') {
            try {
                return JSON.parse(this.tabs);
            }
            catch (_a) {
                return [];
            }
        }
        return this.tabs;
    }
    tabId(id) { return `${this.baseId}-tab-${id}`; }
    panelId(id) { return `${this.baseId}-panel-${id}`; }
    activate(id) {
        this._activeTab = id;
        this.fbTabChange.emit(id);
    }
    render() {
        var _a;
        const tabs = this.parsedTabs;
        const active = this._activeTab || ((_a = tabs.find(t => !t.disabled)) === null || _a === void 0 ? void 0 : _a.id);
        return (index.h(index.Host, { key: '926c16d554589ecaaf090fb4854b5611408151fd', ref: (el) => this.el = el }, index.h("div", { key: 'f50215b17fa23d471f25d21d91bc0934e58a8920', role: "tablist", "aria-label": this.label, class: {
                'fb-tablist': true,
                [`variant-${this.variant}`]: true,
                'full-width': this.fullWidth,
            } }, tabs.map((tab, index$1) => {
            const isActive = tab.id === active;
            const isDisabled = !!tab.disabled;
            return (index.h("button", { key: tab.id, id: this.tabId(tab.id), role: "tab", "aria-selected": isActive ? 'true' : 'false', "aria-controls": this.panelId(tab.id), "aria-disabled": isDisabled ? 'true' : null, tabindex: isActive ? 0 : -1, disabled: isDisabled, class: {
                    'fb-tab': true,
                    [`size-${this.size}`]: true,
                    'active': isActive,
                    'disabled': isDisabled,
                    'full-width': this.fullWidth,
                }, onClick: () => !isDisabled && this.activate(tab.id), onKeyDown: (e) => !isDisabled && this.handleKeyDown(e, index$1) }, tab.label));
        })), tabs.map((tab) => (index.h("div", { key: tab.id, id: this.panelId(tab.id), role: "tabpanel", "aria-labelledby": this.tabId(tab.id), tabindex: 0, hidden: tab.id !== active, class: "fb-tabpanel" }, index.h("slot", { name: tab.id }))))));
    }
};
FbTabs.style = fbTabsCss();

const fbTextareaCss = () => `.fb-label{display:flex;align-items:center;gap:var(--spacing-4);font-size:var(--font-size-14);font-weight:var(--font-weight-regular);color:var(--color-neutral-700);cursor:default}.required-indicator{color:var(--color-danger-600);font-weight:var(--font-weight-regular)}.fb-helper{display:flex;align-items:center;gap:var(--spacing-4);font-size:var(--font-size-12);color:var(--color-neutral-500)}.fb-helper--error{color:var(--color-danger-600)}.helper-icon{flex-shrink:0}:host{display:block}.fb-textarea-wrapper{display:flex;flex-direction:column;gap:var(--spacing-4);font-family:var(--font-family-primary);width:100%}.fb-textarea{width:100%;font-family:var(--font-family-primary);color:var(--color-neutral-black);border:var(--border-standard) solid var(--color-neutral-400);border-radius:var(--radius-sm);background-color:var(--color-neutral-white);resize:vertical;box-sizing:border-box;transition:border-color 0.15s, box-shadow 0.15s;outline:none}.size-sm{font-size:var(--font-size-12);padding:var(--spacing-8)}.size-default{font-size:var(--font-size-14);padding:var(--spacing-12)}.size-lg{font-size:var(--font-size-16);padding:var(--spacing-16)}.fb-textarea:focus-visible{border-color:var(--color-primary-500);box-shadow:0 0 0 var(--focus-width) color-mix(in srgb, var(--focus-color) 20%, transparent)}.state-error{border-color:var(--color-danger-600);border-width:var(--border-thick)}.state-disabled{background-color:var(--color-neutral-100);border-color:var(--color-neutral-200);opacity:0.6;cursor:not-allowed}.state-readonly{background-color:var(--color-neutral-50)}.fb-textarea::placeholder{color:var(--color-neutral-600)}.fb-textarea-footer{display:flex;justify-content:space-between;align-items:flex-start}.fb-counter{font-size:var(--font-size-12);color:var(--color-neutral-500);margin-left:auto}.fb-counter--limit{color:var(--color-danger-600);font-weight:var(--font-weight-semibold)}`;

let idCounter$1 = 0;
const FbTextarea = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.fbChange = index.createEvent(this, "fbChange");
        this.fbFocus = index.createEvent(this, "fbFocus");
        this.fbBlur = index.createEvent(this, "fbBlur");
        /** Visible label — always provide for accessibility */
        this.label = '';
        this.size = 'default';
        this.state = 'default';
        this.placeholder = '';
        this.value = '';
        this.helperText = '';
        this.required = false;
        /** Number of visible text rows */
        this.rows = 4;
    }
    connectedCallback() {
        idCounter$1++;
        this.textareaId = `fb-textarea-${idCounter$1}`;
        this.helperId = `fb-textarea-helper-${idCounter$1}`;
    }
    get isDisabled() { return this.state === 'disabled'; }
    get isReadOnly() { return this.state === 'read-only'; }
    get isError() { return this.state === 'error'; }
    render() {
        var _a, _b;
        const hasHelper = !!this.helperText;
        const charCount = (_b = (_a = this.value) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
        const showCounter = !!this.maxLength;
        const counterId = showCounter ? `${this.textareaId}-counter` : null;
        const describedBy = [hasHelper ? this.helperId : null, counterId].filter(Boolean).join(' ') || null;
        return (index.h(index.Host, { key: 'c2bf79e082bf30306b2506bcc3095ccf7785c22f' }, index.h("div", { key: 'bc55a222165d2f7b3c22f9c2923831a1f7a4a233', class: "fb-textarea-wrapper" }, fieldHelpers.renderFieldLabel(this.label, this.required, this.textareaId), index.h("textarea", { key: 'd100ecfa79137deaffd98c8c968d637de86cbe9c', id: this.textareaId, rows: this.rows, placeholder: this.placeholder, disabled: this.isDisabled, readOnly: this.isReadOnly, required: this.required, maxLength: this.maxLength, "aria-required": this.required ? 'true' : null, "aria-invalid": this.isError ? 'true' : null, "aria-describedby": describedBy, class: {
                'fb-textarea': true,
                [`size-${this.size}`]: true,
                'state-error': this.isError,
                'state-disabled': this.isDisabled,
                'state-readonly': this.isReadOnly,
            }, onInput: (e) => {
                const val = e.target.value;
                this.value = val;
                this.fbChange.emit(val);
            }, onFocus: () => this.fbFocus.emit(), onBlur: () => this.fbBlur.emit() }, this.value), index.h("div", { key: 'c2bbb35e7cba35cbda4b9ba5aea953fb7a08fdf8', class: "fb-textarea-footer" }, fieldHelpers.renderHelperText(this.helperText, this.helperId, this.isError), showCounter && (
        // aria-live="polite" announces the count as the user types
        index.h("div", { key: 'bc64d0193c45f762758472053367f64f9eaa5f7c', id: counterId, class: { 'fb-counter': true, 'fb-counter--limit': charCount >= this.maxLength }, "aria-live": "polite" }, charCount, "/", this.maxLength))))));
    }
};
FbTextarea.style = fbTextareaCss();

const fbTimelineCss = () => `:host{display:block}.fb-timeline{list-style:none;margin:0;padding:0;font-family:var(--font-family-primary)}.fb-timeline--vertical .fb-timeline__item{display:grid;grid-template-columns:32px 1fr;gap:0 var(--spacing-12);position:relative}.fb-timeline--vertical .fb-timeline__item:not(:last-child){padding-bottom:var(--spacing-24)}.fb-timeline__indicator{display:flex;flex-direction:column;align-items:center}.fb-timeline__dot{display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;flex-shrink:0;border:2px solid var(--color-neutral-300);background:var(--color-neutral-white);color:var(--color-neutral-white)}.fb-timeline__dot--complete{background:var(--color-success-500);border-color:var(--color-success-500)}.fb-timeline__dot--active{background:var(--color-primary-500);border-color:var(--color-primary-500)}.fb-timeline__dot--pending{background:var(--color-neutral-white);border-color:var(--color-neutral-300)}.fb-timeline__dot-inner{width:8px;height:8px;border-radius:50%;background:var(--color-neutral-white)}.fb-timeline__line{flex:1;width:2px;background:var(--color-neutral-200);margin:var(--spacing-4) 0;min-height:var(--spacing-16)}.fb-timeline__content{padding-top:var(--spacing-4)}.fb-timeline__timestamp{display:block;font-size:var(--font-size-12);color:var(--color-neutral-500);margin-bottom:var(--spacing-2)}.fb-timeline__title{margin:0;font-size:var(--font-size-14);font-weight:var(--font-weight-semibold);color:var(--color-neutral-black)}.fb-timeline__description{margin:var(--spacing-4) 0 0;font-size:var(--font-size-14);color:var(--color-neutral-600);line-height:1.5}.fb-timeline--horizontal{display:flex;align-items:flex-start;overflow-x:auto}.fb-timeline--horizontal .fb-timeline__item{display:flex;flex-direction:column;align-items:center;flex:1;min-width:120px;padding:0 var(--spacing-8)}.fb-timeline--horizontal .fb-timeline__indicator{flex-direction:row;width:100%;align-items:center;margin-bottom:var(--spacing-8)}.fb-timeline--horizontal .fb-timeline__line{flex:1;width:auto;height:2px;margin:0 var(--spacing-4);min-height:unset}.fb-timeline--horizontal .fb-timeline__content{text-align:center;padding-top:0}`;

const FbTimeline = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.items = '[]';
        this.label = 'Timeline';
        this.orientation = 'vertical';
    }
    get parsedItems() {
        if (typeof this.items === 'string') {
            try {
                return JSON.parse(this.items);
            }
            catch (_a) {
                return [];
            }
        }
        return this.items;
    }
    statusIcon(status) {
        if (status === 'complete') {
            return (index.h("svg", { "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2.5", "stroke-linecap": "round", "stroke-linejoin": "round" }, index.h("path", { d: "M20 6L9 17l-5-5" })));
        }
        if (status === 'active') {
            return index.h("span", { class: "fb-timeline__dot-inner" });
        }
        return null;
    }
    render() {
        const items = this.parsedItems;
        return (index.h(index.Host, { key: '0d9f0e9173042f197772277da647ff25f1f9b6e8' }, index.h("ol", { key: 'd3a7bc356c2966a2482e8baee87827bdc7f0f48e', "aria-label": this.label, class: `fb-timeline fb-timeline--${this.orientation}` }, items.map((item, i) => {
            var _a, _b, _c;
            return (index.h("li", { key: item.id, class: {
                    'fb-timeline__item': true,
                    [`fb-timeline__item--${(_a = item.status) !== null && _a !== void 0 ? _a : 'pending'}`]: true,
                    'fb-timeline__item--last': i === items.length - 1,
                } }, index.h("div", { class: "fb-timeline__indicator", "aria-hidden": "true" }, index.h("span", { class: `fb-timeline__dot fb-timeline__dot--${(_b = item.status) !== null && _b !== void 0 ? _b : 'pending'}` }, this.statusIcon((_c = item.status) !== null && _c !== void 0 ? _c : 'pending')), i < items.length - 1 && index.h("span", { class: "fb-timeline__line" })), index.h("div", { class: "fb-timeline__content" }, item.timestamp && (index.h("time", { class: "fb-timeline__timestamp" }, item.timestamp)), index.h("p", { class: "fb-timeline__title" }, item.title), item.description && (index.h("p", { class: "fb-timeline__description" }, item.description)))));
        }))));
    }
};
FbTimeline.style = fbTimelineCss();

const fbToastCss = () => `:host{display:block;position:fixed;bottom:var(--spacing-24);right:var(--spacing-24);z-index:200;max-width:400px;min-width:280px}.fb-toast{display:flex;align-items:center;gap:var(--spacing-12);padding:var(--spacing-12) var(--spacing-16);border-radius:var(--radius-sm);box-shadow:var(--shadow-900);font-family:var(--font-family-primary);font-size:var(--font-size-14);animation:fb-toast-in 0.2s ease-out;border:1px solid transparent}.variant-info{background:var(--color-primary-50);border-color:var(--color-primary-200);color:var(--color-primary-700)}.variant-success{background:var(--color-success-50);border-color:var(--color-success-200);color:var(--color-success-700)}.variant-warning{background:var(--color-warning-50);border-color:var(--color-warning-200);color:var(--color-warning-700)}.variant-danger{background:var(--color-danger-50);border-color:var(--color-danger-200);color:var(--color-danger-700)}.animating-out{animation:fb-toast-out 0.2s ease-in forwards}.toast-icon{display:flex;flex-shrink:0}.toast-message{flex:1}.dismiss-btn{background:none;border:none;cursor:pointer;color:inherit;opacity:0.6;display:flex;align-items:center;padding:2px;border-radius:var(--radius-xs);flex-shrink:0}.dismiss-btn:hover{opacity:1}.dismiss-btn:focus-visible{outline:var(--focus-width) solid currentColor;outline-offset:var(--focus-offset)}@keyframes fb-toast-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}@keyframes fb-toast-out{from{opacity:1}to{opacity:0;transform:translateY(4px)}}@media (prefers-reduced-motion: reduce){.fb-toast,.animating-out{animation:none}}`;

const FbToast = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.fbDismiss = index.createEvent(this, "fbDismiss");
        this.variant = 'info';
        this.message = '';
        this.visible = false;
        /** Auto-dismiss delay in ms. 0 = no auto-dismiss. Minimum recommended: 5000 */
        this.duration = 6000;
        this.animatingOut = false;
        this.dismiss = () => {
            this.animatingOut = true;
            setTimeout(() => {
                this.animatingOut = false;
                this.fbDismiss.emit();
            }, 200);
        };
    }
    onVisibleChange(newVal) {
        if (newVal && this.duration > 0) {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => this.dismiss(), this.duration);
        }
    }
    disconnectedCallback() {
        clearTimeout(this.timer);
    }
    render() {
        if (!this.visible)
            return null;
        return (index.h(index.Host, null, index.h("div", { role: "status", "aria-live": "polite", "aria-atomic": "true", class: {
                'fb-toast': true,
                [`variant-${this.variant}`]: true,
                'animating-out': this.animatingOut,
            } }, index.h("span", { class: "toast-icon", "aria-hidden": "true" }, this.variant === 'info' && index.h("svg", { width: "16", height: "16", viewBox: "0 0 18 18", fill: "none" }, index.h("circle", { cx: "9", cy: "9", r: "8", stroke: "currentColor", "stroke-width": "1.5" }), index.h("path", { d: "M9 8v5", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" }), index.h("circle", { cx: "9", cy: "5.5", r: ".75", fill: "currentColor" })), this.variant === 'success' && index.h("svg", { width: "16", height: "16", viewBox: "0 0 18 18", fill: "none" }, index.h("circle", { cx: "9", cy: "9", r: "8", stroke: "currentColor", "stroke-width": "1.5" }), index.h("path", { d: "M5.5 9l2.5 2.5 4.5-5", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" })), this.variant === 'warning' && index.h("svg", { width: "16", height: "16", viewBox: "0 0 18 18", fill: "none" }, index.h("path", { d: "M9 2L16.5 15H1.5L9 2Z", stroke: "currentColor", "stroke-width": "1.5", "stroke-linejoin": "round" }), index.h("path", { d: "M9 7v4", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" }), index.h("circle", { cx: "9", cy: "12.5", r: ".75", fill: "currentColor" })), this.variant === 'danger' && index.h("svg", { width: "16", height: "16", viewBox: "0 0 18 18", fill: "none" }, index.h("circle", { cx: "9", cy: "9", r: "8", stroke: "currentColor", "stroke-width": "1.5" }), index.h("path", { d: "M6 6l6 6M12 6l-6 6", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" }))), index.h("span", { class: "toast-message" }, this.message), index.h("button", { type: "button", class: "dismiss-btn", "aria-label": "Dismiss notification", onClick: this.dismiss }, index.h("svg", { "aria-hidden": "true", width: "14", height: "14", viewBox: "0 0 16 16", fill: "none" }, index.h("path", { d: "M4 4l8 8M12 4l-8 8", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" }))))));
    }
    static get watchers() { return {
        "visible": [{
                "onVisibleChange": 0
            }]
    }; }
};
FbToast.style = fbToastCss();

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
        return (index.h(index.Host, { key: '5d168572ca08774f570e12c23c4d6fcd73494faa' }, index.h("button", { key: '7e626200b3bf372c8a8c328f23ea5444791f85e2', type: "button", class: {
                'fb-toggle': true,
                [`variant-${this.variant}`]: true,
                [`size-${this.size}`]: true,
                'pressed': this.pressed,
                'disabled': this.disabled,
            }, "aria-pressed": String(this.pressed), "aria-label": this.label || null, disabled: this.disabled, onClick: this.handleClick }, index.h("slot", { key: '1b349826660350eb514b68f090935f366102e335' }))));
    }
};
FbToggle.style = fbToggleCss();

const fbToggleGroupCss = () => `:host{display:inline-flex}.fb-toggle-group{display:inline-flex;flex-direction:row;align-items:center}.fb-toggle-group.vertical{flex-direction:column;align-items:stretch}.variant-default{background:var(--color-neutral-100);border-radius:var(--radius-sm);padding:3px;gap:2px}.variant-outline{background:transparent}.item{display:inline-flex;align-items:center;justify-content:center;gap:var(--spacing-8);font-family:var(--font-family-primary);font-weight:var(--font-weight-medium);cursor:pointer;transition:background 0.15s, color 0.15s, border-color 0.15s;user-select:none;flex-shrink:0;outline:none;box-sizing:border-box;position:relative}.item:focus-visible{outline:var(--focus-width) solid var(--focus-color);outline-offset:0;z-index:2}.size-sm .item{height:26px;padding:0 var(--spacing-8);font-size:var(--font-size-12)}.size-default .item{height:34px;padding:0 var(--spacing-12);font-size:var(--font-size-14)}.size-lg .item{height:42px;padding:0 var(--spacing-16);font-size:var(--font-size-16)}.variant-default .item{border:none;border-radius:var(--radius-xs);background:transparent;color:var(--color-neutral-600)}.variant-default .item:hover:not(.disabled){background:var(--color-neutral-white);color:var(--color-neutral-700)}.variant-default .item.pressed{background:var(--color-neutral-white);color:var(--color-primary-600);box-shadow:0 1px 3px rgba(0,0,0,0.1)}.variant-outline .item{background:var(--color-neutral-white);color:var(--color-neutral-600);border:1px solid var(--color-neutral-300)}.variant-outline .item:hover:not(.disabled){background:var(--color-neutral-50)}.variant-outline .item.pressed{background:var(--color-primary-50);color:var(--color-primary-600);border-color:var(--color-primary-500);z-index:1}.item.disabled{opacity:0.5;cursor:not-allowed;pointer-events:none}`;

// Built-in icon set
const ICONS = {
    bold: () => index.h("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true" }, index.h("path", { d: "M4 3h5a2.5 2.5 0 0 1 0 5H4V3z", stroke: "currentColor", "stroke-width": "1.5", "stroke-linejoin": "round" }), index.h("path", { d: "M4 8h5.5a2.5 2.5 0 0 1 0 5H4V8z", stroke: "currentColor", "stroke-width": "1.5", "stroke-linejoin": "round" })),
    italic: () => index.h("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true" }, index.h("path", { d: "M7 3h5M4 13h5M9 3l-2 10", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" })),
    underline: () => index.h("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true" }, index.h("path", { d: "M4 3v5a4 4 0 0 0 8 0V3", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" }), index.h("path", { d: "M3 13h10", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" })),
    'align-left': () => index.h("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true" }, index.h("path", { d: "M2 4h12M2 8h8M2 12h10", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" })),
    'align-center': () => index.h("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true" }, index.h("path", { d: "M2 4h12M4 8h8M3 12h10", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" })),
    'align-right': () => index.h("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true" }, index.h("path", { d: "M2 4h12M6 8h8M4 12h10", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" })),
    grid: () => index.h("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true" }, index.h("rect", { x: "2", y: "2", width: "5", height: "5", rx: "1", stroke: "currentColor", "stroke-width": "1.5" }), index.h("rect", { x: "9", y: "2", width: "5", height: "5", rx: "1", stroke: "currentColor", "stroke-width": "1.5" }), index.h("rect", { x: "2", y: "9", width: "5", height: "5", rx: "1", stroke: "currentColor", "stroke-width": "1.5" }), index.h("rect", { x: "9", y: "9", width: "5", height: "5", rx: "1", stroke: "currentColor", "stroke-width": "1.5" })),
    list: () => index.h("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true" }, index.h("path", { d: "M3 4h10M3 8h10M3 12h10", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" })),
};
const FbToggleGroup = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.fbChange = index.createEvent(this, "fbChange");
        this.type = 'single';
        this.variant = 'default';
        this.size = 'default';
        this.orientation = 'horizontal';
        this.disabled = false;
        this.label = 'Toggle group';
        /** JSON array of { value, label?, icon?, disabled? } */
        this.items = '[]';
        /** Current selection — string for single, JSON array for multiple */
        this.value = '';
        this.selected = new Set();
    }
    componentWillLoad() {
        this.initSelection();
    }
    onValueChange() {
        this.initSelection();
    }
    initSelection() {
        if (!this.value) {
            this.selected = new Set();
            return;
        }
        if (this.type === 'multiple') {
            try {
                this.selected = new Set(JSON.parse(this.value));
            }
            catch (_a) {
                this.selected = new Set();
            }
        }
        else {
            this.selected = new Set([this.value]);
        }
    }
    parsedItems() {
        try {
            return JSON.parse(this.items);
        }
        catch (_a) {
            return [];
        }
    }
    toggle(val) {
        if (this.disabled)
            return;
        const next = new Set(this.selected);
        if (this.type === 'single') {
            if (next.has(val))
                next.delete(val);
            else {
                next.clear();
                next.add(val);
            }
            this.selected = next;
            this.value = next.has(val) ? val : '';
            this.fbChange.emit(this.value);
        }
        else {
            if (next.has(val))
                next.delete(val);
            else
                next.add(val);
            this.selected = next;
            const arr = Array.from(next);
            this.value = JSON.stringify(arr);
            this.fbChange.emit(arr);
        }
    }
    borderRadius(isFirst, isLast) {
        const r = 'var(--radius-sm)';
        const isV = this.orientation === 'vertical';
        if (isFirst && isLast)
            return r;
        if (isV) {
            if (isFirst)
                return `${r} ${r} 0 0`;
            if (isLast)
                return `0 0 ${r} ${r}`;
            return '0';
        }
        if (isFirst)
            return `${r} 0 0 ${r}`;
        if (isLast)
            return `0 ${r} ${r} 0`;
        return '0';
    }
    render() {
        const items = this.parsedItems();
        const isOutline = this.variant === 'outline';
        const isV = this.orientation === 'vertical';
        const last = items.length - 1;
        return (index.h(index.Host, { key: '6b0b1f2ef911b8e967cda12c033bfc024e9e46c1' }, index.h("div", { key: 'a80543f0aa0dd1766b99f8a007fcefa798ad6bd7', role: "group", "aria-label": this.label, "aria-disabled": this.disabled ? 'true' : null, class: {
                'fb-toggle-group': true,
                [`variant-${this.variant}`]: true,
                [`size-${this.size}`]: true,
                'vertical': isV,
            } }, items.map((item, i) => {
            const pressed = this.selected.has(item.value);
            const isDisabled = this.disabled || !!item.disabled;
            const isFirst = i === 0;
            const isLast = i === last;
            const icon = item.icon && ICONS[item.icon] ? ICONS[item.icon]() : null;
            return (index.h("button", { key: item.value, type: "button", role: "button", "aria-pressed": String(pressed), "aria-label": !item.label ? item.value : null, disabled: isDisabled, class: {
                    'item': true,
                    'pressed': pressed,
                    'disabled': isDisabled,
                    'first': isFirst,
                    'last': isLast,
                }, style: isOutline ? {
                    borderRadius: this.borderRadius(isFirst, isLast),
                    marginLeft: (!isV && !isFirst) ? '-1px' : null,
                    marginTop: (isV && !isFirst) ? '-1px' : null,
                } : {}, onClick: () => this.toggle(item.value) }, icon, item.label && index.h("span", null, item.label)));
        }))));
    }
    static get watchers() { return {
        "value": [{
                "onValueChange": 0
            }]
    }; }
};
FbToggleGroup.style = fbToggleGroupCss();

const fbTooltipCss = () => `:host{display:contents}.fb-tooltip-wrapper{display:inline-flex;position:relative}.fb-tooltip{position:absolute;z-index:100;max-width:240px;padding:var(--spacing-4) var(--spacing-8);background:var(--color-neutral-800);color:var(--color-neutral-white);font-family:var(--font-family-primary);font-size:var(--font-size-12);line-height:1.4;border-radius:var(--radius-xs);white-space:normal;pointer-events:none;box-shadow:var(--shadow-100)}.fb-tooltip--top{bottom:calc(100% + 6px);left:50%;transform:translateX(-50%)}.fb-tooltip--bottom{top:calc(100% + 6px);left:50%;transform:translateX(-50%)}.fb-tooltip--left{right:calc(100% + 6px);top:50%;transform:translateY(-50%)}.fb-tooltip--right{left:calc(100% + 6px);top:50%;transform:translateY(-50%)}.fb-tooltip::after{content:'';position:absolute;width:0;height:0;border:5px solid transparent}.fb-tooltip--top::after{top:100%;left:50%;transform:translateX(-50%);border-top-color:var(--color-neutral-800)}.fb-tooltip--bottom::after{bottom:100%;left:50%;transform:translateX(-50%);border-bottom-color:var(--color-neutral-800)}.fb-tooltip--left::after{left:100%;top:50%;transform:translateY(-50%);border-left-color:var(--color-neutral-800)}.fb-tooltip--right::after{right:100%;top:50%;transform:translateY(-50%);border-right-color:var(--color-neutral-800)}`;

let idCounter = 0;
const FbTooltip = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.content = '';
        this.placement = 'top';
        this.visible = false;
    }
    connectedCallback() {
        idCounter++;
        this.tooltipId = `fb-tooltip-${idCounter}`;
    }
    show() { this.visible = true; }
    hide() { this.visible = false; }
    render() {
        return (index.h(index.Host, { key: '8569c809ebe14ce0696b148333305f12b24aaf3c' }, index.h("span", { key: 'fa84e90a283af458fdd6643823e7176219e318bb', class: "fb-tooltip-wrapper", onMouseEnter: () => this.show(), onMouseLeave: () => this.hide(), onFocusin: () => this.show(), onFocusout: () => this.hide() }, index.h("span", { key: 'ebeb071f32282a15c297eb82d79f4d9bf1e3b350', "aria-describedby": this.visible ? this.tooltipId : null }, index.h("slot", { key: '42c3cba8eb682a20c0c658cf90102b01f4b29c20' })), this.visible && (index.h("span", { key: 'a543cb7843d4c692f890f1ec9a899d70cfc7c80c', id: this.tooltipId, role: "tooltip", class: `fb-tooltip fb-tooltip--${this.placement}` }, this.content)))));
    }
    get el() { return index.getElement(this); }
};
FbTooltip.style = fbTooltipCss();

exports.fb_alert = FbAlert;
exports.fb_avatar = FbAvatar;
exports.fb_badge = FbBadge;
exports.fb_breadcrumb = FbBreadcrumb;
exports.fb_button = FbButton;
exports.fb_button_group = FbButtonGroup;
exports.fb_card = FbCard;
exports.fb_checkbox = FbCheckbox;
exports.fb_chip = FbChip;
exports.fb_dropdown = FbDropdown;
exports.fb_input = FbInput;
exports.fb_modal = FbModal;
exports.fb_pagination = FbPagination;
exports.fb_popover = FbPopover;
exports.fb_radio_group = FbRadioGroup;
exports.fb_select = FbSelect;
exports.fb_separator = FbSeparator;
exports.fb_side_sheet = FbSideSheet;
exports.fb_sidebar = FbSidebar;
exports.fb_skeleton = FbSkeleton;
exports.fb_spinner = FbSpinner;
exports.fb_switch = FbSwitch;
exports.fb_tabs = FbTabs;
exports.fb_textarea = FbTextarea;
exports.fb_timeline = FbTimeline;
exports.fb_toast = FbToast;
exports.fb_toggle = FbToggle;
exports.fb_toggle_group = FbToggleGroup;
exports.fb_tooltip = FbTooltip;
