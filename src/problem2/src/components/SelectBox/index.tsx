import { ReactNode, useState } from "react";
import { TokenItem } from "../CoinChange";

interface Props {
  items: any;
  itemActive: any;
  setItemActive: any;
}

function SelectBox(props: Props) {
  const [show, setShow] = useState(false);
  const { items, itemActive, setItemActive } = props;

  function renderItems(): ReactNode {
    if (items.length) {
      return items.map((item: TokenItem, index: number) => {
        return (
          <a
            href="#"
            className="text-gray-700 block px-4 py-2 text-sm"
            role="menuitem"
            key={index}
            onClick={() => {
              setItemActive(item);
              setShow(false);
            }}
          >
            {item.currency}
          </a>
        );
      });
    }

    return <></>;
  }

  return (
    <div className="flex flex-1 relative text-left">
      <button
        type="button"
        className="w-full flex justify-between items-center bg-[rgb(252,114,255)] opacity-100 text-white cursor-pointer h-[unset] select-none border text-xl gap-2 shadow-[rgba(34,34,34,0.04)_0px_0px_10px_0px] visible animate-[auto_ease_0s_1_normal_none_running_none] ml-3 pl-2 pr-1.5 py-1.5 rounded-2xl border-solid border-[rgb(252,114,255)]"
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
        onClick={() => {
          setShow(true);
        }}
      >
        {itemActive ? itemActive.currency : "Select token"}
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
      {show && (
        <>
          <div
            className={`absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            <div className="py-1 max-h-[400px] overflow-y-scroll" role="none">
              {renderItems()}
            </div>
          </div>
          <div
            className="fixed top-0 left-0"
            style={{ height: "100vh", width: "100vw" }}
            onClick={() => {
              setShow(false);
            }}
          ></div>
        </>
      )}
    </div>
  );
}

export default SelectBox;


