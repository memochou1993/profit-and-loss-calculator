const 文件 = document;
const 百 = 100;
const 千 = 1000;
const 值 = "value";
const 最小 = "min";
const 最大 = "max";
const 間隔 = "step";
const 類型 = "type";
const 輸入 = "input";
const 獲益顏色 = "blue";
const 虧損顏色 = "red";
const 賣出價格背景顏色 = "gold";
const 公定手續費費率 = 0.1425 / 百;
const 證券交易稅稅率 = 0.3 / 百;
const 預設手續費折扣 = 1;
const 預設檔數 = 5;

const 記住 = (名字, 內容) => localStorage.setItem(名字, 內容);
const 想起 = (名字, 預設) => localStorage.getItem(名字) || 預設;
const 忘記 = (名字) => localStorage.removeItem(名字);
const 渲染 = (節點, 內容) => (節點["innerHTML"] = 內容);
const 取得節點 = (名字) => 文件.getElementById(名字);
const 取得數值 = (字串) => Number(字串);
const 取得整數 = (數值) => Math.round(數值);
const 取得屬性 = (節點, 標籤) => 節點[標籤];
const 註冊事件 = (節點, 事件, 函式) => 節點.addEventListener(事件, 函式);

class Calculator {
  constructor() {
    this.調整欄位類型();
    this.回填資料();
    this.註冊事件();
  }

  get 交易類別欄位() {
    return 取得節點("交易類別");
  }

  get 買入價格欄位() {
    return 取得節點("買入價格");
  }

  get 賣出價格欄位() {
    return 取得節點("賣出價格");
  }

  get 交易股數欄位() {
    return 取得節點("交易股數");
  }

  get 手續費折扣欄位() {
    return 取得節點("手續費折扣");
  }

  get 檔數欄位() {
    return 取得節點("檔數");
  }

  get 表格節點() {
    return 取得節點("表格");
  }

  get 報價節點() {
    return 取得節點("報價");
  }

  get 交易類別() {
    return 取得屬性(this.交易類別欄位, 值);
  }

  get 買入價格() {
    const 買入價格 = this.取得欄位數值("買入價格欄位");

    return this.買入價格合理(買入價格) ? 買入價格 : 0;
  }

  get 賣出價格() {
    const 賣出價格 = this.取得欄位數值("賣出價格欄位");

    return this.賣出價格合理(賣出價格) ? 賣出價格 : 0;
  }

  get 交易股數() {
    const 交易股數 = this.取得欄位數值("交易股數欄位");

    return this.交易股數合理(交易股數) ? 交易股數 : 0;
  }

  get 手續費折扣() {
    const 手續費折扣 = this.取得欄位數值("手續費折扣欄位");

    return this.手續費折扣合理(手續費折扣) ? 手續費折扣 : 預設手續費折扣;
  }

  get 檔數() {
    const 檔數 = this.取得欄位數值("檔數欄位");

    return this.檔數合理(檔數) ? 檔數 : 預設檔數;
  }

  get 偏移量列表() {
    const 檔數 = this.檔數;

    return [...Array(檔數 * 2 + 1).keys()].map((v) => v - 檔數);
  }

  get 完成表單() {
    return (
      this.買入價格 > 0 &&
      this.賣出價格 > 0 &&
      this.交易股數 > 0 &&
      this.手續費折扣 > 0
    );
  }

  修正間隔(欄位, 升降單位) {
    欄位[間隔] = 升降單位;
  }

  顯示表格() {
    this.表格節點.hidden = false;
  }

  隱藏表格() {
    this.表格節點.hidden = true;
  }

