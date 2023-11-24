import React, { useEffect, useState } from "react";
import styles from "@/style/components/navigationBar.module.scss";
import Image from "next/image";
import { ScrollTopType } from "@/types";

export default function NavigationBar({ scrollTop }: ScrollTopType) {
  let sectionListOffsetTop: number[] = [];
  if (typeof window !== "undefined") {
    const sectionList = document?.querySelectorAll("section");
    sectionList.forEach((section) => {
      sectionListOffsetTop.push(section.offsetTop);
    });
  }

  return (
    <div
      className={`${styles.navigationSection} ${
        !scrollTop && styles.scrollDrag
      }`}
    >
      {["profile", "skills", "project"].map((tabs, idx) => {
        return (
          <NavigationList
            key={idx}
            label={tabs}
            index={idx}
            sectionListOffsetTop={sectionListOffsetTop}
          />
        );
      })}
    </div>
  );
}

interface NavigationListType {
  label: string;
  index: number;
  sectionListOffsetTop: number[];
}

function NavigationList({
  label,
  index,
  sectionListOffsetTop,
}: NavigationListType) {
  const [currentFocus, setCurrentFocus] = useState<boolean>(false);

  // if (typeof window !== "undefined") {
  //   const browserHeight = window.innerHeight;
  //   const sectionLocation = sectionListOffsetTop[index + 1];
  //   const nextSectionLocation = sectionListOffsetTop[index + 2];

  //   const movingPoint = sectionLocation - browserHeight * 0.25;
  //   const nextMovingPoint = nextSectionLocation - browserHeight * 0.25;
  //   const handleScroll = () => {
  //     window.scrollTo({
  //       top: movingPoint,
  //       behavior: "smooth",
  //     });
  //   };
  // }

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (typeof window !== "undefined") {
        const browserHeight = window.innerHeight;
        const sectionLocation = sectionListOffsetTop[index + 1];
        const nextSectionLocation = sectionListOffsetTop[index + 2];

        const movingPoint = sectionLocation - browserHeight * 0.25;
        const nextMovingPoint = nextSectionLocation - browserHeight * 0.25;

        if (sectionListOffsetTop.length > 0) {
          if (
            movingPoint - browserHeight * 0.25 <= scrollY &&
            (isNaN(nextMovingPoint) ||
              scrollY < nextMovingPoint - browserHeight * 0.25)
          ) {
            if (!currentFocus) {
              setCurrentFocus(true);
            }
          } else {
            setCurrentFocus(false);
          }
        }
      }
    });
  }, [sectionListOffsetTop.length]);

  return (
    <div
      className={`${styles.navigation} 
      ${currentFocus && styles.active}
      `}
    >
      <button
        onClick={() => {
          if (typeof window !== "undefined") {
            const browserHeight = window.innerHeight;
            const sectionLocation = sectionListOffsetTop[index + 1];

            const movingPoint = sectionLocation - browserHeight * 0.25;
            const handleScroll = () => {
              window.scrollTo({
                top: movingPoint,
                behavior: "smooth",
              });
            };
            handleScroll();
          }
        }}
      >
        <figure>
          <Image
            src={`/images/navigationBar/${label}.png`}
            width={50}
            height={50}
            alt={label}
          />
          <figcaption>
            <p>{label}</p>
          </figcaption>
        </figure>
      </button>
    </div>
  );
}
