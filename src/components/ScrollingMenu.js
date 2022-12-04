import React from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";

import { LeftArrow, RightArrow } from "./arrows";
import { Card } from "./cards";
import usePreventBodyScroll from "./usePreventBodyScroll";

import "./hideScrollbar.css";

//cite: https://codesandbox.io/s/react-horizontal-scrolling-menu-v2-basic-example-swg0y?file=/src/card.tsx
//Adapt the code from the link above
function ScrollingMenu(props) {
  const { disableScroll, enableScroll } = usePreventBodyScroll();

  return (
    <>
      <div className="example filter-container">
        <div onMouseEnter={disableScroll} onMouseLeave={enableScroll}>
          <ScrollMenu
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
            onWheel={onWheel}
          >
            {props.industryNames.map((industryName) => (
              <Card
                setCurIndustry={props.setCurIndustry}
                industryName={industryName}
                itemId={industryName} 
                key={industryName}
              />
            ))}
          </ScrollMenu>
        </div>
      </div>
    </>
  );
}
export default ScrollingMenu;

function onWheel(apiObj, ev) {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}
