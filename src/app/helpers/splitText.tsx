import { cn } from "@/lib/utils";
import React, { Fragment } from "react";

export const splitWords = (phrase: string) => {
  return phrase.split(" ").map((word, index) => {
    if (word === "") {
      return (
        <span className="inline-block" key={index}>
          <span>{"\u00A0"}</span>
        </span>
      );
    }

    return (
      <span className="inline-block" key={index}>
        {word.split("").map((letter, index) => (
          <Fragment key={index + letter}>
            <span className="relative inline-flex overflow-hidden">
              <span className="letter">
                {letter === " " ? "\u00A0" : letter}
              </span>
            </span>
            {index === word.length - 1 ? (
              <span className="relative inline-flex overflow-hidden">
                <span className="letter">{"\u00A0"}</span>
              </span>
            ) : null}
          </Fragment>
        ))}
      </span>
    );
  });
};

export const splitLetters = (phrase: string, classname: string = "") => {
  return phrase.split("").map((letter, index) => {
    return (
      <span key={index} className={cn("relative inline-block", classname)}>
        {letter === " " ? "\u00A0" : letter}
      </span>
    );
  });
};