  修正小數點(欄位) {
    欄位[值] = 欄位[值].replace(/#/, '.');
  }

  格式化數值(數值) {
    return 取得數值(數值.toFixed(2)).toLocaleString();
  }

  精算手續費(手續費) {
    return 取得整數(手續費 < 20 ? 20 : 手續費);
  }

  精算證券交易稅稅率(交易類別) {
    return 證券交易稅稅率 * (交易類別 === "現股當沖" ? 0.5 : 1);
  }

  取得欄位數值(欄位, 屬性 = 值) {
    return 取得數值(取得屬性(this[欄位], 屬性));
  }

  取得賣出價格背景顏色(偏移量) {
    return 偏移量 === 0 && this.檔數 > 0 ? 賣出價格背景顏色 : "";
  }

  取得損益金額顏色(損益金額) {
    return 損益金額 > 0 ? 獲益顏色 : 虧損顏色;
  }

  調整欄位類型() {
    if (window.matchMedia("(max-width: 1024px)").matches) {
      this.買入價格欄位[類型] = "tel";
      this.賣出價格欄位[類型] = "tel";
      this.交易股數欄位[類型] = "tel";
      this.手續費折扣欄位[類型] = "tel";
      this.檔數欄位[類型] = "tel";
    }
  }

  回填資料() {
    this.手續費折扣欄位[值] = 想起("手續費折扣", 預設手續費折扣);
    this.檔數欄位[值] = 想起("檔數", 預設檔數);
  }

  註冊事件() {
    註冊事件(this.買入價格欄位, 輸入, () => {
      this.修正間隔(this.買入價格欄位, this.換算檔位(this.買入價格));
      this.修正小數點(this.買入價格欄位);
    });

    註冊事件(this.賣出價格欄位, 輸入, () => {
      this.修正間隔(this.賣出價格欄位, this.換算檔位(this.賣出價格));
      this.修正小數點(this.賣出價格欄位);
    });

    註冊事件(this.交易股數欄位, 輸入, () => {
      this.修正間隔(this.交易股數欄位, this.換算交易股數升降單位(this.交易股數));
    });

    註冊事件(this.手續費折扣欄位, 輸入, (event) => {
      const 手續費折扣 = 取得數值(event.target.value);

      this.手續費折扣合理(手續費折扣) ? 記住("手續費折扣", 手續費折扣) : 忘記("手續費折扣");
      this.修正小數點(this.手續費折扣欄位);
    });

    註冊事件(this.檔數欄位, 輸入, (event) => {
      const 檔數 = 取得數值(event.target.value);

      this.檔數合理(檔數) ? 記住("檔數", 檔數) : 忘記("檔數");
    });

    註冊事件(文件, 輸入, () => {
      this.處理報價();
    });
  }

  換算檔位(價格) {
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
  }

  換算交易股數升降單位(交易股數) {
    return 交易股數 % 千 === 0 ? 千 : 1;
  }

  買入價格合理(買入價格) {
    return 買入價格 >= 1 && 買入價格 <= this.取得欄位數值("買入價格欄位", 最大);
  }

  賣出價格合理(賣出價格) {
    return 賣出價格 >= 1 && 賣出價格 <= this.取得欄位數值("賣出價格欄位", 最大);
  }

  交易股數合理(交易股數) {
    return 交易股數 >= 1 && 交易股數 <= this.取得欄位數值("交易股數欄位", 最大);
  }

  手續費折扣合理(手續費折扣) {
    return (
      手續費折扣 >= this.取得欄位數值("手續費折扣欄位", 最小) &&
      手續費折扣 <= this.取得欄位數值("手續費折扣欄位", 最大)
    );
  }

  檔數合理(檔數) {
    return (
      檔數 >= this.取得欄位數值("檔數欄位", 最小) &&
      檔數 <= this.取得欄位數值("檔數欄位", 最大)
    );
  }

  處理報價() {
    if (!this.完成表單) {
      this.隱藏表格();
      return;
    }

    const 報價 = this.偏移量列表
      .map((初始偏移量) => {
        const 成交價格檔位 = 取得數值(this.賣出價格欄位[間隔]);
        const 偏移量 = (初始偏移量 * 千 * 成交價格檔位) / 千;
        const 成交價格 = this.賣出價格 + 偏移量;
        const 成本 = this.買入價格 * this.交易股數;
        const 市值 = 成交價格 * this.交易股數;
        const 手續費費率 = 公定手續費費率 * this.手續費折扣;
        const 買入手續費 = this.精算手續費(成本 * 手續費費率);
        const 賣出手續費 = this.精算手續費(市值 * 手續費費率);
        const 證券交易稅 = 取得整數(市值 * this.精算證券交易稅稅率(this.交易類別));
        const 支付總金額 = 成本 + 買入手續費;
        const 實收總金額 = 市值 - 賣出手續費 - 證券交易稅;
        const 損益金額 = 實收總金額 - 支付總金額;
        const 報酬率 = 損益金額 / 成本;
        const 賣出價格背景顏色 = this.取得賣出價格背景顏色(偏移量);
        const 損益金額顏色 = this.取得損益金額顏色(損益金額);

        return `
          <tr class="text-center" style="background:${賣出價格背景顏色};">
            <td>
              ${this.格式化數值(成交價格)}
            </td>
            <td style="color: ${損益金額顏色};">
              ${this.格式化數值(損益金額)}
            </td>
            <td style="color: ${損益金額顏色};">
              ${this.格式化數值(報酬率 * 百)}%
            </td>
          </tr>
        `;
      })
      .join("");

    渲染(this.報價節點, 報價);

    this.顯示表格();
  }
}

new Calculator();
