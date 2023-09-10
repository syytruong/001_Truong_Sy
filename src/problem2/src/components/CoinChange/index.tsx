import { useEffect, useMemo, useState } from "react";
import EthLogo from "./../../assets/images/eth.png";
import SelectBox from "../SelectBox";

export interface TokenItem {
  currency: string;
  date: string;
  price: number;
}

function CoinChange() {
  const [ethQuantity, setEthQuantity] = useState<number>(0);
  const [itemActive, setItemActive] = useState<TokenItem>();
  const [tokens, setTokens] = useState<TokenItem[]>([]);

  useEffect(() => {
    const fetchTokens = () => {
      fetch("https://interview.switcheo.com/prices.json")
        .then((res) => res.json())
        .then((list) => {
          if (list && list.length) {
            setTokens(list);
          }
        });
    };

    return () => {
      fetchTokens();
    };
  }, []);

  const ethItem = useMemo(() => {
    if (tokens && tokens.length) {
      return tokens.find((i: TokenItem) => i.currency.toLowerCase() === "eth");
    }
    return;
  }, [tokens]);

  const tokenExchange = useMemo(() => {
    if (ethItem && itemActive) {
      return ((ethQuantity * ethItem.price) / itemActive.price).toFixed(2);
    }
    return "";
  }, [ethQuantity, itemActive, ethItem]);

  return (
    <div className="pt-16 px-2 w-[480px]">
      <div className="border border-solid border-[#22222212] pt-3 px-2 rounded-3xl">
        <div className="text-[rgb(125,125,125)] justify-between w-full flex items-center box-border min-w-0 mb-2.5 m-0 p-0">
          <div className="gap-4 w-fit flex items-center justify-start box-border min-w-0 m-0 px-3 py-0">
            <div className="box-border min-w-0 font-[485] text-base leading-6 text-[rgb(34,34,34)] m-0">
              Swap
            </div>
            <div className="Popover__ReferenceElement-sc-855f21b0-1 bzDLQU">
              <div>
                <button
                  data-testid="buy-fiat-button"
                  className="sc-bczRLJ lfsInV Button__BaseButton-sc-983e32f-1 Button__ButtonText-sc-983e32f-9 SwapBuyFiatButton__StyledTextButton-sc-8351f9cc-0 gWMDnu ckXbOV gsGyA-D"
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
          <div className="w-fit flex items-center justify-start box-border min-w-0 m-0 p-0">
            <div className="relative text-[#7d7d7d]">
              <button
                id="open-settings-dialog-button"
                data-testid="open-settings-dialog-button"
                aria-label="Transaction Settings"
                className="bg-transparent cursor-pointer m-0 p-0 border-none"
              >
                <div className="w-full flex items-center justify-start box-border min-w-0 m-0 px-3 py-1.5 p-0 rounded-2xl">
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.83 14.6C19.9 14.06 19.33 13.07 19.33 12C19.33 10.93 19.9 9.93999 20.83 9.39999C20.99 9.29999 21.05 9.1 20.95 8.94L19.28 6.06C19.22 5.95 19.11 5.89001 19 5.89001C18.94 5.89001 18.88 5.91 18.83 5.94C18.37 6.2 17.85 6.34 17.33 6.34C16.8 6.34 16.28 6.19999 15.81 5.92999C14.88 5.38999 14.31 4.41 14.31 3.34C14.31 3.15 14.16 3 13.98 3H10.02C9.83999 3 9.69 3.15 9.69 3.34C9.69 4.41 9.12 5.38999 8.19 5.92999C7.72 6.19999 7.20001 6.34 6.67001 6.34C6.15001 6.34 5.63001 6.2 5.17001 5.94C5.01001 5.84 4.81 5.9 4.72 6.06L3.04001 8.94C3.01001 8.99 3 9.05001 3 9.10001C3 9.22001 3.06001 9.32999 3.17001 9.39999C4.10001 9.93999 4.67001 10.92 4.67001 11.99C4.67001 13.07 4.09999 14.06 3.17999 14.6H3.17001C3.01001 14.7 2.94999 14.9 3.04999 15.06L4.72 17.94C4.78 18.05 4.89 18.11 5 18.11C5.06 18.11 5.12001 18.09 5.17001 18.06C6.11001 17.53 7.26 17.53 8.19 18.07C9.11 18.61 9.67999 19.59 9.67999 20.66C9.67999 20.85 9.82999 21 10.02 21H13.98C14.16 21 14.31 20.85 14.31 20.66C14.31 19.59 14.88 18.61 15.81 18.07C16.28 17.8 16.8 17.66 17.33 17.66C17.85 17.66 18.37 17.8 18.83 18.06C18.99 18.16 19.19 18.1 19.28 17.94L20.96 15.06C20.99 15.01 21 14.95 21 14.9C21 14.78 20.94 14.67 20.83 14.6ZM12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 9 12 9C13.66 9 15 10.34 15 12C15 13.66 13.66 15 12 15Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-[rgb(249,249,249)] text-[rgb(125,125,125)] text-sm font-medium h-[120px] leading-5 relative p-4 rounded-2xl">
            <div
              id="swap-currency-input"
              className="flex flex-col relative z-[1] w-[initial] transition-[height] duration-[1s] ease-[ease] delay-[0s] will-change-[height] rounded-[20px]"
            >
              <div className="min-h-[44px] w-[initial] rounded-[20px]">
                <div className="select-none box-border min-w-0 font-[485] text-sm text-[rgb(125,125,125)] m-0">
                  You pay
                </div>
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-1">
                    <input
                      className="opacity-100 transition-opacity duration-[250ms] ease-[ease-in-out] delay-[0s] text-left text-4xl max-h-11 text-[rgb(34,34,34)] pointer-events-auto w-0 relative flex-auto bg-transparent text-[28px] whitespace-nowrap overflow-hidden text-ellipsis p-0 border-0 focus-visible:outline-0"
                      inputMode="decimal"
                      autoComplete="off"
                      autoCorrect="off"
                      type="text"
                      pattern="^[0-9]*[.,]?[0-9]*$"
                      minLength={1}
                      maxLength={79}
                      spellCheck="false"
                      value={ethQuantity || ""}
                      placeholder="0"
                      onChange={(event) => {
                        setEthQuantity(+event.target.value);
                      }}
                    />
                  </div>
                  <div className="flex flex-0 relative text-left">
                    <button
                      type="button"
                      className="w-full flex justify-end items-center bg-[#ffffff] opacity-100 text-[#222222] cursor-pointer h-[unset] select-none border text-xl gap-2 shadow-[rgba(34,34,34,0.04)_0px_0px_10px_0px] visible animate-[auto_ease_0s_1_normal_none_running_none] ml-3 pl-2 pr-1.5 py-1.5 rounded-2xl border-solid border-[#22222212] hover:bg-[rgb(249,249,249)]"
                      id="menu-button"
                      aria-expanded="true"
                      aria-haspopup="true"
                    >
                      <img src={EthLogo} alt="eth logo" className="h-6 w-6" />{" "}
                      ETH
                      <svg
                        className="-mr-1 ml-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-10 w-10 relative mt-[-18px] mb-[-18px] bg-[rgb(249,249,249)] z-[2] mx-auto rounded-xl border-4 border-solid border-white">
            <div
              data-testid="swap-currency-button"
              color="#222222"
              className="inline-flex items-center justify-center w-full h-full cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#222222"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1={12} y1={5} x2={12} y2={19} />
                <polyline points="19 12 12 19 5 12" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-[rgb(249,249,249)] text-[rgb(125,125,125)] text-sm font-medium h-[120px] leading-5 relative p-4 rounded-2xl">
          <div
            id="swap-currency-input"
            className="flex flex-col relative z-[1] w-[initial] transition-[height] duration-[1s] ease-[ease] delay-[0s] will-change-[height] rounded-[20px]"
          >
            <div className="min-h-[44px] w-[initial] rounded-[20px]">
              <div className="select-none box-border min-w-0 font-[485] text-sm text-[rgb(125,125,125)] m-0">
                You receive
              </div>
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-1">
                  <input
                    className="opacity-100 transition-opacity duration-[250ms] ease-[ease-in-out] delay-[0s] text-left text-4xl max-h-11 text-[rgb(34,34,34)] pointer-events-auto w-0 relative flex-auto bg-transparent text-[28px] whitespace-nowrap overflow-hidden text-ellipsis p-0 border-0 focus-visible:outline-0"
                    id="swap-currency-input"
                    inputMode="decimal"
                    autoComplete="off"
                    autoCorrect="off"
                    type="text"
                    pattern="^[0-9]*[.,]?[0-9]*$"
                    minLength={1}
                    maxLength={79}
                    spellCheck="false"
                    placeholder="0"
                    value={tokenExchange}
                    readOnly
                  />
                </div>
                <SelectBox
                  items={tokens}
                  itemActive={itemActive}
                  setItemActive={setItemActive}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoinChange;
