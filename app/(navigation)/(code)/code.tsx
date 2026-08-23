"use client";
import { useEffect } from "react";
import getWasm from "shiki/wasm";
import { highlighterAtom } from "./store";
import { useAtom } from "jotai";

import { shikiTheme } from "./store/themes";

import Frame from "./components/Frame";
import Controls from "./components/Controls";

import { Highlighter, getHighlighterCore } from "shiki";
import { LANGUAGES } from "./util/languages";

import tailwindLight from "./assets/tailwind/light.json";
import tailwindDark from "./assets/tailwind/dark.json";
import ExportButton from "./components/ExportButton";
import { InfoDialog } from "./components/InfoDialog";
import FormatButton from "./components/FormatCodeButton";
import { useThemeSection } from "@template/ui";

/**
 * Code — 首页中间区域（Code Images 工作台）。
 *
 * 业务（shiki 高亮初始化 + Frame/Controls 内容）留在 app；
 * 编排（FrameContext + NoSSR + actions/stage/controls 布局）已注册进
 * raycast 主题的 CodeWorkbench。
 */
export function Code() {
  const CodeWorkbench = useThemeSection("CodeWorkbench");
  const [highlighter, setHighlighter] = useAtom(highlighterAtom);

  useEffect(() => {
    getHighlighterCore({
      themes: [shikiTheme, tailwindLight, tailwindDark],
      langs: [LANGUAGES.javascript.src(), LANGUAGES.tsx.src(), LANGUAGES.swift.src(), LANGUAGES.python.src()],
      loadWasm: getWasm,
    }).then((highlighter) => {
      setHighlighter(highlighter as Highlighter);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <CodeWorkbench
      actions={
        <>
          <InfoDialog />
          <FormatButton />
          <ExportButton />
        </>
      }
      stage={highlighter ? <Frame /> : null}
      controls={<Controls />}
    />
  );
}
