import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-C4WoZtwe.js';

const fbAlertCss = () => `:host{display:block}.fb-alert{display:flex;align-items:flex-start;gap:var(--spacing-12);padding:14px var(--spacing-16);border-radius:var(--radius-sm);border:1px solid transparent;font-family:var(--font-family-primary)}.variant-info{background:var(--color-primary-50);border-color:var(--color-primary-200);color:var(--color-primary-600)}.variant-success{background:var(--color-success-50);border-color:var(--color-success-200);color:var(--color-success-600)}.variant-warning{background:var(--color-warning-50);border-color:var(--color-warning-200);color:var(--color-warning-600)}.variant-danger{background:var(--color-danger-50);border-color:var(--color-danger-200);color:var(--color-danger-500)}.alert-icon{display:flex;flex-shrink:0;margin-top:1px}.alert-content{flex:1;display:flex;flex-direction:column;gap:var(--spacing-4)}.alert-title{margin:0;font-size:var(--font-size-14);font-weight:var(--font-weight-semibold)}.alert-description{margin:0;font-size:var(--font-size-14);opacity:0.85}.dismiss-btn{background:none;border:none;cursor:pointer;color:inherit;opacity:0.7;display:flex;align-items:center;padding:2px;border-radius:var(--radius-xs);flex-shrink:0}.dismiss-btn:hover{opacity:1}.dismiss-btn:focus-visible{outline:var(--focus-width) solid currentColor;outline-offset:var(--focus-offset)}`;

const FbAlert = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.fbDismiss = createEvent(this, "fbDismiss");
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
        return (h(Host, null, h("div", { role: this.variant === 'danger' || this.variant === 'warning' ? 'alert' : 'status', class: { 'fb-alert': true, [`variant-${this.variant}`]: true } }, h("span", { class: "alert-icon", "aria-hidden": "true" }, this.variant === 'info' && h("svg", { width: "18", height: "18", viewBox: "0 0 18 18", fill: "none" }, h("circle", { cx: "9", cy: "9", r: "8", stroke: "currentColor", "stroke-width": "1.5" }), h("path", { d: "M9 8v5", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" }), h("circle", { cx: "9", cy: "5.5", r: ".75", fill: "currentColor" })), this.variant === 'success' && h("svg", { width: "18", height: "18", viewBox: "0 0 18 18", fill: "none" }, h("circle", { cx: "9", cy: "9", r: "8", stroke: "currentColor", "stroke-width": "1.5" }), h("path", { d: "M5.5 9l2.5 2.5 4.5-5", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" })), this.variant === 'warning' && h("svg", { width: "18", height: "18", viewBox: "0 0 18 18", fill: "none" }, h("path", { d: "M9 2L16.5 15H1.5L9 2Z", stroke: "currentColor", "stroke-width": "1.5", "stroke-linejoin": "round" }), h("path", { d: "M9 7v4", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" }), h("circle", { cx: "9", cy: "12.5", r: ".75", fill: "currentColor" })), this.variant === 'danger' && h("svg", { width: "18", height: "18", viewBox: "0 0 18 18", fill: "none" }, h("circle", { cx: "9", cy: "9", r: "8", stroke: "currentColor", "stroke-width": "1.5" }), h("path", { d: "M6 6l6 6M12 6l-6 6", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" }))), h("div", { class: "alert-content" }, this.heading && h("p", { class: "alert-title" }, this.heading), this.description && h("p", { class: "alert-description" }, this.description), h("slot", null)), this.dismissible && (h("button", { type: "button", class: "dismiss-btn", "aria-label": "Dismiss alert", onClick: this.handleDismiss }, h("svg", { "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 16 16", fill: "none" }, h("path", { d: "M4 4l8 8M12 4l-8 8", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" })))))));
    }
};
FbAlert.style = fbAlertCss();

const fbAvatarCss = () => `:host{display:inline-flex}.fb-avatar{position:relative;display:inline-flex;align-items:center;justify-content:center;background:var(--color-primary-100);color:var(--color-primary-700);font-family:var(--font-family-primary);font-weight:var(--font-weight-semibold);overflow:hidden;flex-shrink:0}.fb-avatar--xs{width:24px;height:24px;font-size:var(--font-size-10)}.fb-avatar--sm{width:32px;height:32px;font-size:var(--font-size-12)}.fb-avatar--default{width:40px;height:40px;font-size:var(--font-size-14)}.fb-avatar--lg{width:48px;height:48px;font-size:var(--font-size-16)}.fb-avatar--xl{width:64px;height:64px;font-size:var(--font-size-20)}.fb-avatar--circle{border-radius:50%}.fb-avatar--square{border-radius:var(--radius-sm)}.fb-avatar__img{width:100%;height:100%;object-fit:cover}.fb-avatar__initials{line-height:1;text-transform:uppercase;user-select:none}.fb-avatar__status{position:absolute;bottom:0;right:0;width:25%;height:25%;min-width:8px;min-height:8px;border-radius:50%;border:2px solid var(--color-neutral-white)}.fb-avatar__status--online{background:var(--color-success-500)}.fb-avatar__status--offline{background:var(--color-neutral-400)}.fb-avatar__status--busy{background:var(--color-danger-500)}`;

const FbAvatar = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
};
FbAvatar.style = fbAvatarCss();

const fbBadgeCss = () => `:host{display:inline-flex}.fb-badge{display:inline-flex;align-items:center;justify-content:center;font-family:var(--font-family-primary);font-weight:var(--font-weight-semibold);border-radius:var(--radius-xs);white-space:nowrap;border:1px solid transparent}.size-sm{font-size:var(--font-size-10);padding:1px var(--spacing-4)}.size-default{font-size:var(--font-size-12);padding:2px var(--spacing-8)}.size-lg{font-size:var(--font-size-14);padding:4px var(--spacing-12)}.variant-default{background-color:var(--color-primary-50);color:var(--color-primary-600);border-color:var(--color-primary-200)}.variant-success{background-color:var(--color-success-50);color:var(--color-success-600);border-color:var(--color-success-200)}.variant-warning{background-color:var(--color-warning-50);color:var(--color-warning-600);border-color:var(--color-warning-200)}.variant-danger{background-color:var(--color-danger-50);color:var(--color-danger-500);border-color:var(--color-danger-200)}.variant-neutral{background-color:var(--color-neutral-50);color:var(--color-neutral-600);border-color:var(--color-neutral-200)}.variant-info{background-color:var(--color-secondary-50);color:var(--color-secondary-500);border-color:var(--color-secondary-100)}.dot{width:8px;height:8px;border-radius:var(--radius-max);padding:0;border:none}.size-sm.dot{width:6px;height:6px}.size-lg.dot{width:10px;height:10px}`;

const FbBadge = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        return (h(Host, { key: '4c965685d99e0af592b690c2039783e4e62045d1' }, h("span", { key: 'a258fc4d7058299cd8a26ba156516dd4a6b1bb51', class: {
                'fb-badge': true,
                [`variant-${this.variant}`]: true,
                [`size-${this.size}`]: true,
                'dot': isDot,
            }, "aria-label": isDot && this.label ? this.label : null, role: isDot ? 'img' : null }, isDot ? null : (this.label || h("slot", null)))));
    }
};
FbBadge.style = fbBadgeCss();

const fbBreadcrumbCss = () => `:host{display:block}.fb-breadcrumb{font-family:var(--font-family-primary)}.breadcrumb-list{display:flex;flex-wrap:wrap;align-items:center;gap:var(--spacing-4);list-style:none;margin:0;padding:0}.breadcrumb-item{display:flex;align-items:center;gap:var(--spacing-4)}.breadcrumb-link{font-size:var(--font-size-14);color:var(--color-primary-500);text-decoration:none}.breadcrumb-link:hover{text-decoration:underline}.breadcrumb-link:focus-visible{outline:var(--focus-width) solid var(--focus-color);outline-offset:var(--focus-offset);border-radius:var(--radius-xs)}.breadcrumb-current{font-size:var(--font-size-14);color:var(--color-neutral-500);font-weight:var(--font-weight-semibold)}.breadcrumb-separator{font-size:var(--font-size-14);color:var(--color-neutral-500);user-select:none}`;

const FbBreadcrumb = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        return (h(Host, { key: 'aba6d80dd617271114973d282f123a46cf62b875' }, h("nav", { key: 'd6ec80064cf7f83d4f180ba3e0c51416246d4a21', "aria-label": this.label, class: "fb-breadcrumb" }, h("ol", { key: '5570687f17e3f875facb6239c3fa057a3c9244ba', class: "breadcrumb-list" }, items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (h("li", { key: index, class: "breadcrumb-item" }, isLast ? (h("span", { "aria-current": "page", class: "breadcrumb-current" }, item.label)) : (h("a", { href: item.href || '#', class: "breadcrumb-link" }, item.label)), !isLast && (h("span", { class: "breadcrumb-separator", "aria-hidden": "true" }, "/"))));
        })))));
    }
};
FbBreadcrumb.style = fbBreadcrumbCss();

const fbButtonCss = () => `:host{display:inline-flex}.fb-button{display:inline-flex;align-items:center;justify-content:center;gap:var(--spacing-8);font-family:var(--font-family-primary);font-weight:var(--font-weight-semibold);border-radius:var(--fb-button-radius, var(--radius-sm));border:none;cursor:pointer;transition:background-color 0.15s, color 0.15s, border-color 0.15s, opacity 0.15s;white-space:nowrap;line-height:1;text-decoration:none;box-sizing:border-box}.fb-button:focus-visible{outline:var(--focus-width) solid var(--focus-color);outline-offset:var(--focus-offset)}.size-xs{height:24px;padding:0 var(--spacing-8);font-size:var(--font-size-12)}.size-sm{height:28px;padding:0 var(--spacing-12);font-size:var(--font-size-12)}.size-default{height:36px;padding:0 var(--spacing-16);font-size:var(--font-size-14)}.size-lg{height:44px;padding:0 var(--spacing-20);font-size:var(--font-size-16)}.icon-only.size-xs{width:24px;padding:0}.icon-only.size-sm{width:28px;padding:0}.icon-only.size-default{width:36px;padding:0}.icon-only.size-lg{width:44px;padding:0}.rounded{border-radius:var(--radius-max)}.variant-default{background-color:var(--color-primary-500);color:var(--color-neutral-white);border:none}.variant-default:hover:not(:disabled){background-color:var(--color-primary-600)}.variant-default:active:not(:disabled){background-color:var(--color-primary-700)}.variant-secondary{background-color:var(--color-neutral-100);color:var(--color-neutral-black);border:none}.variant-secondary:hover:not(:disabled){background-color:var(--color-neutral-200)}.variant-secondary:active:not(:disabled){background-color:var(--color-neutral-300)}.variant-outline{background-color:transparent;color:var(--color-primary-500);border:1px solid var(--color-primary-500)}.variant-outline:hover:not(:disabled){background-color:var(--color-primary-50);color:var(--color-primary-600);border-color:var(--color-primary-600)}.variant-outline:active:not(:disabled){background-color:var(--color-primary-100);color:var(--color-primary-700);border-color:var(--color-primary-700)}.variant-ghost{background-color:transparent;color:var(--color-primary-500);border:none}.variant-ghost:hover:not(:disabled){background-color:var(--color-primary-50);color:var(--color-primary-600)}.variant-ghost:active:not(:disabled){background-color:var(--color-primary-100);color:var(--color-primary-700)}.variant-destructive{background-color:var(--color-danger-500);color:var(--color-neutral-white);border:none}.variant-destructive:hover:not(:disabled){background-color:var(--color-danger-600)}.variant-destructive:active:not(:disabled){background-color:var(--color-danger-800)}.variant-link{background-color:transparent;color:var(--color-primary-500);border:none;text-decoration:underline;border-radius:var(--radius-xs);padding:4px var(--spacing-8);height:auto}.variant-link:hover:not(:disabled){background-color:var(--color-primary-50);color:var(--color-primary-600)}.variant-link:active:not(:disabled){background-color:var(--color-primary-100);color:var(--color-primary-700)}.fb-button:disabled,.fb-button.disabled{opacity:0.5;cursor:not-allowed;pointer-events:none}.icon{display:inline-flex;align-items:center;flex-shrink:0}`;

