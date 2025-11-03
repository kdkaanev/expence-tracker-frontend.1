import { af } from "date-fns/locale";

export const centerTextPlugin = {
    id: 'centerText',
    afterDraw(chart, args, options) {
        const { ctx, chartArea: { width, height } } = chart;
        const centerText = options.centerText;

        if (!options || !options.lines) {
            return;
        }

        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const centerX = width / 2;
        const centerY = height / 2;

        const lineHeight = options.lineHeight || 20;
        const totalLines = options.lines.length;
        const startY = centerY - (lineHeight * (totalLines - 1)) / 2;

        options.lines.forEach((line, index) => {
            ctx.fillStyle = line.color || '#000';
            ctx.font = `${line.fontSize || 16}px ${line.fontFamily || 'Arial'}`;
            ctx.fillText(line.text, centerX, startY + index * lineHeight);  
        });
        ctx.restore();
    }
};