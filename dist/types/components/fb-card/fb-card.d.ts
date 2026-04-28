import { EventEmitter } from '../../stencil-public-runtime';
export declare class FbCard {
    href: string;
    clickable: boolean;
    label: string;
    padding: 'none' | 'sm' | 'default' | 'lg';
    shadow: 'none' | 'sm' | 'default' | 'lg';
    fbCardClick: EventEmitter<void>;
    render(): any;
}
