const 值 = "value";
const 檔位 = "step";
const 輸入 = "input";
const 買入價顏色 = "paleturquoise";
const 賣出價顏色 = "gold";
const 百 = 100;
const 千 = 1000;

const 取得元素 = (名字) => document.getElementById(名字);
const 轉換數字 = (字串) => Number(字串);
const 取得整數 = (數值) => Math.floor(數值);
const 取得屬性 = (節點, 標籤) => 節點[標籤];
const 註冊事件 = (事件, 方法) => document.addEventListener(事件, 方法);

const 買入價欄位 = 取得元素("買入價");
const 賣出價欄位 = 取得元素("賣出價");
const 交易股數欄位 = 取得元素("交易股數");
const 表格 = 取得元素("表格");
const 報價 = 取得元素("報價");

const 手續費率 = 0.1425 / 百;
const 證交稅率 = 0.3 / 百;
const 檔數 = 20;

const 換算檔位 = (價格) => {
  switch (true) {
    case 價格 < 10:
      return 0.01;
    case 價格 >= 10 && 價格 < 50:
      return 0.05;
    case 價格 >= 50 && 價格 < 100:
      return 0.1;
    case 價格 >= 100 && 價格 < 500:
      return 0.5;
    case 價格 >= 500 && 價格 < 1000:
      return 1;
    case 價格 >= 1000:
      return 5;
    default:
      break;
  }
};

const 修正檔位 = (欄位, 價格) => (欄位[檔位] = 換算檔位(價格));
const 顯示表格 = () => (表格.hidden = false);
const 格式化數字 = (數值) => Number(數值.toFixed(2)).toLocaleString();
const 取得價位索引 = () => [...Array(檔數 + 1).keys()].map((v) => v - 檔數 / 2);
const 取得損益金額顏色 = (損益金額) => (損益金額 > 0 ? "red" : "green");
const 取得報價顏色 = (報價, 買入價, 賣出價) => {
  if (報價 === 0) {
    return 賣出價顏色;
  }

  if (報價 === (買入價 * 千 - 賣出價 * 千) / 千) {
    return 買入價顏色;
  }

  return "";
};

const 處理報價 = () => {
  const 買入價 = 轉換數字(取得屬性(買入價欄位, 值));
  const 賣出價 = 轉換數字(取得屬性(賣出價欄位, 值));
  const 交易股數 = 轉換數字(取得屬性(交易股數欄位, 值));

  修正檔位(買入價欄位, 買入價);
  修正檔位(賣出價欄位, 賣出價);

  if (!買入價 || !賣出價 || !交易股數) {
    return;
  }

  報價.innerHTML = 取得價位索引()
    .map((價位) => {
      const 賣出價檔位 = 轉換數字(賣出價欄位[檔位]);
      const 報價 = (價位 * 千 * 賣出價檔位) / 千;
      const 買進價格 = 買入價 * 交易股數;
      const 買入手續費 = 取得整數(買進價格 * 手續費率);
      const 支付總金額 = 買進價格 + 買入手續費;
      const 賣出手續費 = 取得整數((賣出價 + 報價) * 交易股數 * 手續費率);
      const 證交稅 = 取得整數((賣出價 + 報價) * 交易股數 * 證交稅率);
      const 實收總金額 = (賣出價 + 報價) * 交易股數 - 賣出手續費 - 證交稅;
      const 損益金額 = 實收總金額 - 支付總金額;
      const 報酬率 = 損益金額 / 買進價格;
      const 成交價 = 賣出價 + 報價;
      const 背景顏色 = 取得報價顏色(報價, 買入價, 賣出價);
      const 文字顏色 = 取得損益金額顏色(損益金額);

      return `
            <tr class="text-center" style="background: ${背景顏色};">
                <td>
                    ${格式化數字(成交價)}
                </td>
                <td style="color: ${文字顏色};">
                    ${格式化數字(損益金額)}
                </td>
                <td style="color: ${文字顏色};">
                    ${格式化數字(報酬率 * 百)}%
                </td>
            </tr>
        `;
    })
    .join("");

  顯示表格();
};

註冊事件(輸入, 處理報價);
