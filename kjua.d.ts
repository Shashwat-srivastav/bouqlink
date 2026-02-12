declare module 'kjua' {
    interface KjuaOptions {
        text: string;
        render?: 'canvas' | 'image' | 'svg';
        crisp?: boolean;
        minVersion?: number;
        ecLevel?: 'L' | 'M' | 'Q' | 'H';
        size?: number;
        ratio?: number;
        fill?: string;
        back?: string;
        rounded?: number;
        quiet?: number;
        mode?: 'plain' | 'label' | 'image';
        label?: string;
        fontname?: string;
        fontcolor?: string;
        image?: HTMLImageElement;
    }
    function kjua(options: KjuaOptions): HTMLElement;
    export default kjua;
}
