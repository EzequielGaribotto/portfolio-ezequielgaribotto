import React from "react";

/**
 * Lines of a scope hint. A label at the start of a line ("Scope:", "In this project:") is set in bold;
 * bullets stay plain. The caller keeps the line breaks (white-space: pre-line).
 */
export default function HintText({ text, labelClassName }: { text: string; labelClassName?: string }) {
  return (
    <>
      {text.split("\n").map((line, i) => {
        const label = line.match(/^([^:•]{1,32}:)(.*)$/);
        return (
          <React.Fragment key={i}>
            {i > 0 && "\n"}
            {label ? (
              <>
                <strong className={labelClassName}>{label[1]}</strong>
                {label[2]}
              </>
            ) : (
              line
            )}
          </React.Fragment>
        );
      })}
    </>
  );
}
