const 文件 = document;
const 值 = "value";
const 檔位 = "step";
const 輸入 = "input";
const 成交價顏色 = "gold";
const 百 = 100;
const 千 = 1000;

const 取得元素 = (名字) => 文件.getElementById(名字);
const 取得數值 = (字串) => Number(字串);
const 取得整數 = (數值) => Math.floor(數值);
const 取得屬性 = (節點, 標籤) => 節點[標籤];
const 註冊事件 = (文件, 事件, 方法) => 文件.addEventListener(事件, 方法);
const 記住 = (名字, 內容) => localStorage.setItem(名字, 內容);
const 想起 = (名字, 預設) => localStorage.getItem(名字) || 預設;
const 渲染 = (元素, 內容) => (元素["innerHTML"] = 內容);

const 買入價欄位 = 取得元素("買入價");
const 賣出價欄位 = 取得元素("賣出價");
const 交易股數欄位 = 取得元素("交易股數");
const 手續費折扣欄位 = 取得元素("手續費折扣");
const 表格節點 = 取得元素("表格");
const 報價節點 = 取得元素("報價");

const 公定手續費費率 = 0.1425 / 百;
const 證券交易稅稅率 = 0.3 / 百;
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

const 回填 = (欄位, 名字, 預設) => (欄位["value"] = 想起(名字, 預設));
const 記住欄位 = (名字, 事件) => 記住(名字, 事件.target.value);
const 修正檔位 = (欄位, 價格) => (欄位[檔位] = 換算檔位(價格));
const 顯示表格 = () => (表格節點.hidden = false);
const 格式化數值 = (數值) => Number(數值.toFixed(2)).toLocaleString();
const 取得偏移量 = () => [...Array(檔數 + 1).keys()].map((v) => v - 檔數 / 2);
const 取得最低手續費 = (手續費) => (手續費 < 20 ? 20 : 手續費);
const 取得成交價顏色 = (偏移量) => (偏移量 === 0 ? 成交價顏色 : "");
const 取得損益金額顏色 = (損益金額) => (損益金額 > 0 ? "red" : "green");

const 回填資料 = () => {
  回填(手續費折扣欄位, "手續費折扣", 1);
};

const 處理報價 = () => {
  const 買入價 = 取得數值(取得屬性(買入價欄位, 值));
  const 賣出價 = 取得數值(取得屬性(賣出價欄位, 值));
  const 交易股數 = 取得數值(取得屬性(交易股數欄位, 值));
  const 手續費折扣 = 取得數值(取得屬性(手續費折扣欄位, 值));

  修正檔位(買入價欄位, 買入價);
  修正檔位(賣出價欄位, 賣出價);

  if (!買入價 || !賣出價 || !交易股數 || !手續費折扣) {
    return;
  }

  const 報價 = 取得偏移量()
    .map((初始偏移量) => {
      const 成交價檔位 = 取得數值(賣出價欄位[檔位]);
      const 偏移量 = (初始偏移量 * 千 * 成交價檔位) / 千;
      const 買進價格 = 買入價 * 交易股數;
      const 賣出價格 = (賣出價 + 偏移量) * 交易股數;
      const 手續費費率 = 公定手續費費率 * 手續費折扣;
      const 買入手續費 = 取得最低手續費(取得整數(買進價格 * 手續費費率));
      const 賣出手續費 = 取得最低手續費(取得整數(賣出價格 * 手續費費率));
      const 證券交易稅 = 取得整數(賣出價格 * 證券交易稅稅率);
      const 支付總金額 = 買進價格 + 買入手續費;
      const 實收總金額 = 賣出價格 - 賣出手續費 - 證券交易稅;
      const 損益金額 = 實收總金額 - 支付總金額;
      const 報酬率 = 損益金額 / 買進價格;
      const 成交價 = 賣出價 + 偏移量;
      const 背景顏色 = 取得成交價顏色(偏移量);
      const 文字顏色 = 取得損益金額顏色(損益金額);

      return `
        <tr class="text-center" style="background: ${背景顏色};">
          <td>
            ${格式化數值(成交價)}
          </td>
          <td style="color: ${文字顏色};">
            ${格式化數值(損益金額)}
          </td>
          <td style="color: ${文字顏色};">
            ${格式化數值(報酬率 * 百)}%
          </td>
        </tr>
      `;
    })
    .join("");

  渲染(報價節點, 報價);

  顯示表格();
};

回填資料();

註冊事件(手續費折扣欄位, 輸入, (event) => 記住欄位("手續費折扣", event));
註冊事件(文件, 輸入, 處理報價);