const FbButton = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.fbClick = createEvent(this, "fbClick");
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
        return (h(Host, { key: 'd4f8e201c848cf5112a1424bf02790f8b49a746b' }, h("button", { key: 'f1756037c4904308387e6f76cc319d3658d0bab1', type: this.type, disabled: this.disabled, "aria-disabled": this.disabled ? 'true' : null, "aria-label": isIconOnly && this.label ? this.label : null, class: {
                'fb-button': true,
                [`variant-${this.variant}`]: true,
                [`size-${this.size}`]: true,
                'rounded': this.rounded,
                'icon-only': isIconOnly,
                'disabled': this.disabled,
            }, onClick: this.handleClick }, this.iconPosition === 'left' && (h("span", { key: 'dc97ee4e4f6d77d98c77f5b61c6f704247f68448', class: "icon icon--left", "aria-hidden": "true" }, h("slot", { key: 'b083a00b7382530c8a38ebcdef836d7212aaa61c', name: "icon-left" }))), !isIconOnly && (h("span", { key: 'a8ffbc605f07f05bd6cabde8711cb68241d2cca4', class: "label" }, h("slot", { key: '0cd018706421ce289992e8f3c15324f771a05e8f' }))), this.iconPosition === 'right' && (h("span", { key: '2359d02779234c8a2270645fa23b9a5b4a250609', class: "icon icon--right", "aria-hidden": "true" }, h("slot", { key: 'b24e38061776426f8900076a3821bbbf8b67c640', name: "icon-right" }))), isIconOnly && (h("span", { key: '22a9789089043614219cec949b75f9a487cbc291', class: "icon icon--only", "aria-hidden": "true" }, h("slot", { key: '63f262ad829dce18b6a1dc1a47fefbf142e3bf7a', name: "icon" }))))));
    }
};
FbButton.style = fbButtonCss();

const fbButtonGroupCss = () => `:host{display:inline-flex}.fb-button-group{display:inline-flex;flex-direction:row;align-items:center}.fb-button-group.vertical{flex-direction:column;align-items:stretch}`;

const FbButtonGroup = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        return (h(Host, { key: '5c601bb732ee6eaa7d0a686ff3ed1ec720f59392' }, h("div", { key: '2128b5e8a21d74c6a1a175dea0c59667d226a632', role: "group", "aria-label": (_a = this.el.getAttribute('aria-label')) !== null && _a !== void 0 ? _a : 'Button group', class: { 'fb-button-group': true, 'vertical': this.orientation === 'vertical' } }, h("slot", { key: '4ce9420372bebd644c40a9caa176fa8bf8a236ad' }))));
    }
    get el() { return getElement(this); }
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
        registerInstance(this, hostRef);
        this.fbCardClick = createEvent(this, "fbCardClick");
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
            return (h(Host, null, h("a", { href: this.href, class: classes, "aria-label": this.label || null }, h("slot", { name: "header" }), h("slot", null), h("slot", { name: "footer" }))));
        }
        if (this.clickable) {
            return (h(Host, null, h("button", { type: "button", class: classes, "aria-label": this.label || null, onClick: () => this.fbCardClick.emit() }, h("slot", { name: "header" }), h("slot", null), h("slot", { name: "footer" }))));
        }
        return (h(Host, null, h("div", { class: classes }, h("slot", { name: "header" }), h("slot", null), h("slot", { name: "footer" }))));
    }
};
FbCard.style = fbCardCss();

const fbCheckboxCss = () => `:host{display:block}.fb-checkbox-wrapper{display:flex;flex-direction:column;gap:var(--spacing-4);font-family:var(--font-family-primary)}.fb-checkbox-label{display:inline-flex;align-items:flex-start;gap:var(--spacing-8);cursor:pointer}.fb-checkbox-label.disabled{opacity:0.5;cursor:not-allowed}.native-checkbox{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}.native-checkbox:focus-visible+.checkbox-box{outline:var(--focus-width) solid var(--focus-color);outline-offset:var(--focus-offset)}.checkbox-box{display:inline-flex;align-items:center;justify-content:center;border:var(--border-standard) solid var(--color-neutral-400);border-radius:var(--radius-xs);background-color:var(--color-neutral-white);flex-shrink:0;margin-top:2px;transition:background-color 0.15s, border-color 0.15s}.size-sm{width:14px;height:14px}.size-md{width:18px;height:18px}.size-lg{width:22px;height:22px;border-radius:var(--radius-sm)}.checkbox-box.checked{background-color:var(--color-primary-500);border-color:var(--color-primary-500)}.checkbox-box.error{border-color:var(--color-danger-500);border-width:var(--border-thick)}.label-text{font-size:var(--font-size-14);color:var(--color-neutral-700);line-height:1.4}.fb-helper{font-size:var(--font-size-12);color:var(--color-neutral-500);padding-left:26px}.fb-helper--error{color:var(--color-danger-600)}`;

let idCounter$c = 0;
const FbCheckbox = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.fbChange = createEvent(this, "fbChange");
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
        return (h(Host, { key: '6198179c490277af847b4a9b09fe13d5ad101d2f' }, h("div", { key: '84dc2bd3299205b8e19fdd0cf8b280b8fcdeed9a', class: "fb-checkbox-wrapper" }, h("label", { key: 'c94a3214cc105bbe3cddce9d1a6c6df483474802', htmlFor: this.inputId, class: {
                'fb-checkbox-label': true,
                'disabled': this.isDisabled,
            } }, h("input", { key: '2512268e16515ab582d5d84319146be36fa81dda', id: this.inputId, type: "checkbox", checked: this.checked, disabled: this.isDisabled, required: this.required, value: this.value, "aria-required": this.required ? 'true' : null, "aria-invalid": this.isError ? 'true' : null, "aria-describedby": hasHelper ? this.helperId : null,
            // indeterminate must be set as a property, not attribute
            ref: (el) => {
                if (el)
                    el.indeterminate = this.indeterminate;
            }, class: "native-checkbox", onChange: (e) => {
                this.checked = e.target.checked;
                this.fbChange.emit(this.checked);
            } }), h("span", { key: 'a7602afdc021bf7feaea30bb86410e033c2aaa83', "aria-hidden": "true", class: {
                'checkbox-box': true,
                [`size-${this.size}`]: true,
                'checked': this.checked || this.indeterminate,
                'error': this.isError,
            } }, this.indeterminate
            ? h("svg", { width: "10", height: "2", viewBox: "0 0 10 2", fill: "none" }, h("path", { d: "M1 1h8", stroke: "white", "stroke-width": "2", "stroke-linecap": "round" }))
            : this.checked
                ? h("svg", { width: "10", height: "8", viewBox: "0 0 10 8", fill: "none" }, h("path", { d: "M1 4l3 3 5-5", stroke: "white", "stroke-width": "1.8", "stroke-linecap": "round", "stroke-linejoin": "round" }))
                : null), this.label && h("span", { key: '0dc47f5645e52fbf7243ec308dd9873f3215115c', class: "label-text" }, this.label)), hasHelper && (h("div", { key: 'ebdf2ab83bae1bb9c532d928b2579118b0093920', id: this.helperId, class: { 'fb-helper': true, 'fb-helper--error': this.isError }, role: this.isError ? 'alert' : null }, this.helperText)))));
    }
};
FbCheckbox.style = fbCheckboxCss();

const fbChipCss = () => `:host{display:inline-flex}.fb-chip{display:inline-flex;align-items:center;gap:var(--spacing-4);border-radius:var(--radius-max);font-family:var(--font-family-primary);font-weight:var(--font-weight-medium);white-space:nowrap;cursor:default;border:1px solid transparent;transition:background-color 0.15s, border-color 0.15s}.fb-chip--default{padding:var(--spacing-4) var(--spacing-12);font-size:var(--font-size-14)}.fb-chip--sm{padding:var(--spacing-2) var(--spacing-8);font-size:var(--font-size-12)}.fb-chip--default-variant{background:var(--color-neutral-100);color:var(--color-neutral-700);border-color:var(--color-neutral-200)}.fb-chip--primary{background:var(--color-primary-50);color:var(--color-primary-700);border-color:var(--color-primary-200)}.fb-chip--success{background:var(--color-success-50);color:var(--color-success-700);border-color:var(--color-success-200)}.fb-chip--warning{background:var(--color-warning-50);color:var(--color-warning-700);border-color:var(--color-warning-200)}.fb-chip--danger{background:var(--color-danger-50);color:var(--color-danger-700);border-color:var(--color-danger-200)}.fb-chip--default{background:var(--color-neutral-100);color:var(--color-neutral-700);border-color:var(--color-neutral-200)}button.fb-chip{cursor:pointer}button.fb-chip:hover:not(:disabled){filter:brightness(0.96)}button.fb-chip:focus-visible{outline:var(--focus-width) solid var(--focus-color);outline-offset:var(--focus-offset)}button.fb-chip[aria-selected="true"]{background:var(--color-primary-500);color:var(--color-neutral-white);border-color:var(--color-primary-500)}.fb-chip--disabled{opacity:0.45;cursor:not-allowed}.fb-chip__label{line-height:1}.fb-chip__remove{display:inline-flex;align-items:center;justify-content:center;background:none;border:none;padding:2px;cursor:pointer;border-radius:50%;color:inherit;opacity:0.7;line-height:1}.fb-chip__remove:hover:not(:disabled){opacity:1;background:rgba(0,0,0,0.08)}.fb-chip__remove:focus-visible{outline:var(--focus-width) solid var(--focus-color);outline-offset:1px}`;

