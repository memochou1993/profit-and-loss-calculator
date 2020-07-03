const a = document.getElementById('a');
const b = document.getElementById('b');
const n = document.getElementById('n');
const body = document.getElementById('body');
const content = document.getElementById('content');

/**
 * 手續費
 */
const h = 0.1425 * 0.01;

/**
 * 交易稅
 */
const t = 0.3 * 0.01;

/**
 * 區間
 */
const range = 20;

/**
 * 換算檔位
 */
const f = (price) => {
    switch (true) {
        case price < 10:
            return 0.01;
        case price >= 10 && price < 50:
            return 0.05;
        case price >= 50 && price < 100:
            return 0.1;
        case price >= 100 && price < 500:
            return 0.5;
        case price >= 500 && price < 1000:
            return 1;
        case price >= 1000:
            return 5;
        default:
            break;
    }
}

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
    a.step = f(av);

    /**
     * 修正目標價檔位
     */
    b.step = f(bv);

    if (!av || !bv || !nv) {
        return;
    }

    /**
     * 渲染表格
     */
    content.innerHTML = Array(range + 1)
        .fill('')
        .map((v, i) => {
            return i - range / 2;
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
            const c = (bv + p) * nv * (1 - h - t) - av * nv * (1 + h);

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
