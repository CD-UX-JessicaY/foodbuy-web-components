import { EventEmitter } from '../../stencil-public-runtime';
export declare class FbPagination {
    currentPage: number;
    totalPages: number;
    label: string;
    fbPageChange: EventEmitter<number>;
    private go;
    private getPages;
    render(): any;
}
