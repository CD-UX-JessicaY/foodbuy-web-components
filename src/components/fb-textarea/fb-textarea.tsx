import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';
import { renderFieldLabel, renderHelperText } from '../../utils/field-helpers';

export type TextareaState = 'default' | 'error' | 'disabled' | 'read-only';
export type TextareaSize  = 'sm' | 'default' | 'lg';

let idCounter = 0;

@Component({
  tag: 'fb-textarea',
  styleUrl: 'fb-textarea.css',
  shadow: true,
})
export class FbTextarea {
  /** Visible label — always provide for accessibility */
  @Prop() label: string = '';

  @Prop() size: TextareaSize = 'default';
  @Prop() state: TextareaState = 'default';
  @Prop() placeholder: string = '';
  @Prop({ mutable: true }) value: string = '';
  @Prop() helperText: string = '';
  @Prop() required: boolean = false;
  /** Number of visible text rows */
  @Prop() rows: number = 4;
  /** Character limit — shows counter when set */
  @Prop() maxLength: number;

  @Event() fbChange: EventEmitter<string>;
  @Event() fbFocus: EventEmitter<void>;
  @Event() fbBlur: EventEmitter<void>;

  private textareaId: string;
  private helperId: string;

  connectedCallback() {
    idCounter++;
    this.textareaId = `fb-textarea-${idCounter}`;
    this.helperId   = `fb-textarea-helper-${idCounter}`;
  }

  private get isDisabled() { return this.state === 'disabled'; }
  private get isReadOnly() { return this.state === 'read-only'; }
  private get isError()    { return this.state === 'error'; }

  render() {
    const hasHelper   = !!this.helperText;
    const charCount   = this.value?.length ?? 0;
    const showCounter = !!this.maxLength;
    const counterId   = showCounter ? `${this.textareaId}-counter` : null;
    const describedBy = [hasHelper ? this.helperId : null, counterId].filter(Boolean).join(' ') || null;

    return (
      <Host>
        <div class="fb-textarea-wrapper">
          {renderFieldLabel(this.label, this.required, this.textareaId)}

          <textarea
            id={this.textareaId}
            rows={this.rows}
            placeholder={this.placeholder}
            disabled={this.isDisabled}
            readOnly={this.isReadOnly}
            required={this.required}
            maxLength={this.maxLength}
            aria-required={this.required ? 'true' : null}
            aria-invalid={this.isError ? 'true' : null}
            aria-describedby={describedBy}
            class={{
              'fb-textarea': true,
              [`size-${this.size}`]: true,
              'state-error':    this.isError,
              'state-disabled': this.isDisabled,
              'state-readonly': this.isReadOnly,
            }}
            onInput={(e) => {
              const val = (e.target as HTMLTextAreaElement).value;
              this.value = val;
              this.fbChange.emit(val);
            }}
            onFocus={() => this.fbFocus.emit()}
            onBlur={() => this.fbBlur.emit()}
          >
            {this.value}
          </textarea>

          <div class="fb-textarea-footer">
            {renderHelperText(this.helperText, this.helperId, this.isError)}

            {showCounter && (
              // aria-live="polite" announces the count as the user types
              <div id={counterId} class={{ 'fb-counter': true, 'fb-counter--limit': charCount >= this.maxLength }} aria-live="polite">
                {charCount}/{this.maxLength}
              </div>
            )}
          </div>
        </div>
      </Host>
    );
  }
}
