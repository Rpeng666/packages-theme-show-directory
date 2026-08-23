"use client";

import React from "react";

import { useThemeComponent } from "@template/ui";
import BackgroundControl from "./BackgroundControl";
import DarkModeControl from "./DarkModeControl";
import ExportButton from "./ExportButton";
import LanguageControl from "./LanguageControl";
import PaddingControl from "./PaddingControl";
import ThemeControl from "./ThemeControl";
import LineNumberControl from "./LineNumberControl";

const Controls: React.FC = () => {
  const WorkbenchFooter = useThemeComponent("WorkbenchFooter");
  return (
    <WorkbenchFooter>
      <ThemeControl />
      <BackgroundControl />
      <DarkModeControl />
      <LineNumberControl />
      <PaddingControl />
      <LanguageControl />
    </WorkbenchFooter>
  );
};

export default Controls;
