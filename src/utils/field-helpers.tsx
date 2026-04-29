import { h, VNode } from '@stencil/core';

const ERROR_ICON = (
  <svg
    aria-hidden="true"
    class="helper-icon"
    width="13" height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

/** Renders the field label with optional required asterisk */
export function renderFieldLabel(label: string, required: boolean, inputId: string, labelId?: string): VNode | null {
  if (!label) return null;
  return (
    <label htmlFor={inputId} id={labelId} class="fb-label">
      {label}
      {required && <span class="required-indicator" aria-hidden="true"> *</span>}
    </label>
  );
}

/** Renders helper / error text below a form control */
export function renderHelperText(helperText: string, helperId: string, isError: boolean): VNode | null {
  if (!helperText) return null;
  return (
    <div
      id={helperId}
      class={{ 'fb-helper': true, 'fb-helper--error': isError }}
      role={isError ? 'alert' : undefined}
    >
      {isError && ERROR_ICON}
      {helperText}
    </div>
  );
}