const FbChip = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.fbSelect = createEvent(this, "fbSelect");
        this.fbRemove = createEvent(this, "fbRemove");
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
            return (h(Host, null, h("button", { type: "button", role: "option", "aria-selected": this.selected ? 'true' : 'false', "aria-disabled": this.disabled ? 'true' : null, disabled: this.disabled, class: classes, onClick: () => this.handleClick() }, h("slot", { name: "icon-left" }), h("span", { class: "fb-chip__label" }, this.label, h("slot", null)), this.dismissible && (h("span", { role: "button", "aria-label": `Remove ${this.label}`, tabindex: this.disabled ? -1 : 0, class: "fb-chip__remove", onClick: (e) => {
                    e.stopPropagation();
                    if (!this.disabled)
                        this.fbRemove.emit();
                }, onKeyDown: (e) => {
                    if ((e.key === 'Enter' || e.key === ' ') && !this.disabled) {
                        e.preventDefault();
                        e.stopPropagation();
                        this.fbRemove.emit();
                    }
                } }, h("svg", { "aria-hidden": "true", width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2.5", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { d: "M18 6L6 18M6 6l12 12" })))))));
        }
        return (h(Host, null, h("span", { class: classes, "aria-disabled": this.disabled ? 'true' : null }, h("slot", { name: "icon-left" }), h("span", { class: "fb-chip__label" }, this.label, h("slot", null)), this.dismissible && (h("button", { type: "button", "aria-label": `Remove ${this.label}`, disabled: this.disabled, class: "fb-chip__remove", onClick: () => {
                if (!this.disabled)
                    this.fbRemove.emit();
            } }, h("svg", { "aria-hidden": "true", width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2.5", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { d: "M18 6L6 18M6 6l12 12" })))))));
    }
};
FbChip.style = fbChipCss();

const fbDropdownCss = () => `:host{display:inline-block;position:relative}.fb-trigger{display:inline-flex;align-items:center;gap:var(--spacing-8);height:36px;padding:0 var(--spacing-16);font-family:var(--font-family-primary);font-size:var(--font-size-14);font-weight:var(--font-weight-semibold);border-radius:var(--radius-sm);cursor:pointer;transition:background-color 0.15s}.fb-trigger:focus-visible{outline:var(--focus-width) solid var(--focus-color);outline-offset:var(--focus-offset)}.fb-trigger:disabled{opacity:0.5;cursor:not-allowed}.variant-default{background:var(--color-primary-500);color:white;border:none}.variant-default:hover:not(:disabled){background:var(--color-primary-600)}.variant-secondary{background:var(--color-neutral-100);color:var(--color-neutral-black);border:none}.variant-secondary:hover:not(:disabled){background:var(--color-neutral-200)}.variant-ghost{background:transparent;color:var(--color-primary-500);border:none}.variant-ghost:hover:not(:disabled){background:var(--color-primary-50)}.chevron{transition:transform 0.2s;flex-shrink:0}.chevron--open{transform:rotate(180deg)}.fb-menu{position:absolute;top:calc(100% + 4px);left:0;min-width:180px;background:var(--color-neutral-white);border:1px solid var(--color-neutral-200);border-radius:var(--radius-sm);box-shadow:var(--shadow-200);z-index:50;padding:var(--spacing-4) 0;list-style:none;margin:0}.fb-menuitem{display:block;width:100%;padding:var(--spacing-8) var(--spacing-12);text-align:left;background:none;border:none;font-family:var(--font-family-primary);font-size:var(--font-size-14);color:var(--color-neutral-black);cursor:pointer;transition:background-color 0.1s}.fb-menuitem:hover:not(.disabled){background-color:var(--color-neutral-50)}.fb-menuitem:focus-visible{outline:var(--focus-width) solid var(--focus-color);outline-offset:-2px}.fb-menuitem.danger{color:var(--color-danger-500)}.fb-menuitem.danger:hover{background-color:var(--color-danger-50)}.fb-menuitem.disabled{opacity:0.4;cursor:not-allowed}`;

let idCounter$b = 0;
const FbDropdown = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.fbSelect = createEvent(this, "fbSelect");
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
        return (h(Host, { key: 'ab250ea34bbebc6a08b391fc5476f7932c070e21', style: { position: 'relative', display: 'inline-block' } }, h("button", { key: '9e00e8ff365afe35848082008bb520873a420608', id: this.triggerId, type: "button", "aria-haspopup": "true", "aria-expanded": this.open ? 'true' : 'false', "aria-controls": this.menuId, disabled: this.disabled, class: { 'fb-trigger': true, [`variant-${this.variant}`]: true }, onClick: () => this.toggle(), onKeyDown: this.handleTriggerKeyDown }, h("slot", { key: '7ffd7fa8e701e4e7ca0c408bf1aad0faa60bd5de', name: "trigger" }, this.label), h("svg", { key: 'dd849c3a308691a15a18ce493c405d7b6f31f627', "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.8", "stroke-linecap": "round", "stroke-linejoin": "round", class: { 'chevron': true, 'chevron--open': this.open } }, h("path", { key: '2a610996ac4798a7ebfb748191653da723428731', d: "M6 9l6 6 6-6" }))), this.open && (h("ul", { key: 'a9be7df1d0c7782cd123d2aedcf59b5f366f9eef', id: this.menuId, role: "menu", "aria-label": this.label, class: "fb-menu", onKeyDown: this.handleMenuKeyDown }, items.map(item => (h("li", { key: item.id, role: "none" }, h("button", { type: "button", role: "menuitem", "aria-disabled": item.disabled ? 'true' : null, class: { 'fb-menuitem': true, 'danger': !!item.danger, 'disabled': !!item.disabled }, tabindex: item.disabled ? -1 : 0, onClick: () => this.select(item) }, item.label))))))));
    }
    get el() { return getElement(this); }
};
FbDropdown.style = fbDropdownCss();

const fbInputCss = () => `:host{display:block}.fb-input-wrapper{display:flex;flex-direction:column;gap:var(--spacing-4);font-family:var(--font-family-primary);width:100%}.fb-label{display:flex;align-items:center;gap:var(--spacing-4);font-size:var(--font-size-14);font-weight:var(--font-weight-semibold);color:var(--color-neutral-700);cursor:default}.required-indicator{color:var(--color-danger-500);font-weight:var(--font-weight-bold)}.fb-input-field{display:flex;align-items:center;border:var(--border-standard) solid var(--color-neutral-400);border-radius:var(--radius-sm);background-color:var(--color-neutral-white);transition:border-color 0.15s, box-shadow 0.15s;box-sizing:border-box;width:100%}.fb-input-field:focus-within{border-color:var(--color-primary-500);box-shadow:0 0 0 var(--focus-width) color-mix(in srgb, var(--focus-color) 20%, transparent)}.state-error{border-color:var(--color-danger-500);border-width:var(--border-thick)}.state-error:focus-within{border-color:var(--color-danger-500);box-shadow:0 0 0 var(--focus-width) color-mix(in srgb, var(--color-danger-500) 20%, transparent)}.state-disabled{background-color:var(--color-neutral-100);border-color:var(--color-neutral-200);opacity:0.6;cursor:not-allowed}.state-readonly{background-color:var(--color-neutral-50)}.size-sm{height:32px}.size-default{height:40px}.size-lg{height:48px}.native-input{flex:1;border:none;outline:none;background:transparent;font-family:var(--font-family-primary);color:var(--color-neutral-black);min-width:0;height:100%;box-sizing:border-box}.size-sm .native-input{font-size:var(--font-size-12);padding:0 var(--spacing-8)}.size-default .native-input{font-size:var(--font-size-14);padding:0 var(--spacing-12)}.size-lg .native-input{font-size:var(--font-size-16);padding:0 var(--spacing-16)}.native-input::placeholder{color:var(--color-neutral-600)}.native-input:disabled{cursor:not-allowed}.adornment{display:flex;align-items:center;flex-shrink:0;color:var(--color-neutral-500);font-size:var(--font-size-14);height:100%}.adornment--prefix{padding:0 var(--spacing-8) 0 var(--spacing-12);border-right:1px solid var(--color-neutral-200)}.adornment--suffix{padding:0 var(--spacing-12) 0 var(--spacing-8);border-left:1px solid var(--color-neutral-200)}.adornment--prefix-icon{padding:0 var(--spacing-4) 0 var(--spacing-12);color:var(--color-neutral-600)}.adornment-btn{display:flex;align-items:center;justify-content:center;padding:0 var(--spacing-8);height:100%;background:none;border:none;cursor:pointer;color:var(--color-neutral-600);flex-shrink:0;border-radius:0}.adornment-btn:hover{color:var(--color-neutral-600)}.adornment-btn:focus-visible{outline:var(--focus-width) solid var(--focus-color);outline-offset:-2px}.fb-helper{display:flex;align-items:center;gap:var(--spacing-4);font-size:var(--font-size-12);color:var(--color-neutral-500)}.fb-helper--error{color:var(--color-danger-600)}.helper-icon{flex-shrink:0}`;

let idCounter$a = 0;
const FbInput = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.fbChange = createEvent(this, "fbChange");
        this.fbFocus = createEvent(this, "fbFocus");
        this.fbBlur = createEvent(this, "fbBlur");
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
        return (h(Host, { key: 'c19a75125b0e3d61f02a35ce377564c65a2a68bb' }, h("div", { key: '138894813510003f7c2cda6fd380aae26292a371', class: "fb-input-wrapper" }, this.label && (h("label", { key: 'a5da644d57a86bf4a2823e62e908a23b6c9a8dbd', htmlFor: this.inputId, class: "fb-label" }, this.label, this.required && (h("span", { key: 'cb3140b9caaf80335f1c052a36b03f331b92a3be', class: "required-indicator", "aria-hidden": "true" }, " *")))), h("div", { key: '252b3591729a1a04635c684aa70c592926cd37fb', class: {
                'fb-input-field': true,
                [`size-${this.size}`]: true,
                'state-error': this.isError,
                'state-disabled': this.isDisabled,
                'state-readonly': this.isReadOnly,
            } }, isSearch && (h("span", { key: '580cf854e4215e0ce2cd9a7a54d8a7205be069d9', class: "adornment adornment--prefix-icon", "aria-hidden": "true" }, h("svg", { key: 'd9488cb9a812d32a874a1592da900e2fb21026d7', width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.8", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("circle", { key: '87f5f1e3f074b3b06de96d76fb7c7e27b5c58e07', cx: "11", cy: "11", r: "8" }), h("path", { key: '3817050505842284b9e5d85933b64918241e9331', d: "M21 21l-4.35-4.35" })))), this.prefixText && (h("span", { key: 'd0661658dec2f6eba70d506d35b3710e0edaa3ca', class: "adornment adornment--prefix", "aria-hidden": "true" }, this.prefixText)), h("input", { key: 'b1f4945c706f50b8b570ff46b52d69ebdf403faf', id: this.inputId, type: inputType, value: this.value, placeholder: this.placeholder, disabled: this.isDisabled, readOnly: this.isReadOnly, required: this.required, "aria-required": this.required ? 'true' : null, "aria-invalid": this.isError ? 'true' : null, "aria-describedby": hasHelper ? this.helperId : null, class: "native-input", onInput: this.handleInput, onFocus: () => this.fbFocus.emit(), onBlur: () => this.fbBlur.emit() }), showClear && (h("button", { key: 'f55cb25aa41493c77cdd85c1f1a2ba557f29c4cb', type: "button", class: "adornment-btn", "aria-label": "Clear input", onClick: this.handleClear }, h("svg", { key: '1f69e98fe63af3853b544111dc5dec0b985fd3f2', "aria-hidden": "true", width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" }, h("path", { key: '087dc6982b967f89bd8261934b534b51816d5580', d: "M2 2l8 8M10 2l-8 8" })))), this.suffixText && (h("span", { key: '7de06ac4ebc440d272e01d0e24f594a6e89f73d3', class: "adornment adornment--suffix", "aria-hidden": "true" }, this.suffixText)), isPassword && (h("button", { key: '5543908cf96453c9a2af9368834ab1811fc531ec', type: "button", class: "adornment-btn", "aria-label": this.showPassword ? 'Hide password' : 'Show password', "aria-pressed": this.showPassword ? 'true' : 'false', onClick: this.togglePassword }, this.showPassword
            ? h("svg", { "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.8", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { d: "M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" }), h("line", { x1: "1", y1: "1", x2: "23", y2: "23" }))
            : h("svg", { "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.8", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" }), h("circle", { cx: "12", cy: "12", r: "3" }))))), hasHelper && (h("div", { key: 'a3861b09a84aa620451f19c4d7425fd6b4df7fa3', id: this.helperId, class: { 'fb-helper': true, 'fb-helper--error': this.isError },
            // role="alert" on error ensures it's announced immediately
            role: this.isError ? 'alert' : null }, this.isError && (h("svg", { key: 'a43af0e6a9774a2cd33ea36e675f97ab64a07ddd', "aria-hidden": "true", width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", class: "helper-icon" }, h("circle", { key: '0670c0a574ba51f6932abec795c242db7f119561', cx: "12", cy: "12", r: "10" }), h("line", { key: '206798fc71880dc871f698afd99a3c0b1997e936', x1: "12", y1: "8", x2: "12", y2: "12" }), h("line", { key: '8410c162e2030baf60799bb2c64c8d83ee41ee65', x1: "12", y1: "16", x2: "12.01", y2: "16" }))), this.helperText)))));
    }
    get el() { return getElement(this); }
};
FbInput.style = fbInputCss();

const fbModalCss = () => `:host{display:contents}.fb-overlay{position:fixed;inset:0;background:rgba(21, 33, 54, 0.5);backdrop-filter:blur(2px);z-index:100;animation:fb-fade-in 0.15s ease-out}.fb-modal{position:fixed;top:50%;left:50%;transform:translate(-50%, -50%);z-index:101;background:var(--color-neutral-white);border-radius:var(--radius-md);box-shadow:var(--shadow-900);display:flex;flex-direction:column;max-height:90vh;width:100%;overflow:hidden;animation:fb-modal-in 0.2s ease-out}.size-sm{max-width:400px}.size-default{max-width:560px}.size-lg{max-width:760px}.size-fullscreen{max-width:100vw;max-height:100vh;top:0;left:0;transform:none;border-radius:0}.modal-header{display:flex;align-items:flex-start;justify-content:space-between;gap:var(--spacing-16);padding:var(--spacing-20) var(--spacing-24);border-bottom:1px solid var(--color-neutral-100);flex-shrink:0}.modal-heading-group{flex:1}.modal-title{margin:0;font-family:var(--font-family-primary);font-size:var(--font-size-16);font-weight:var(--font-weight-semibold);color:var(--color-neutral-black);line-height:var(--line-height-24)}.modal-description{margin:var(--spacing-4) 0 0;font-family:var(--font-family-primary);font-size:var(--font-size-14);color:var(--color-neutral-500);line-height:1.5}.close-btn{background:none;border:none;cursor:pointer;color:var(--color-neutral-500);display:flex;align-items:center;padding:var(--spacing-4);border-radius:var(--radius-xs);flex-shrink:0;transition:background-color 0.15s}.close-btn:hover{background-color:var(--color-neutral-50);color:var(--color-neutral-700)}.close-btn:focus-visible{outline:var(--focus-width) solid var(--focus-color);outline-offset:var(--focus-offset)}.modal-body{padding:var(--spacing-24);overflow-y:auto;flex:1;font-family:var(--font-family-primary);font-size:var(--font-size-14);color:var(--color-neutral-500);line-height:1.6}.modal-footer{display:flex;align-items:center;justify-content:flex-end;gap:var(--spacing-8);padding:var(--spacing-16) var(--spacing-24);border-top:1px solid var(--color-neutral-100);flex-shrink:0}.btn-cancel{padding:0 var(--spacing-16);height:36px;font-family:var(--font-family-primary);font-size:var(--font-size-14);font-weight:var(--font-weight-semibold);background:transparent;border:1px solid var(--color-primary-500);border-radius:var(--radius-sm);color:var(--color-primary-500);cursor:pointer;transition:background-color 0.15s}.btn-cancel:hover{background-color:var(--color-primary-50)}.btn-cancel:focus-visible{outline:var(--focus-width) solid var(--focus-color);outline-offset:var(--focus-offset)}.btn-confirm{padding:0 var(--spacing-16);height:36px;font-family:var(--font-family-primary);font-size:var(--font-size-14);font-weight:var(--font-weight-semibold);background:var(--color-primary-500);border:none;border-radius:var(--radius-sm);color:var(--color-neutral-white);cursor:pointer;transition:background-color 0.15s}.btn-confirm:hover{background-color:var(--color-primary-600)}.btn-confirm:focus-visible{outline:var(--focus-width) solid var(--focus-color);outline-offset:var(--focus-offset)}@keyframes fb-fade-in{from{opacity:0}to{opacity:1}}@keyframes fb-modal-in{from{opacity:0;transform:translate(-50%, calc(-50% + 8px))}to{opacity:1;transform:translate(-50%, -50%)}}.size-fullscreen{animation-name:fb-fade-in}@media (prefers-reduced-motion: reduce){.fb-overlay,.fb-modal{animation:none}}`;

let idCounter$9 = 0;
const FbModal = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.fbClose = createEvent(this, "fbClose");
        this.fbConfirm = createEvent(this, "fbConfirm");
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
            return h(Host, null);
        return (h(Host, { onKeyDown: this.handleKeyDown }, h("div", { class: "fb-overlay", "aria-hidden": "true", onClick: () => this.closeOnOverlay && this.close() }), h("div", { class: { 'fb-modal': true, [`size-${this.size}`]: true }, role: "dialog", "aria-modal": "true", "aria-labelledby": this.heading ? this.titleId : null, "aria-describedby": this.description ? this.descId : null, onClick: (e) => e.stopPropagation() }, h("div", { class: "modal-header" }, h("div", { class: "modal-heading-group" }, this.heading && (h("h2", { id: this.titleId, class: "modal-title" }, this.heading)), this.description && (h("p", { id: this.descId, class: "modal-description" }, this.description))), h("button", { type: "button", class: "close-btn", "aria-label": "Close dialog", onClick: () => this.close() }, h("svg", { "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 16 16", fill: "none" }, h("path", { d: "M3 3l10 10M13 3L3 13", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" })))), h("div", { class: "modal-body" }, h("slot", null)), this.showFooter && (h("div", { class: "modal-footer" }, h("button", { type: "button", class: "btn-cancel", onClick: () => this.close() }, this.cancelLabel), h("button", { type: "button", class: "btn-confirm", onClick: () => this.fbConfirm.emit() }, this.confirmLabel))))));
    }
    get el() { return getElement(this); }
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
        registerInstance(this, hostRef);
        this.fbPageChange = createEvent(this, "fbPageChange");
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
        return (h(Host, { key: '6f480c0a71e3e08c2cf61f29cf919840181fe833' }, h("nav", { key: 'fd8f69dc66b52bce3570ca5ca8cd5fbc165d4160', "aria-label": this.label, class: "fb-pagination" }, h("button", { key: '4b6bc042f3a70ef7a29fb8d862a2e4e0c1042ad8', type: "button", class: "page-btn nav-btn", "aria-label": "Go to previous page", disabled: isFirst, "aria-disabled": isFirst ? 'true' : null, onClick: () => this.go(this.currentPage - 1) }, h("svg", { key: 'a80527e0568cc48a0dcb5189640bf35880c410a1', "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.8", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { key: 'b8ebda0f56588f9a26fcdb8deeeb1d015a6cbacf', d: "M15 18l-6-6 6-6" }))), pages.map((page, i) => page === '...'
            ? h("span", { key: `ellipsis-${i}`, class: "ellipsis", "aria-hidden": "true" }, "\u2026")
            : (h("button", { key: page, type: "button", class: { 'page-btn': true, 'active': page === this.currentPage }, "aria-label": `Go to page ${page}`, "aria-current": page === this.currentPage ? 'page' : null, onClick: () => this.go(page) }, page))), h("button", { key: 'a04ea4e40140b486bbf51c9ad246d97d3907f30e', type: "button", class: "page-btn nav-btn", "aria-label": "Go to next page", disabled: isLast, "aria-disabled": isLast ? 'true' : null, onClick: () => this.go(this.currentPage + 1) }, h("svg", { key: '451f7d4f785b1e1c6ddbd99c790774b982e8187d', "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.8", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { key: '0e108eb5675b5398236437daa03cf56df482660f', d: "M9 18l6-6-6-6" }))))));
    }
};
FbPagination.style = fbPaginationCss();

const fbPopoverCss = () => `:host{display:contents}.fb-popover-anchor{display:inline-flex;position:relative}.fb-popover-trigger{background:none;border:none;padding:0;cursor:pointer;font-family:var(--font-family-primary)}.fb-popover-trigger:focus-visible{outline:var(--focus-width) solid var(--focus-color);outline-offset:var(--focus-offset)}.fb-popover{position:absolute;z-index:60;min-width:240px;max-width:320px;background:var(--color-neutral-white);border:1px solid var(--color-neutral-200);border-radius:var(--radius-md);box-shadow:var(--shadow-300);padding:0}.fb-popover--bottom{top:calc(100% + 8px);left:0}.fb-popover--top{bottom:calc(100% + 8px);left:0}.fb-popover--right{left:calc(100% + 8px);top:0}.fb-popover--left{right:calc(100% + 8px);top:0}.fb-popover__header{display:flex;align-items:center;justify-content:space-between;padding:var(--spacing-12) var(--spacing-16) var(--spacing-8);border-bottom:1px solid var(--color-neutral-100)}.fb-popover__heading{font-family:var(--font-family-primary);font-size:var(--font-size-14);font-weight:var(--font-weight-semibold);color:var(--color-neutral-black)}.fb-popover__close{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;background:none;border:none;border-radius:var(--radius-xs);cursor:pointer;color:var(--color-neutral-500);padding:0;margin-left:auto}.fb-popover__close:hover{background:var(--color-neutral-100);color:var(--color-neutral-800)}.fb-popover__close:focus-visible{outline:var(--focus-width) solid var(--focus-color);outline-offset:var(--focus-offset)}.fb-popover__body{padding:var(--spacing-12) var(--spacing-16) var(--spacing-16);font-family:var(--font-family-primary);font-size:var(--font-size-14);color:var(--color-neutral-700)}`;

let idCounter$8 = 0;
const FbPopover = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.fbOpen = createEvent(this, "fbOpen");
        this.fbClose = createEvent(this, "fbClose");
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
        return (h(Host, { key: 'd97edc9dede6238dd2eee2daf9f9c6ffd271f9ff' }, h("span", { key: 'c3956574fa7d4f2b490c955fd784f74f344be776', class: "fb-popover-anchor" }, h("button", { key: '810a49e18466ac07a78c68f9421c4c5c6927cce5', id: this.triggerId, type: "button", "aria-haspopup": "dialog", "aria-expanded": this._open ? 'true' : 'false', "aria-controls": this._open ? this.popoverId : null, class: "fb-popover-trigger", onClick: () => this.toggle() }, h("slot", { key: 'b95a15b41080c79efd64d0aaa7bb3af977da986f', name: "trigger" }, "Open")), this._open && (h("div", { key: '34c3434e9e8e828180a742599459e67a3f803994', id: this.popoverId, role: "dialog", "aria-modal": "false", "aria-label": this.heading || 'Popover', class: `fb-popover fb-popover--${this.placement}`, onKeyDown: this.handleKeyDown }, h("div", { key: '873a8276088358fac5acc07813f321a423cd6eae', class: "fb-popover__header" }, this.heading && h("span", { key: '97b966e6f384e7c0b4cef4a27e7fa54adcd465eb', class: "fb-popover__heading" }, this.heading), h("button", { key: 'ff4e29db1b3b3eda2987c295d29c58380130a37e', type: "button", class: "fb-popover__close", "aria-label": "Close popover", onClick: () => this.closePopover() }, h("svg", { key: 'c8dbb1f2ea13b8fde1e8cf657eda630ff57f72b3', "aria-hidden": "true", width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { key: '175c89627f9c0b8fbd53e9fa91a21772a851104f', d: "M18 6L6 18M6 6l12 12" })))), h("div", { key: 'c8a319c6955a1060e9f8bea1ed1a5e83c4722aaa', class: "fb-popover__body" }, h("slot", { key: '97702acb40fa7735868484a1e8deb1acec3fd954' })))))));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "open": [{
                "onOpenChange": 0
            }]
    }; }
};
FbPopover.style = fbPopoverCss();

const fbRadioGroupCss = () => `:host{display:block}.fb-radio-group{border:none;padding:0;margin:0;font-family:var(--font-family-primary)}.fb-legend{font-size:var(--font-size-14);font-weight:var(--font-weight-semibold);color:var(--color-neutral-700);margin-bottom:var(--spacing-8);padding:0}.options-list{display:flex;flex-direction:column;gap:var(--spacing-8)}.fb-radio-label{display:inline-flex;align-items:center;gap:var(--spacing-8);cursor:pointer;font-size:var(--font-size-14);color:var(--color-neutral-700)}.fb-radio-label.disabled{opacity:0.5;cursor:not-allowed}.native-radio{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}.native-radio:focus-visible+.radio-dot{outline:var(--focus-width) solid var(--focus-color);outline-offset:var(--focus-offset)}.radio-dot{width:18px;height:18px;border-radius:var(--radius-max);border:var(--border-standard) solid var(--color-neutral-400);background-color:var(--color-neutral-white);display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;transition:border-color 0.15s}.radio-dot::after{content:'';width:8px;height:8px;border-radius:var(--radius-max);background-color:transparent;transition:background-color 0.15s}.radio-dot.checked{border-color:var(--color-primary-500)}.radio-dot.checked::after{background-color:var(--color-primary-500)}.has-error .radio-dot{border-color:var(--color-danger-500)}.fb-helper{margin-top:var(--spacing-4);font-size:var(--font-size-12);color:var(--color-neutral-500)}.fb-helper--error{color:var(--color-danger-600)}`;

let idCounter$7 = 0;
const FbRadioGroup = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.fbChange = createEvent(this, "fbChange");
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
        return (h(Host, { key: 'c1dcd925bee51b2b16a55b6aec766f752e9dcc75' }, h("fieldset", { key: 'e18b0a24b04f2ab486ae75aba16002a84e07fee9', class: { 'fb-radio-group': true, 'has-error': this.isError }, disabled: this.disabled, "aria-describedby": hasHelper ? this.helperId : null, "aria-required": this.required ? 'true' : null }, this.label && h("legend", { key: '55a6779bab533ce67b4a96c20eae7f675f8f459a', class: "fb-legend" }, this.label), h("div", { key: '2c81b142af64f3aaaa585e44f950631ae352ca88', class: "options-list" }, options.map((opt) => {
            const optId = `${this.groupName}-${opt.value}`;
            return (h("label", { key: opt.value, htmlFor: optId, class: {
                    'fb-radio-label': true,
                    'disabled': opt.disabled || this.disabled,
                } }, h("input", { id: optId, type: "radio", name: this.groupName, value: opt.value, checked: this.value === opt.value, disabled: opt.disabled || this.disabled, required: this.required, class: "native-radio", onChange: () => {
                    this.value = opt.value;
                    this.fbChange.emit(opt.value);
                } }), h("span", { "aria-hidden": "true", class: { 'radio-dot': true, 'checked': this.value === opt.value } }), h("span", { class: "option-label" }, opt.label)));
        })), hasHelper && (h("div", { key: 'b1edb8c79c7e86a63e826421bedd3efb3b0ff396', id: this.helperId, class: { 'fb-helper': true, 'fb-helper--error': this.isError }, role: this.isError ? 'alert' : null }, this.helperText)))));
    }
};
FbRadioGroup.style = fbRadioGroupCss();

const fbSelectCss = () => `:host{display:block}.fb-select-wrapper{display:flex;flex-direction:column;gap:var(--spacing-4);width:100%}.fb-label{font-size:var(--font-size-14);font-weight:var(--font-weight-semibold);color:var(--color-neutral-700)}.required-indicator{color:var(--color-danger-500)}.fb-select-trigger{display:flex;align-items:center;justify-content:space-between;width:100%;font-family:var(--font-family-primary);text-align:left;border:var(--border-standard) solid var(--color-neutral-400);border-radius:var(--radius-sm);background-color:var(--color-neutral-white);cursor:pointer;box-sizing:border-box;transition:border-color 0.15s}.fb-select-trigger:focus-visible{outline:var(--focus-width) solid var(--focus-color);outline-offset:var(--focus-offset)}.fb-select-trigger.open{border-color:var(--color-primary-500)}.fb-select-trigger.state-error{border-color:var(--color-danger-500);border-width:var(--border-thick)}.fb-select-trigger.state-disabled{background-color:var(--color-neutral-100);opacity:0.6;cursor:not-allowed}.size-sm{height:32px;padding:0 var(--spacing-8);font-size:var(--font-size-12)}.size-default{height:40px;padding:0 var(--spacing-12);font-size:var(--font-size-14)}.size-lg{height:48px;padding:0 var(--spacing-16);font-size:var(--font-size-16)}.trigger-text{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--color-neutral-600)}.fb-select-trigger.has-value .trigger-text{color:var(--color-neutral-black)}.chevron{display:flex;align-items:center;color:var(--color-neutral-600);transition:transform 0.2s;flex-shrink:0}.chevron--open{transform:rotate(180deg)}.fb-listbox{position:absolute;top:calc(100% + 4px);left:0;right:0;background-color:var(--color-neutral-white);border:var(--border-standard) solid var(--color-neutral-200);border-radius:var(--radius-sm);box-shadow:var(--shadow-200);z-index:50;overflow-y:auto;max-height:240px;padding:var(--spacing-4) 0;margin:0;list-style:none}.fb-option{display:flex;align-items:center;justify-content:space-between;padding:var(--spacing-8) var(--spacing-12);font-size:var(--font-size-14);font-family:var(--font-family-primary);color:var(--color-neutral-black);cursor:pointer;transition:background-color 0.1s}.fb-option:hover:not(.disabled){background-color:var(--color-neutral-50)}.fb-option.focused:not(.disabled){background-color:var(--color-primary-50)}.fb-option.selected{background-color:var(--color-primary-50);color:var(--color-primary-600)}.fb-option.disabled{opacity:0.4;cursor:not-allowed}.fb-helper{display:flex;align-items:center;gap:var(--spacing-4);font-size:var(--font-size-12);color:var(--color-neutral-500)}.fb-helper--error{color:var(--color-danger-600)}`;

let idCounter$6 = 0;
const FbSelect = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.fbChange = createEvent(this, "fbChange");
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
        return (h(Host, { key: '313434f9907acad78a8ba0eec85e0f33b86cea10' }, h("div", { key: 'b57a0d2908cdc11680f174d49815c3c1a8a87446', class: "fb-select-wrapper", style: { fontFamily: 'var(--font-family-primary)' } }, this.label && (h("label", { key: '88115af578b92dd6b00a49f3734dd8c2cf6401fa', id: this.labelId, htmlFor: this.triggerId, class: "fb-label" }, this.label, this.required && h("span", { key: '14014ef8d1ed2ef1c4517739e9a6b4ca92b6f457', class: "required-indicator", "aria-hidden": "true" }, " *"))), h("div", { key: '5b0a6189f0dc209f7043299aaa0ba462f5b7b2f2', class: "fb-select-container", style: { position: 'relative' } }, h("button", { key: 'e2eb2a99e229573d3ea0b9c385e7d455b2f2266c', id: this.triggerId, type: "button", role: "combobox", "aria-haspopup": "listbox", "aria-expanded": this.open ? 'true' : 'false', "aria-controls": this.listboxId, "aria-labelledby": this.label ? `${this.labelId} ${this.triggerId}` : null, "aria-activedescendant": activeId, "aria-required": this.required ? 'true' : null, "aria-invalid": this.isError ? 'true' : null, "aria-describedby": hasHelper ? this.helperId : null, disabled: this.isDisabled, class: {
                'fb-select-trigger': true,
                [`size-${this.size}`]: true,
                'open': this.open,
                'state-error': this.isError,
                'state-disabled': this.isDisabled,
                'has-value': !!this.selectedOption,
            }, onClick: () => this.open ? this.close() : this.open_(), onKeyDown: this.handleTriggerKeyDown }, h("span", { key: 'ebb029d9fa62dac6fed8d264ea0eff6c0aefa167', class: "trigger-text" }, this.selectedOption ? this.selectedOption.label : this.placeholder), h("span", { key: '4f8114ab3ba6af0ae36cd7313e0249ea19926b04', "aria-hidden": "true", class: { 'chevron': true, 'chevron--open': this.open } }, h("svg", { key: '6a50d3cc58926c414cbfb6273b060dc43561f83a', width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.8", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { key: '9dd3606c0088790e86f8a11f98a9df47d6c360f6', d: "M6 9l6 6 6-6" })))), this.open && (h("ul", { key: '519ce70d80fe8026b1896da3532216dce9e0ae56', id: this.listboxId, role: "listbox", "aria-label": this.label || 'Options', class: "fb-listbox" }, opts.map((opt) => {
            var _a;
            const isSelected = this.value === opt.value;
            const isFocused = ((_a = enabledOpts[this.focusedIndex]) === null || _a === void 0 ? void 0 : _a.value) === opt.value;
            const optionId = `${this.listboxId}-opt-${opt.value}`;
            return (h("li", { key: opt.value, id: optionId, role: "option", "aria-selected": isSelected ? 'true' : 'false', "aria-disabled": opt.disabled ? 'true' : null, class: {
                    'fb-option': true,
                    'selected': isSelected,
                    'focused': isFocused,
                    'disabled': !!opt.disabled,
                }, onClick: () => this.selectOption(opt), onKeyDown: (e) => this.handleOptionKeyDown(e, opt) }, h("span", null, opt.label), isSelected && (h("svg", { "aria-hidden": "true", width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { d: "M20 6L9 17l-5-5" })))));
        })))), hasHelper && (h("div", { key: 'a2b1c98973414b10f13e93bf07319d8a88b268c0', id: this.helperId, class: { 'fb-helper': true, 'fb-helper--error': this.isError }, role: this.isError ? 'alert' : null }, this.helperText)))));
    }
    get el() { return getElement(this); }
};
FbSelect.style = fbSelectCss();

const fbSeparatorCss = () => `:host{display:block}:host([orientation="vertical"]){display:inline-flex;align-self:stretch}.fb-separator{border:none;margin:0}.fb-separator--horizontal{width:100%;height:1px;background:var(--color-neutral-200);display:block}.fb-separator--vertical{width:1px;height:100%;background:var(--color-neutral-200);display:inline-block;align-self:stretch}.fb-separator--labeled{display:flex;align-items:center;gap:var(--spacing-12);height:auto;background:none}.fb-separator--labeled::before,.fb-separator--labeled::after{content:'';flex:1;height:1px;background:var(--color-neutral-200)}.fb-separator__label{font-family:var(--font-family-primary);font-size:var(--font-size-12);font-weight:var(--font-weight-medium);color:var(--color-neutral-500);white-space:nowrap;user-select:none}`;

const FbSeparator = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
};
FbSeparator.style = fbSeparatorCss();

const fbSideSheetCss = () => `:host{display:contents}.fb-side-sheet__overlay{position:fixed;inset:0;background:rgba(0, 0, 0, 0.4);z-index:200}.fb-side-sheet{position:fixed;top:0;bottom:0;z-index:201;display:flex;flex-direction:column;background:var(--color-neutral-white);box-shadow:var(--shadow-400);transition:transform 0.25s ease}.fb-side-sheet--right{right:0;transform:translateX(100%)}.fb-side-sheet--left{left:0;transform:translateX(-100%)}.fb-side-sheet--right.fb-side-sheet--open{transform:translateX(0)}.fb-side-sheet--left.fb-side-sheet--open{transform:translateX(0)}.fb-side-sheet--sm{width:320px}.fb-side-sheet--default{width:480px}.fb-side-sheet--lg{width:640px}@media (max-width: 640px){.fb-side-sheet{width:100% !important}}.fb-side-sheet__header{display:flex;align-items:center;justify-content:space-between;padding:var(--spacing-16) var(--spacing-24);border-bottom:1px solid var(--color-neutral-200);flex-shrink:0}.fb-side-sheet__heading{font-family:var(--font-family-primary);font-size:var(--font-size-18);font-weight:var(--font-weight-semibold);color:var(--color-neutral-black);margin:0}.fb-side-sheet__close{display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;background:none;border:none;border-radius:var(--radius-sm);cursor:pointer;color:var(--color-neutral-500);padding:0}.fb-side-sheet__close:hover{background:var(--color-neutral-100);color:var(--color-neutral-800)}.fb-side-sheet__close:focus-visible{outline:var(--focus-width) solid var(--focus-color);outline-offset:var(--focus-offset)}.fb-side-sheet__body{flex:1;overflow-y:auto;padding:var(--spacing-24);font-family:var(--font-family-primary);font-size:var(--font-size-14);color:var(--color-neutral-700)}.fb-side-sheet__footer{padding:var(--spacing-16) var(--spacing-24);border-top:1px solid var(--color-neutral-200);flex-shrink:0}.fb-side-sheet__footer:empty{display:none}@media (prefers-reduced-motion: reduce){.fb-side-sheet{transition:none}}`;

let idCounter$5 = 0;
const FbSideSheet = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.fbClose = createEvent(this, "fbClose");
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
            return h(Host, null);
        return (h(Host, null, h("div", { class: "fb-side-sheet__overlay", "aria-hidden": "true", onClick: () => this.close() }), h("div", { id: this.sheetId, role: "dialog", "aria-modal": "true", "aria-labelledby": this.headingId, class: {
                'fb-side-sheet': true,
                [`fb-side-sheet--${this.side}`]: true,
                [`fb-side-sheet--${this.size}`]: true,
                'fb-side-sheet--open': this._open || this.open,
            } }, h("div", { class: "fb-side-sheet__header" }, this.heading
            ? h("h2", { id: this.headingId, class: "fb-side-sheet__heading" }, this.heading)
            : h("span", { id: this.headingId }, h("slot", { name: "heading" })), h("button", { type: "button", class: "fb-side-sheet__close", "aria-label": "Close panel", onClick: () => this.close() }, h("svg", { "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { d: "M18 6L6 18M6 6l12 12" })))), h("div", { class: "fb-side-sheet__body" }, h("slot", null)), h("div", { class: "fb-side-sheet__footer" }, h("slot", { name: "footer" })))));
    }
    get el() { return getElement(this); }
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
        registerInstance(this, hostRef);
        this.fbNavigate = createEvent(this, "fbNavigate");
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
            return (h("li", { key: item.id, class: "fb-sidebar__item" }, hasChildren ? (h("div", null, h("button", { id: this.triggerId(item.id), type: "button", "aria-expanded": isExpanded ? 'true' : 'false', "aria-controls": this.panelId(item.id), disabled: item.disabled, class: {
                    'fb-sidebar__link': true,
                    'fb-sidebar__link--group': true,
                    [`fb-sidebar__link--depth-${depth}`]: true,
                    'fb-sidebar__link--disabled': !!item.disabled,
                }, onClick: () => this.toggleExpand(item.id) }, item.icon && h("span", { class: "fb-sidebar__icon", "aria-hidden": "true", innerHTML: item.icon }), !this.collapsed && h("span", { class: "fb-sidebar__label" }, item.label), !this.collapsed && (h("svg", { "aria-hidden": "true", class: { 'fb-sidebar__chevron': true, 'fb-sidebar__chevron--open': isExpanded }, width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { d: "M6 9l6 6 6-6" })))), isExpanded && (h("ul", { id: this.panelId(item.id), role: "list", class: "fb-sidebar__submenu" }, this.renderItems(item.children, depth + 1))))) : (item.href
                ? (h("a", { href: item.href, "aria-current": isActive ? 'page' : null, "aria-disabled": item.disabled ? 'true' : null, class: {
                        'fb-sidebar__link': true,
                        'fb-sidebar__link--active': isActive,
                        [`fb-sidebar__link--depth-${depth}`]: true,
                        'fb-sidebar__link--disabled': !!item.disabled,
                    }, onClick: (e) => { e.preventDefault(); this.navigate(item); } }, item.icon && h("span", { class: "fb-sidebar__icon", "aria-hidden": "true", innerHTML: item.icon }), !this.collapsed && h("span", { class: "fb-sidebar__label" }, item.label)))
                : (h("button", { type: "button", "aria-current": isActive ? 'page' : null, disabled: item.disabled, class: {
                        'fb-sidebar__link': true,
                        'fb-sidebar__link--active': isActive,
                        [`fb-sidebar__link--depth-${depth}`]: true,
                        'fb-sidebar__link--disabled': !!item.disabled,
                    }, onClick: () => this.navigate(item) }, item.icon && h("span", { class: "fb-sidebar__icon", "aria-hidden": "true", innerHTML: item.icon }), !this.collapsed && h("span", { class: "fb-sidebar__label" }, item.label))))));
        });
    }
    render() {
        const items = this.parsedItems;
        return (h(Host, { key: '306cff7696de1ebb67738bd4769984a0772dc87a' }, h("nav", { key: 'ed7d69bbd8e22e684b7f7c62c224a7a1984ae8d3', "aria-label": this.label, class: { 'fb-sidebar': true, 'fb-sidebar--collapsed': this.collapsed } }, h("ul", { key: 'd20cf25164f2f4589f844692e0a8c085fe5dd2a7', role: "list", class: "fb-sidebar__list" }, this.renderItems(items)), h("slot", { key: '823410195a9df4a93043f65d8032eeb2ee523d61', name: "footer" }))));
    }
};
FbSidebar.style = fbSidebarCss();

const fbSkeletonCss = () => `:host{display:block}.fb-skeleton{display:block;background:linear-gradient(     90deg,     var(--color-neutral-100) 25%,     var(--color-neutral-50)  50%,     var(--color-neutral-100) 75%   );background-size:200% 100%;animation:fb-shimmer 1.4s ease-in-out infinite}.variant-text{border-radius:var(--radius-xs)}.variant-rect{border-radius:var(--radius-sm)}.variant-circle{border-radius:var(--radius-max)}@keyframes fb-shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}@media (prefers-reduced-motion: reduce){.fb-skeleton{animation:none;opacity:0.6}}`;

const FbSkeleton = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        return (h(Host, { key: '0db41cd256f6b6c2c161e539ff4ad3edf8288fe4' }, h("span", { key: '4c817ed1f6fdf6710cf09af84f41eeb7ba265b5a', "aria-hidden": "true", class: { 'fb-skeleton': true, [`variant-${this.variant}`]: true }, style: style })));
    }
};
FbSkeleton.style = fbSkeletonCss();

const fbSpinnerCss = () => `:host{display:inline-flex}.fb-spinner{display:inline-flex;align-items:center;justify-content:center}.spinner-svg{animation:fb-spin 0.75s linear infinite}.track{stroke:var(--color-neutral-200)}.arc{stroke:var(--color-primary-500)}.size-sm .spinner-svg{width:16px;height:16px}.size-default .spinner-svg{width:24px;height:24px}.size-lg .spinner-svg{width:36px;height:36px}.fb-spinner .spinner-svg{width:24px;height:24px}@keyframes fb-spin{to{transform:rotate(360deg)}}@media (prefers-reduced-motion: reduce){.spinner-svg{animation-duration:2s}}.visually-hidden{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border:0}`;

const FbSpinner = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /** Size of the spinner */
        this.size = 'default';
        /** Accessible label announced to screen readers */
        this.label = 'Loading, please wait';
    }
    render() {
        return (h(Host, { key: '82406bca363db2a0d15837aef618bd3da581ea1f' }, h("span", { key: '0b27cb8ffe3e22f95ea519d96fcf3c85812c87b5', role: "status", "aria-label": this.label, class: { 'fb-spinner': true, [`size-${this.size}`]: true } }, h("svg", { key: '2439875da5a014ee63fcde783deb310d08827c1d', "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", class: "spinner-svg" }, h("circle", { key: 'd6ea3f7040060e54e0744ab31daa06902fb71f20', class: "track", cx: "12", cy: "12", r: "10", "stroke-width": "2.5" }), h("path", { key: '65c1d1d882cc9c76ee5c8bc157201ff3d5f044d8', class: "arc", d: "M12 2a10 10 0 0 1 10 10", "stroke-width": "2.5", "stroke-linecap": "round" })), h("span", { key: '33758a9667b49bfb4da326a18694fa227d89a984', class: "visually-hidden" }, this.label))));
    }
};
FbSpinner.style = fbSpinnerCss();

const fbSwitchCss = () => `:host{display:block}.fb-switch-wrapper{display:flex;flex-direction:column;gap:var(--spacing-4);font-family:var(--font-family-primary)}.fb-switch-label{display:inline-flex;align-items:center;gap:var(--spacing-8);cursor:pointer}.fb-switch-label.disabled{opacity:0.5;cursor:not-allowed}.native-switch{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}.native-switch:focus-visible+.switch-track{outline:var(--focus-width) solid var(--focus-color);outline-offset:var(--focus-offset)}.switch-track{position:relative;width:44px;height:24px;border-radius:var(--radius-max);background-color:var(--color-neutral-300);transition:background-color 0.2s;flex-shrink:0}.switch-track.on{background-color:var(--color-primary-500)}.switch-thumb{position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:var(--radius-max);background-color:white;box-shadow:0 1px 3px rgba(0,0,0,0.2);transition:transform 0.2s}.switch-track.on .switch-thumb{transform:translateX(20px)}.label-text{font-size:var(--font-size-14);color:var(--color-neutral-700)}.fb-helper{font-size:var(--font-size-12);color:var(--color-neutral-500);padding-left:52px}`;

let idCounter$3 = 0;
const FbSwitch = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.fbChange = createEvent(this, "fbChange");
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
        return (h(Host, { key: 'b25865eb469e9324c70bb1d6f280bd6298557130' }, h("div", { key: 'd35b0d45c0a7cb174e9f3a33eb939d52a4a9e5e5', class: "fb-switch-wrapper" }, h("label", { key: 'fde740a50cd1fe17a1f8b81bbbfc42224143a03e', htmlFor: this.switchId, class: { 'fb-switch-label': true, 'disabled': this.disabled } }, h("input", { key: 'e261e41a283096129a78c84df59a7cda645ea9b2', id: this.switchId, type: "checkbox", role: "switch", checked: this.checked, disabled: this.disabled, "aria-checked": this.checked ? 'true' : 'false', "aria-describedby": hasHelper ? this.helperId : null, class: "native-switch", onChange: (e) => {
                this.checked = e.target.checked;
                this.fbChange.emit(this.checked);
            } }), h("span", { key: 'feb6fb46c0466b739298c3abfcae8ffc2ce639ce', "aria-hidden": "true", class: { 'switch-track': true, 'on': this.checked } }, h("span", { key: 'e50b16fb47b6f193a55a3bcbf54c843f9a19efb0', class: "switch-thumb" })), this.label && h("span", { key: '07a1e87c7d6bee2601058fdeeeb2872862c15829', class: "label-text" }, this.label)), hasHelper && (h("div", { key: '86f44f92f7d945ea8aa347c3b01f7e9e93242ffc', id: this.helperId, class: "fb-helper" }, this.helperText)))));
    }
};
FbSwitch.style = fbSwitchCss();

const fbTabsCss = () => `:host{display:block}.fb-tablist{display:flex;align-items:center}.variant-underline{border-bottom:1px solid var(--color-neutral-400);gap:0}.variant-pill{background:var(--color-primary-50);padding:var(--spacing-4);border-radius:var(--radius-sm);gap:var(--spacing-4)}.fb-tablist.full-width{width:100%}.fb-tab{background:transparent;border:none;cursor:pointer;font-family:var(--font-family-primary);font-weight:var(--font-weight-regular);color:var(--color-neutral-500);white-space:nowrap;transition:color 0.15s, background-color 0.15s;outline-offset:-2px}.fb-tab:focus-visible{outline:var(--focus-width) solid var(--focus-color);border-radius:var(--radius-xs)}.fb-tab.full-width{flex:1;text-align:center}.size-sm{font-size:var(--font-size-12);padding:6px var(--spacing-12)}.size-default{font-size:var(--font-size-14);padding:10px var(--spacing-16)}.size-lg{font-size:var(--font-size-16);padding:var(--spacing-12) var(--spacing-20)}.variant-underline .fb-tab{border-bottom:2px solid transparent;margin-bottom:-1px;border-radius:0}.variant-underline .fb-tab:hover:not(.disabled):not(.active){color:var(--color-neutral-700);border-bottom-color:var(--color-neutral-200)}.variant-underline .fb-tab.active{color:var(--color-primary-500);font-weight:var(--font-weight-semibold);border-bottom-color:var(--color-primary-500)}.variant-pill .fb-tab{border-radius:var(--radius-xs);border:1px solid transparent}.variant-pill .fb-tab:hover:not(.disabled):not(.active){background-color:color-mix(in srgb, var(--color-primary-100) 50%, transparent)}.variant-pill .fb-tab.active{background-color:var(--color-neutral-white);border-color:var(--color-primary-500);color:var(--color-primary-600);font-weight:var(--font-weight-semibold)}.fb-tab.disabled{opacity:0.4;cursor:not-allowed}.fb-tabpanel{padding-top:var(--spacing-16);font-family:var(--font-family-primary);outline:none}.fb-tabpanel:focus-visible{outline:var(--focus-width) solid var(--focus-color);outline-offset:var(--focus-offset);border-radius:var(--radius-xs)}`;

let idCounter$2 = 0;
const FbTabs = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.fbTabChange = createEvent(this, "fbTabChange");
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
        return (h(Host, { key: '6e5dfc617b109630dd86b81e559113bef8eeceda', ref: (el) => this.el = el }, h("div", { key: 'e1de632f1442b9b90f58d931d4ebd247d0b2be4b', role: "tablist", "aria-label": this.label, class: {
                'fb-tablist': true,
                [`variant-${this.variant}`]: true,
                'full-width': this.fullWidth,
            } }, tabs.map((tab, index) => {
            const isActive = tab.id === active;
            const isDisabled = !!tab.disabled;
            return (h("button", { key: tab.id, id: this.tabId(tab.id), role: "tab", "aria-selected": isActive ? 'true' : 'false', "aria-controls": this.panelId(tab.id), "aria-disabled": isDisabled ? 'true' : null, tabindex: isActive ? 0 : -1, disabled: isDisabled, class: {
                    'fb-tab': true,
                    [`size-${this.size}`]: true,
                    'active': isActive,
                    'disabled': isDisabled,
                    'full-width': this.fullWidth,
                }, onClick: () => !isDisabled && this.activate(tab.id), onKeyDown: (e) => !isDisabled && this.handleKeyDown(e, index) }, tab.label));
        })), tabs.map((tab) => (h("div", { key: tab.id, id: this.panelId(tab.id), role: "tabpanel", "aria-labelledby": this.tabId(tab.id), tabindex: 0, hidden: tab.id !== active, class: "fb-tabpanel" }, h("slot", { name: tab.id }))))));
    }
};
FbTabs.style = fbTabsCss();

const fbTextareaCss = () => `:host{display:block}.fb-textarea-wrapper{display:flex;flex-direction:column;gap:var(--spacing-4);font-family:var(--font-family-primary);width:100%}.fb-label{font-size:var(--font-size-14);font-weight:var(--font-weight-semibold);color:var(--color-neutral-700)}.required-indicator{color:var(--color-danger-500)}.fb-textarea{width:100%;font-family:var(--font-family-primary);color:var(--color-neutral-black);border:var(--border-standard) solid var(--color-neutral-400);border-radius:var(--radius-sm);background-color:var(--color-neutral-white);resize:vertical;box-sizing:border-box;transition:border-color 0.15s, box-shadow 0.15s;outline:none}.size-sm{font-size:var(--font-size-12);padding:var(--spacing-8)}.size-default{font-size:var(--font-size-14);padding:var(--spacing-12)}.size-lg{font-size:var(--font-size-16);padding:var(--spacing-16)}.fb-textarea:focus-visible{border-color:var(--color-primary-500);box-shadow:0 0 0 var(--focus-width) color-mix(in srgb, var(--focus-color) 20%, transparent)}.state-error{border-color:var(--color-danger-500);border-width:var(--border-thick)}.state-disabled{background-color:var(--color-neutral-100);border-color:var(--color-neutral-200);opacity:0.6;cursor:not-allowed}.state-readonly{background-color:var(--color-neutral-50)}.fb-textarea::placeholder{color:var(--color-neutral-600)}.fb-textarea-footer{display:flex;justify-content:space-between;align-items:flex-start}.fb-helper{display:flex;align-items:center;gap:var(--spacing-4);font-size:var(--font-size-12);color:var(--color-neutral-500)}.fb-helper--error{color:var(--color-danger-600)}.fb-counter{font-size:var(--font-size-12);color:var(--color-neutral-500);margin-left:auto}.fb-counter--limit{color:var(--color-danger-500);font-weight:var(--font-weight-semibold)}`;

let idCounter$1 = 0;
const FbTextarea = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.fbChange = createEvent(this, "fbChange");
        this.fbFocus = createEvent(this, "fbFocus");
        this.fbBlur = createEvent(this, "fbBlur");
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
        return (h(Host, { key: '630b8868b728ea7c4f8a4f35fa011dfaa6a7eda2' }, h("div", { key: '74753e90d501a52cdc5ee9a4e88da136a82e5dde', class: "fb-textarea-wrapper" }, this.label && (h("label", { key: '1dd225293354e08fd408c35c441a649e24d5aa73', htmlFor: this.textareaId, class: "fb-label" }, this.label, this.required && h("span", { key: 'c2ae106aee20a65a91c8b33db38d269a598f900f', class: "required-indicator", "aria-hidden": "true" }, " *"))), h("textarea", { key: '59bf5e4092a549cca31b17280b31702bb245d4c3', id: this.textareaId, rows: this.rows, placeholder: this.placeholder, disabled: this.isDisabled, readOnly: this.isReadOnly, required: this.required, maxLength: this.maxLength, "aria-required": this.required ? 'true' : null, "aria-invalid": this.isError ? 'true' : null, "aria-describedby": describedBy, class: {
                'fb-textarea': true,
                [`size-${this.size}`]: true,
                'state-error': this.isError,
                'state-disabled': this.isDisabled,
                'state-readonly': this.isReadOnly,
            }, onInput: (e) => {
                const val = e.target.value;
                this.value = val;
                this.fbChange.emit(val);
            }, onFocus: () => this.fbFocus.emit(), onBlur: () => this.fbBlur.emit() }, this.value), h("div", { key: '15c66b58650087db27362fe0568d21cfee66bcf4', class: "fb-textarea-footer" }, hasHelper && (h("div", { key: 'cb4f8bd02565a4e81c9f4e8ff8dddc1a1ace6b35', id: this.helperId, class: { 'fb-helper': true, 'fb-helper--error': this.isError }, role: this.isError ? 'alert' : null }, this.isError && (h("svg", { key: 'b6004e8c352db2a7ef5445815e4ed49f4abda951', "aria-hidden": "true", width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("circle", { key: '8b8c490bb9fcb8a4231f88f3eb1f4b2b6b7db369', cx: "12", cy: "12", r: "10" }), h("line", { key: '76bcfcb572878cbf26a463ee77a960f3ede1ca77', x1: "12", y1: "8", x2: "12", y2: "12" }), h("line", { key: 'bd91ccf081e81c7d516875d451ea952e5904a20c', x1: "12", y1: "16", x2: "12.01", y2: "16" }))), this.helperText)), showCounter && (
        // aria-live="polite" announces the count as the user types
        h("div", { key: '07c712f8bb7f9a47a2aa9be430c1c34d90f9c8f9', id: counterId, class: { 'fb-counter': true, 'fb-counter--limit': charCount >= this.maxLength }, "aria-live": "polite" }, charCount, "/", this.maxLength))))));
    }
};
FbTextarea.style = fbTextareaCss();

const fbTimelineCss = () => `:host{display:block}.fb-timeline{list-style:none;margin:0;padding:0;font-family:var(--font-family-primary)}.fb-timeline--vertical .fb-timeline__item{display:grid;grid-template-columns:32px 1fr;gap:0 var(--spacing-12);position:relative}.fb-timeline--vertical .fb-timeline__item:not(:last-child){padding-bottom:var(--spacing-24)}.fb-timeline__indicator{display:flex;flex-direction:column;align-items:center}.fb-timeline__dot{display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;flex-shrink:0;border:2px solid var(--color-neutral-300);background:var(--color-neutral-white);color:var(--color-neutral-white)}.fb-timeline__dot--complete{background:var(--color-success-500);border-color:var(--color-success-500)}.fb-timeline__dot--active{background:var(--color-primary-500);border-color:var(--color-primary-500)}.fb-timeline__dot--pending{background:var(--color-neutral-white);border-color:var(--color-neutral-300)}.fb-timeline__dot-inner{width:8px;height:8px;border-radius:50%;background:var(--color-neutral-white)}.fb-timeline__line{flex:1;width:2px;background:var(--color-neutral-200);margin:var(--spacing-4) 0;min-height:var(--spacing-16)}.fb-timeline__content{padding-top:var(--spacing-4)}.fb-timeline__timestamp{display:block;font-size:var(--font-size-12);color:var(--color-neutral-500);margin-bottom:var(--spacing-2)}.fb-timeline__title{margin:0;font-size:var(--font-size-14);font-weight:var(--font-weight-semibold);color:var(--color-neutral-black)}.fb-timeline__description{margin:var(--spacing-4) 0 0;font-size:var(--font-size-14);color:var(--color-neutral-600);line-height:1.5}.fb-timeline--horizontal{display:flex;align-items:flex-start;overflow-x:auto}.fb-timeline--horizontal .fb-timeline__item{display:flex;flex-direction:column;align-items:center;flex:1;min-width:120px;padding:0 var(--spacing-8)}.fb-timeline--horizontal .fb-timeline__indicator{flex-direction:row;width:100%;align-items:center;margin-bottom:var(--spacing-8)}.fb-timeline--horizontal .fb-timeline__line{flex:1;width:auto;height:2px;margin:0 var(--spacing-4);min-height:unset}.fb-timeline--horizontal .fb-timeline__content{text-align:center;padding-top:0}`;

const FbTimeline = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
            return (h("svg", { "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2.5", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { d: "M20 6L9 17l-5-5" })));
        }
        if (status === 'active') {
            return h("span", { class: "fb-timeline__dot-inner" });
        }
        return null;
    }
    render() {
        const items = this.parsedItems;
        return (h(Host, { key: '1eed34c9e14569dfa362dae454327c007ad06422' }, h("ol", { key: 'e5c78e16827cdfcd96e500c5099b18498ff76daa', "aria-label": this.label, class: `fb-timeline fb-timeline--${this.orientation}` }, items.map((item, i) => {
            var _a, _b, _c;
            return (h("li", { key: item.id, class: {
                    'fb-timeline__item': true,
                    [`fb-timeline__item--${(_a = item.status) !== null && _a !== void 0 ? _a : 'pending'}`]: true,
                    'fb-timeline__item--last': i === items.length - 1,
                } }, h("div", { class: "fb-timeline__indicator", "aria-hidden": "true" }, h("span", { class: `fb-timeline__dot fb-timeline__dot--${(_b = item.status) !== null && _b !== void 0 ? _b : 'pending'}` }, this.statusIcon((_c = item.status) !== null && _c !== void 0 ? _c : 'pending')), i < items.length - 1 && h("span", { class: "fb-timeline__line" })), h("div", { class: "fb-timeline__content" }, item.timestamp && (h("time", { class: "fb-timeline__timestamp" }, item.timestamp)), h("p", { class: "fb-timeline__title" }, item.title), item.description && (h("p", { class: "fb-timeline__description" }, item.description)))));
        }))));
    }
};
FbTimeline.style = fbTimelineCss();

const fbToastCss = () => `:host{display:block;position:fixed;bottom:var(--spacing-24);right:var(--spacing-24);z-index:200;max-width:400px;min-width:280px}.fb-toast{display:flex;align-items:center;gap:var(--spacing-12);padding:var(--spacing-12) var(--spacing-16);border-radius:var(--radius-sm);box-shadow:var(--shadow-900);font-family:var(--font-family-primary);font-size:var(--font-size-14);animation:fb-toast-in 0.2s ease-out;border:1px solid transparent}.variant-info{background:var(--color-primary-50);border-color:var(--color-primary-200);color:var(--color-primary-700)}.variant-success{background:var(--color-success-50);border-color:var(--color-success-200);color:var(--color-success-600)}.variant-warning{background:var(--color-warning-50);border-color:var(--color-warning-200);color:var(--color-warning-600)}.variant-danger{background:var(--color-danger-50);border-color:var(--color-danger-200);color:var(--color-danger-500)}.animating-out{animation:fb-toast-out 0.2s ease-in forwards}.toast-icon{display:flex;flex-shrink:0}.toast-message{flex:1}.dismiss-btn{background:none;border:none;cursor:pointer;color:inherit;opacity:0.6;display:flex;align-items:center;padding:2px;border-radius:var(--radius-xs);flex-shrink:0}.dismiss-btn:hover{opacity:1}.dismiss-btn:focus-visible{outline:var(--focus-width) solid currentColor;outline-offset:var(--focus-offset)}@keyframes fb-toast-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}@keyframes fb-toast-out{from{opacity:1}to{opacity:0;transform:translateY(4px)}}@media (prefers-reduced-motion: reduce){.fb-toast,.animating-out{animation:none}}`;

const FbToast = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.fbDismiss = createEvent(this, "fbDismiss");
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
        return (h(Host, null, h("div", { role: "status", "aria-live": "polite", "aria-atomic": "true", class: {
                'fb-toast': true,
                [`variant-${this.variant}`]: true,
                'animating-out': this.animatingOut,
            } }, h("span", { class: "toast-icon", "aria-hidden": "true" }, this.variant === 'info' && h("svg", { width: "16", height: "16", viewBox: "0 0 18 18", fill: "none" }, h("circle", { cx: "9", cy: "9", r: "8", stroke: "currentColor", "stroke-width": "1.5" }), h("path", { d: "M9 8v5", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" }), h("circle", { cx: "9", cy: "5.5", r: ".75", fill: "currentColor" })), this.variant === 'success' && h("svg", { width: "16", height: "16", viewBox: "0 0 18 18", fill: "none" }, h("circle", { cx: "9", cy: "9", r: "8", stroke: "currentColor", "stroke-width": "1.5" }), h("path", { d: "M5.5 9l2.5 2.5 4.5-5", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" })), this.variant === 'warning' && h("svg", { width: "16", height: "16", viewBox: "0 0 18 18", fill: "none" }, h("path", { d: "M9 2L16.5 15H1.5L9 2Z", stroke: "currentColor", "stroke-width": "1.5", "stroke-linejoin": "round" }), h("path", { d: "M9 7v4", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" }), h("circle", { cx: "9", cy: "12.5", r: ".75", fill: "currentColor" })), this.variant === 'danger' && h("svg", { width: "16", height: "16", viewBox: "0 0 18 18", fill: "none" }, h("circle", { cx: "9", cy: "9", r: "8", stroke: "currentColor", "stroke-width": "1.5" }), h("path", { d: "M6 6l6 6M12 6l-6 6", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" }))), h("span", { class: "toast-message" }, this.message), h("button", { type: "button", class: "dismiss-btn", "aria-label": "Dismiss notification", onClick: this.dismiss }, h("svg", { "aria-hidden": "true", width: "14", height: "14", viewBox: "0 0 16 16", fill: "none" }, h("path", { d: "M4 4l8 8M12 4l-8 8", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" }))))));
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
        registerInstance(this, hostRef);
        this.fbPressedChange = createEvent(this, "fbPressedChange");
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
        return (h(Host, { key: '2cd30d0450f8c13eddfc424d92858c0c7942a5ba' }, h("button", { key: '5fa3d3ac05f735f4de8530591e9517922a80e41a', type: "button", class: {
                'fb-toggle': true,
                [`variant-${this.variant}`]: true,
                [`size-${this.size}`]: true,
                'pressed': this.pressed,
                'disabled': this.disabled,
            }, "aria-pressed": String(this.pressed), "aria-label": this.label || null, disabled: this.disabled, onClick: this.handleClick }, h("slot", { key: '377ec0b21e2d7f466069e3a79ed3a23a61cdf11c' }))));
    }
};
FbToggle.style = fbToggleCss();

const fbToggleGroupCss = () => `:host{display:inline-flex}.fb-toggle-group{display:inline-flex;flex-direction:row;align-items:center}.fb-toggle-group.vertical{flex-direction:column;align-items:stretch}.variant-default{background:var(--color-neutral-100);border-radius:var(--radius-sm);padding:3px;gap:2px}.variant-outline{background:transparent}.item{display:inline-flex;align-items:center;justify-content:center;gap:var(--spacing-8);font-family:var(--font-family-primary);font-weight:var(--font-weight-medium);cursor:pointer;transition:background 0.15s, color 0.15s, border-color 0.15s;user-select:none;flex-shrink:0;outline:none;box-sizing:border-box;position:relative}.item:focus-visible{outline:var(--focus-width) solid var(--focus-color);outline-offset:0;z-index:2}.size-sm .item{height:26px;padding:0 var(--spacing-8);font-size:var(--font-size-12)}.size-default .item{height:34px;padding:0 var(--spacing-12);font-size:var(--font-size-14)}.size-lg .item{height:42px;padding:0 var(--spacing-16);font-size:var(--font-size-16)}.variant-default .item{border:none;border-radius:var(--radius-xs);background:transparent;color:var(--color-neutral-600)}.variant-default .item:hover:not(.disabled){background:var(--color-neutral-white);color:var(--color-neutral-700)}.variant-default .item.pressed{background:var(--color-neutral-white);color:var(--color-primary-600);box-shadow:0 1px 3px rgba(0,0,0,0.1)}.variant-outline .item{background:var(--color-neutral-white);color:var(--color-neutral-600);border:1px solid var(--color-neutral-300)}.variant-outline .item:hover:not(.disabled){background:var(--color-neutral-50)}.variant-outline .item.pressed{background:var(--color-primary-50);color:var(--color-primary-600);border-color:var(--color-primary-500);z-index:1}.item.disabled{opacity:0.5;cursor:not-allowed;pointer-events:none}`;

// Built-in icon set
const ICONS = {
    bold: () => h("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true" }, h("path", { d: "M4 3h5a2.5 2.5 0 0 1 0 5H4V3z", stroke: "currentColor", "stroke-width": "1.5", "stroke-linejoin": "round" }), h("path", { d: "M4 8h5.5a2.5 2.5 0 0 1 0 5H4V8z", stroke: "currentColor", "stroke-width": "1.5", "stroke-linejoin": "round" })),
    italic: () => h("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true" }, h("path", { d: "M7 3h5M4 13h5M9 3l-2 10", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" })),
    underline: () => h("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true" }, h("path", { d: "M4 3v5a4 4 0 0 0 8 0V3", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" }), h("path", { d: "M3 13h10", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" })),
    'align-left': () => h("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true" }, h("path", { d: "M2 4h12M2 8h8M2 12h10", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" })),
    'align-center': () => h("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true" }, h("path", { d: "M2 4h12M4 8h8M3 12h10", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" })),
    'align-right': () => h("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true" }, h("path", { d: "M2 4h12M6 8h8M4 12h10", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" })),
    grid: () => h("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true" }, h("rect", { x: "2", y: "2", width: "5", height: "5", rx: "1", stroke: "currentColor", "stroke-width": "1.5" }), h("rect", { x: "9", y: "2", width: "5", height: "5", rx: "1", stroke: "currentColor", "stroke-width": "1.5" }), h("rect", { x: "2", y: "9", width: "5", height: "5", rx: "1", stroke: "currentColor", "stroke-width": "1.5" }), h("rect", { x: "9", y: "9", width: "5", height: "5", rx: "1", stroke: "currentColor", "stroke-width": "1.5" })),
    list: () => h("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true" }, h("path", { d: "M3 4h10M3 8h10M3 12h10", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" })),
};
const FbToggleGroup = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.fbChange = createEvent(this, "fbChange");
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
        return (h(Host, { key: '10bdf9353c8e0f0dadf8b4e58d52df2a73bb5207' }, h("div", { key: '43ef648fb0a35584fc820e7bd72c312a8574c911', role: "group", "aria-label": this.label, "aria-disabled": this.disabled ? 'true' : null, class: {
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
            return (h("button", { key: item.value, type: "button", role: "button", "aria-pressed": String(pressed), "aria-label": !item.label ? item.value : null, disabled: isDisabled, class: {
                    'item': true,
                    'pressed': pressed,
                    'disabled': isDisabled,
                    'first': isFirst,
                    'last': isLast,
                }, style: isOutline ? {
                    borderRadius: this.borderRadius(isFirst, isLast),
                    marginLeft: (!isV && !isFirst) ? '-1px' : null,
                    marginTop: (isV && !isFirst) ? '-1px' : null,
                } : {}, onClick: () => this.toggle(item.value) }, icon, item.label && h("span", null, item.label)));
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
        registerInstance(this, hostRef);
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
        return (h(Host, { key: 'ae5d2e476d4f6cc4465eaaf5dd5274fa2d11fd49' }, h("span", { key: 'eea9a139d78cf6868f3fab702983f7f4ac8c54be', class: "fb-tooltip-wrapper", onMouseEnter: () => this.show(), onMouseLeave: () => this.hide(), onFocusin: () => this.show(), onFocusout: () => this.hide() }, h("span", { key: 'd1f206b0bad9a6349a7fbb35f97f9318429bccb3', "aria-describedby": this.visible ? this.tooltipId : null }, h("slot", { key: '6ec1783085a6913b0472f4c16dbb139f20523cba' })), this.visible && (h("span", { key: 'e417823a7b1f3ed1cb8d5c90d33d8c1aaceef528', id: this.tooltipId, role: "tooltip", class: `fb-tooltip fb-tooltip--${this.placement}` }, this.content)))));
    }
    get el() { return getElement(this); }
};
FbTooltip.style = fbTooltipCss();

export { FbAlert as fb_alert, FbAvatar as fb_avatar, FbBadge as fb_badge, FbBreadcrumb as fb_breadcrumb, FbButton as fb_button, FbButtonGroup as fb_button_group, FbCard as fb_card, FbCheckbox as fb_checkbox, FbChip as fb_chip, FbDropdown as fb_dropdown, FbInput as fb_input, FbModal as fb_modal, FbPagination as fb_pagination, FbPopover as fb_popover, FbRadioGroup as fb_radio_group, FbSelect as fb_select, FbSeparator as fb_separator, FbSideSheet as fb_side_sheet, FbSidebar as fb_sidebar, FbSkeleton as fb_skeleton, FbSpinner as fb_spinner, FbSwitch as fb_switch, FbTabs as fb_tabs, FbTextarea as fb_textarea, FbTimeline as fb_timeline, FbToast as fb_toast, FbToggle as fb_toggle, FbToggleGroup as fb_toggle_group, FbTooltip as fb_tooltip };
