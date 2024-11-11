"use client";

import Username from "../username";
import { normaliseString, useShell } from "@/context/shell-provider";
import { cn, tw } from "@/lib/utils";
import { commandExists } from "@/utils/command-exists";
import { getCommandSuggestion, handleTabCompletion } from "@/utils/completion";
import React from "react";

const BLANK = `\u200B`;
const BLANK_VALUE = "";

const trimZeroWidthSpace = (str: string, extended = false) => {
  const parsedString = str.replace(/[\u200B-\u200D\uFEFF]/g, "");
  if (extended && parsedString !== "") return parsedString.trimStart();
  return parsedString.trim();
};

const findFirstDiffIndex = (str1: string, str2: string | undefined) => {
  if (!str2) return -1;

  const maxLength = Math.max(str1.length, str2.length);
  for (let i = 0; i < maxLength; i++) {
    if (normaliseString(str1[i] ?? "") !== normaliseString(str2[i] ?? "")) {
      return i;
    }
  }
  return -1; // If the strings are identical
};

const setCaretToEnd = (
  element: HTMLDivElement,
  prevValue: string | undefined = undefined,
) => {
  const inputSpan = element.querySelector<HTMLSpanElement>("#input-value");
  if (inputSpan?.childNodes[0] === undefined) return;

  const text = inputSpan.textContent ?? "";

  const diffIndex = findFirstDiffIndex(inputSpan.textContent ?? "", prevValue);

  const _diffOffset = text.length < (prevValue?.length ?? 0) ? 0 : 1;
  const offset =
    diffIndex >= 0
      ? diffIndex + _diffOffset
      : (inputSpan.textContent?.length ?? 0);

  const range = document.createRange();
  const sel = window.getSelection();
  range.setStart(inputSpan.childNodes[0], offset);
  range.collapse(true);
  sel?.removeAllRanges();
  sel?.addRange(range);
  element.focus();
};

const getCaretPosition = (element: HTMLDivElement | null) => {
  const inputSpan = element?.querySelector("#input-value");
  const selection = window.getSelection();
  if (element && selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    let cursorPosition = 0;

    if (
      inputSpan &&
      (range.startContainer === inputSpan ||
        inputSpan.contains(range.startContainer))
    ) {
      preCaretRange.selectNodeContents(inputSpan);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      cursorPosition = normaliseString(preCaretRange.toString()).length;
    } else {
      preCaretRange.selectNodeContents(element);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      cursorPosition = normaliseString(preCaretRange.toString()).length;
    }

    return cursorPosition;
  }
  return 0;
};

