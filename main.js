const handleInput = () => {
    const a = Number(document.getElementById('a').value);
    const b = Number(document.getElementById('b').value);
    const n = Number(document.getElementById('n').value);

    if (!a || !b || !n) {
        return;
    }

    const x = 0.1425 * 0.01;
    const y = 0.3 * 0.01;
    const z = 20;
    
    let step;
    switch (true) {
        case b < 10:
            console.log('<10');
            step = 0.01;
            break;
        case b >= 10 && b < 50:
            step = 0.05;
            break;
        case b >= 50 && b < 100:
            step = 0.1;
            break;
        case b >= 100 && b < 500:
            step = 0.5;
            break;
        case b >= 500 && b < 1000:
            step = 1;
            break;
        case b > 1000:
            step = 5;
            break;
        default:
            break;
    }

    const content = Array(z + 1)
        .fill('')
        .map((v, i) => {
            return i - z / 2;
        })
        .map((r) => {
            const p = r * step;
            const c = (b + p) * n * (1 - x - y) - a * n * (1 + x);
            const d = c / (a * n) * 100;

            return `
                <tr class="text-center" style="background: ${p === 0 ? 'gold' : p === a - b ? 'paleturquoise' : ''};">
                    <td>
                        ${(b + p).toFixed(2)}
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
