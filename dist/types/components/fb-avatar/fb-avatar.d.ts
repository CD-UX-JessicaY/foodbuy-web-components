export declare class FbAvatar {
    src: string;
    alt: string;
    initials: string;
    size: 'xs' | 'sm' | 'default' | 'lg' | 'xl';
    shape: 'circle' | 'square';
    status: 'none' | 'online' | 'offline' | 'busy';
    private getStatusLabel;
    render(): any;
}