export const Input = ({
  inputRef,
  containerRef,
}: {
  inputRef: React.RefObject<HTMLDivElement>;
  containerRef: React.RefObject<HTMLDivElement>;
}) => {
  const [value, setValue] = React.useState(BLANK_VALUE);
  const [suggestion, setSuggestion] = React.useState("");
  const [lastSuggestionIndex, setLastSuggestionIndex] =
    React.useState<number>(1);
  const prevValue = React.useRef<string | undefined>(undefined);
  const {
    setCommand,
    history,
    lastCommandIndex,
    setLastCommandIndex,
    clearHistory,
  } = useShell();

  React.useEffect(() => {
    containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
    if (inputRef.current) {
      inputRef.current.innerText = BLANK;
    }
  }, [history, containerRef, inputRef]);

  const updateContent = (val: string, sugg: string) => {
    if (inputRef.current) {
      inputRef.current.innerHTML = `
        <span id="input-value"></span><span id="input-suggestion" data-suggestion="${sugg}"></span>`;

      const inputSpan = inputRef.current.querySelector("#input-value");
      if (inputSpan) inputSpan.textContent = val;
      setCaretToEnd(inputRef.current, prevValue.current);
    }
  };

  const handleSetValue = (value: string | undefined, suggestion = "") => {
    if (!value || value.length === 0) {
      setValue(BLANK_VALUE);
      if (inputRef.current) {
        updateContent(BLANK, suggestion);
        setSuggestion("");
      }
      prevValue.current = undefined;
    } else {
      setValue(value);
      if (inputRef.current) {
        updateContent(value, suggestion);
        setSuggestion(suggestion);
      }
      prevValue.current = normaliseString(value);
    }
  };

  const onSubmit = async (event: React.KeyboardEvent<HTMLDivElement>) => {
    const key = event.key;

    if (event.key === "l" && event.ctrlKey) {
      event.preventDefault();
      prevValue.current = undefined;

      setLastSuggestionIndex(0);

      clearHistory();
      return;
    }

    if (key === "Tab") {
      event.preventDefault();
      prevValue.current = undefined;

      await handleTabCompletion({
        command: value,
        setCommand,
        setPreviousIndex: setLastSuggestionIndex,
        previousIndex: lastSuggestionIndex,
      });
      setLastSuggestionIndex(0);
    }

    if (key === "Enter" || event.code === "13") {
      event.preventDefault();
      prevValue.current = undefined;

      setLastCommandIndex(0);

      setCommand(value);

      handleSetValue(undefined);
      setLastSuggestionIndex(0);
    }

    const commands: string[] = history
      .map(({ command }) => command)
      .filter((value: string) => value);

    if (key === "ArrowUp") {
      event.preventDefault();
      prevValue.current = undefined;

      if (!commands.length) {
        return;
      }

      const index: number = lastCommandIndex + 1;

      if (index <= commands.length) {
        setLastCommandIndex(index);
        handleSetValue(commands[commands.length - index]);
      }
    }

    if (key === "ArrowDown") {
      event.preventDefault();
      prevValue.current = undefined;

      const index: number = lastCommandIndex - 1;

      if (index > 0) {
        setLastCommandIndex(index);
        handleSetValue(commands[commands.length - index]);
      } else {
        setLastCommandIndex(0);
        handleSetValue(undefined);
      }
    }

    const _currentTextLength =
      inputRef.current?.querySelector<HTMLSpanElement>("#input-value")
        ?.textContent?.length ?? 0;

    const _isAtEnd = getCaretPosition(inputRef.current) >= _currentTextLength;

    if (key === "ArrowRight" && suggestion && _isAtEnd) {
      prevValue.current = undefined;
      handleSetValue(value + suggestion);
      setLastSuggestionIndex(0);
    }
  };

  const handleChange = async (event: React.ChangeEvent<HTMLDivElement>) => {
    const _text = trimZeroWidthSpace(
      event.currentTarget.textContent ?? BLANK_VALUE,
      false,
    );
    let text = "";
    const inputSpan = event.currentTarget.querySelector("#input-value");
    const suggestionSpan =
      event.currentTarget.querySelector("#input-suggestion");

    const _textWithoutSuggestion = suggestionSpan?.textContent
      ? _text.replace(suggestionSpan?.textContent, "")
      : _text;

    if (
      inputSpan?.textContent !== undefined &&
      inputSpan.textContent !== null
    ) {
      text = trimZeroWidthSpace(inputSpan.textContent, true);
    } else {
      text = _textWithoutSuggestion;
    }

    const _suggestion =
      (await getCommandSuggestion({
        command: text,
        previousIndex: lastSuggestionIndex,
        setPreviousIndex: setLastSuggestionIndex,
      })) ?? "";
    const suggestion = text.length > 0 ? _suggestion : "";
    handleSetValue(text, suggestion);

    prevValue.current = text;
  };

  const handlePaste = () => {
    prevValue.current = undefined;
  };

  const onFocus = () => {
    if (inputRef.current) setCaretToEnd(inputRef.current);

    if (suggestion) {
      prevValue.current = undefined;
      handleSetValue(value + suggestion);
      setLastSuggestionIndex(0);
    }
  };

  const cmdExists = commandExists(value);

  return (
    <div className="relative w-full max-w-full flex-row py-1">
      <label htmlFor="prompt" className="float-left flex-shrink">
        <Username />
      </label>

      <div
        contentEditable
        role="textbox"
        ref={inputRef}
        id="prompt"
        className={cn(
          "overflow-x-clip bg-background focus:outline-none",
          commandExists(value) || value === ""
            ? tw`text-valid`
            : tw`text-invalid`,
        )}
        aria-label="prompt"
        onKeyDown={onSubmit}
        autoFocus
        onFocus={onFocus}
        onTouchStart={onFocus}
        onInput={handleChange}
        onPaste={handlePaste}
        autoCorrect="off"
        autoCapitalize="off"
        tabIndex={0}
      />
    </div>
  );
};

export default Input;
