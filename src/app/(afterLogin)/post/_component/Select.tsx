import { Dispatch, SetStateAction, useRef, useState } from "react";
import classes from "./select.module.css";

type Props = {
  optionsArr: string[];
  selectName: string;
  placeholder: string;
  setState: Dispatch<SetStateAction<string>>;
};

export default function Select({ optionsArr, selectName, placeholder, setState }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className={classes.container}>
      <div
        className={classes.inputContainer}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <input readOnly name={selectName} id={selectName} ref={inputRef} placeholder={placeholder} required />
        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000">
          <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
        </svg>
      </div>
      {isOpen && (
        <ul className={classes.optionContainer}>
          {optionsArr.map((e, i) => {
            return (
              <li
                key={e + i}
                onClick={() => {
                  inputRef.current!.value = e;
                  setState(e);
                  setIsOpen(false);
                }}
              >
                <p>{e}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
