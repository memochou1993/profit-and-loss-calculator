const a = document.getElementById('a');
const b = document.getElementById('b');
const n = document.getElementById('n');
const body = document.getElementById('body');
const content = document.getElementById('content');

/**
 * 手續費
 */
const x = 0.1425 * 0.01;

/**
 * 交易稅
 */
const y = 0.3 * 0.01;

/**
 * 區間
 */
const z = 20;

/**
 * 處理輸入事件
 */
const handleInput = () => {
    /**
     * 成本價
     */
    const av = Number(a.value);

    /**
     * 目標價
     */
    const bv = Number(b.value);

    /**
     * 交易股數
     */
    const nv = Number(n.value);

    /**
     * 修正成本價檔位
     */
    switch (true) {
        case av < 10:
            a.step = 0.01;
            break;
        case av >= 10 && av < 50:
            a.step = 0.05;
            break;
        case av >= 50 && av < 100:
            a.step = 0.1;
            break;
        case av >= 100 && av < 500:
            a.step = 0.5;
            break;
        case av >= 500 && av < 1000:
            a.step = 1;
            break;
        case av > 1000:
            a.step = 5;
            break;
        default:
            break;
    }

    /**
     * 修正目標價檔位
     */
    switch (true) {
        case bv < 10:
            b.step = 0.01;
            break;
        case bv >= 10 && bv < 50:
            b.step = 0.05;
            break;
        case bv >= 50 && bv < 100:
            b.step = 0.1;
            break;
        case bv >= 100 && bv < 500:
            b.step = 0.5;
            break;
        case bv >= 500 && bv < 1000:
            b.step = 1;
            break;
        case bv > 1000:
            b.step = 5;
            break;
        default:
            break;
    }

    if (!av || !bv || !nv) {
        return;
    }

    /**
     * 渲染表格
     */
    content.innerHTML = Array(z + 1)
        .fill('')
        .map((v, i) => {
            return i - z / 2;
        })
        .map((r) => {
            /**
             * 成交價檔位
             */
            const s = Number(b.step);

            /**
             * 報價
             */
            const p = r * s;

            /**
             * 損益金額
             */
            const c = (bv + p) * nv * (1 - x - y) - av * nv * (1 + x);

            /**
             * 報酬率
             */
            const d = c / (av * nv) * 100;

            return `
                <tr class="text-center" style="background: ${p === 0 ? 'gold' : p === av - bv ? 'paleturquoise' : ''};">
                    <td>
                        ${(bv + p).toFixed(2)}
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

    /**
     * 顯示表格
     */
    body.hidden = false;
};

/**
 * 監聽輸入事件
 */
document.addEventListener('input', handleInput);
