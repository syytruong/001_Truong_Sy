import { useState, useRef, useEffect } from "react";
import { TokenItem } from "../CoinChange";

interface SelectBoxProps {
  items: TokenItem[];
  selectedToken: TokenItem | undefined;
  setSelectedToken: (item: TokenItem) => void;
}

function SelectBox(props: SelectBoxProps) {
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { items, selectedToken, setSelectedToken } = props;

  const innerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (innerRef.current && !innerRef.current.contains(event.target as Node)) {
        handleClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [innerRef]);

  function renderItems() {
    if (items.length) {
      return items.filter(item => item.currency.toLowerCase().includes(searchTerm.toLowerCase())).map((item, index) => (
        <div
          key={index}
          className={`flex justify-between items-center p-2 ${selectedToken?.currency === item.currency ? 'cursor-default' : 'cursor-pointer hover:bg-gray-200'} w-full`}
          onClick={() => {
            if(selectedToken?.currency !== item.currency){
              setSelectedToken(item);
              handleClose();
            }
          }}
          style={selectedToken?.currency === item.currency ? { pointerEvents: 'none' } : {}}
        >
          <div className="flex items-center w-full">
            <img
              src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${item.currency}.svg`}
              alt={`${item.currency} Icon`}
              className="w-6 h-6 mr-2"
            />
            <span className="flex-grow">{item.currency}</span>
          </div>
          {selectedToken?.currency === item.currency && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      ));
    }
  
    return null;
  }

  const handleClose = () => {
    setShow(false);
    setSearchTerm('');
  };

  return (
    <div>
      <button
        type="button"
        className={`flex items-center justify-between px-4 py-2 rounded-full ${
          selectedToken ? 'bg-white text-black' : 'bg-[rgb(252,114,255)] text-white'
        }`}
        onClick={() => {
          setShow(true);
        }}
      >
        {selectedToken ? (
          <>
            <img
              src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${selectedToken.currency}.svg`}
              alt={`${selectedToken.currency} Icon`}
              className="w-6 h-6 mr-2"
            />
            <span className="flex-grow">{selectedToken.currency}</span>
          </>
        ) : (
          "Select token"
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 ml-2"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>


      {show && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50 z-[9999]">
          <div className="bg-white rounded-lg p-4 w-1/3 max-h-[46rem] flex flex-col z-[9999]" ref={innerRef}>
            <div className="flex justify-between items-center mb-4 w-full">
              <h2>Select a token</h2>
              <button onClick={handleClose}>X</button>
            </div>
            <input
              type="text"
              placeholder="Search for a token name"
              className="p-2 w-full mb-4 border rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex flex-wrap justify-between overflow-y-scroll flex-grow">
              {renderItems()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SelectBox;
