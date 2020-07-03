
const handleInput = () => {
    const a = Number(document.getElementById('a').value);
    const b = Number(document.getElementById('b').value);
    const n = Number(document.getElementById('n').value);

    if (!a || !b || !n) {
        return;
    }

    const x = 0.1425 * 0.01;
    const y = 0.3 * 0.01;
    const z = 10;

    const content = Array(z + 1)
        .fill('')
        .map((v, i) => {
            return i - z / 2;
        })
        .map((r, i) => {
            const c = (b + r) * n * (1 - x - y) - (a * n * (1 + x));
            const d = c / (a * n) * 100;
            const e = r === 0 ? 'gold' : r === a - b ? 'paleturquoise' : '';

            return `
                <tr class="text-center" style="background: ${e};">
                    <td>
                        ${(b + r).toFixed(2)}
                    </td>
                    <td style="color: ${c > 0 ? 'red' : 'green'};">
                        ${Number(c.toFixed(2)).toLocaleString()}
                    </td>
                    <td style="color: ${c > 0 ? 'red' : 'green'};">
                        ${Number(d.toFixed(2)).toLocaleString()}%
                    </td>
                </tr>
            `;
        })
        .join('');

    document.getElementById('body').hidden = false;
    document.getElementById('content').innerHTML = content;
};

document.addEventListener('input', handleInput);
