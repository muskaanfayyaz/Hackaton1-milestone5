declare module 'html2pdf.js' {
    interface Html2PdfOptions {
        margin?: string | number;
        filename?: string;
        image?: { type?: string; quality?: number };
        html2canvas?: any;
        jsPDF?: any;
    }

    function html2pdf(): {
        from(element: HTMLElement): {
            save(filename: string): void;
        };
    };

    export default html2pdf;
}
