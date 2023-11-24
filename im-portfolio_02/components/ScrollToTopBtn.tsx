"use client";

import { BorderBox } from "./common/BorderBox";
import { ScrollTopType } from "@/types";

export default function ScrollToTopBtn({ scrollTop }: ScrollTopType) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button className={scrollTop ? "scrollTop" : ""}>
      <BorderBox boxStyle="circle" onClick={scrollToTop}>
        <img src="/images/scrollToTopArrow.png" alt="scrollToTopButton" />
      </BorderBox>
    </button>
  );
}
