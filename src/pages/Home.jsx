import React from "react";
import Main from "../commponents/home/main";

export default function Home({inputValue, setInputValue}) {
  return (
    <>
      <Main inputValue={inputValue} setInputValue={setInputValue}/>
    </>
  );
}
