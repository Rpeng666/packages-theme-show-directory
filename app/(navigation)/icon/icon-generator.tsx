"use client";

import React, { use, useCallback, useEffect, useRef, useState } from "react";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import cn from "classnames";
import { toPng as htmlToPng } from "html-to-image";
import { CSSTransition } from "react-transition-group";
import { ColorChangeHandler } from "react-color";

import DropZoneIndicator from "./assets/drop-zone-indicator.svg";
import previewBgUrl from "./assets/bg.png";

import {
  Icons,
  IconName,
  UndoIcon,
  RedoIcon,
  ArrowRightIcon,
  DownloadIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ShuffleIcon,
  FolderIcon,
  ImageIcon,
  AppWindowSidebarLeftIcon as AppImageSidebarLeftIcon,
  AppWindowSidebarRightIcon as AppImageSidebarRightIcon,
  CopyClipboardIcon,
  LinkIcon,
  BrushIcon,
  MagnifyingGlassIcon,
} from "@raycast/icons";

import ResultIcon from "./components/ResultIcon";
import { Button } from "@/components/button";
import { resolveComponent } from "@template/ui";
import CustomSvgIcon from "./components/CustomSvgIcon";

import { randomElement, debounce, uniq, getPastedSvgFile } from "./lib/utils";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/select";

import ExportModal from "./components/ExportModal";

import styles from "./icon-generator.module.css";

import type { SettingsType } from "./lib/types";
import { BASE_URL } from "@/utils/common";
import { ButtonGroup } from "@/components/button-group";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/dropdown-menu";
import usePngClipboardSupported from "../(code)/util/usePngClipboardSupported";
import { Switch } from "@/components/switch";
import { NavigationActions } from "@/components/navigation";
import useHotkeys from "@/utils/useHotkeys";
import { Input, InputSlot } from "@/components/input";
import { SelectItemText } from "@radix-ui/react-select";
import { InfoDialog } from "./components/InfoDialog";
import { Kbd, Kbds } from "@/components/kbd";
import { ScrollArea } from "@/components/scroll-area";

const scales = [0.25, 0.5, 1, 2];

const FEEDBACK_EMAIL = "feedback+rayso@raycast.com";

type PresetType = Pick<
  SettingsType,
  | "backgroundFillType"
  | "backgroundStartColor"
  | "backgroundEndColor"
  | "backgroundAngle"
  | "backgroundPosition"
  | "iconColor"
>;

const presets: PresetType[] = [
  {
    backgroundFillType: "Linear",
    backgroundStartColor: "#8E2DE2",
    backgroundEndColor: "#4A00E0",
    backgroundAngle: 45,
    iconColor: "#FFFFFF",
  },
  {
    backgroundFillType: "Linear",
    backgroundStartColor: "#99F2C8",
    backgroundEndColor: "#1F4037",
    backgroundAngle: 45,
    iconColor: "#FFFFFF",
  },
  {
    backgroundFillType: "Linear",
    backgroundStartColor: "#F953C6",
    backgroundEndColor: "#B91D73",
    backgroundAngle: 45,
    iconColor: "#FFFFFF",
  },
  {
    backgroundFillType: "Linear",
    backgroundStartColor: "#91EAE4",
    backgroundEndColor: "#7F7FD5",
    backgroundAngle: 45,
    iconColor: "#FFFFFF",
  },
  {
    backgroundFillType: "Linear",
    backgroundStartColor: "#F5AF19",
    backgroundEndColor: "#F12711",
    backgroundAngle: 45,
    iconColor: "#FFFFFF",
  },
  {
    backgroundFillType: "Linear",
    backgroundStartColor: "#EAAFC8",
    backgroundEndColor: "#EC2F4B",
    backgroundAngle: 45,
    iconColor: "#FFFFFF",
  },
  {
    backgroundFillType: "Linear",
    backgroundStartColor: "#FF7DB4",
    backgroundEndColor: "#654EA3",
    backgroundAngle: 45,
    iconColor: "#FFFFFF",
  },
  {
    backgroundFillType: "Linear",
    backgroundStartColor: "#00B4DB",
    backgroundEndColor: "#003357",
    backgroundAngle: 45,
    iconColor: "#FFFFFF",
  },
  {
    backgroundFillType: "Linear",
    backgroundStartColor: "#A8C0FF",
    backgroundEndColor: "#3F2B96",
    backgroundAngle: 90,
    iconColor: "#FFFFFF",
  },
  {
    backgroundFillType: "Linear",
    backgroundStartColor: "#DD1818",
    backgroundEndColor: "#380202",
    backgroundAngle: 135,
    iconColor: "#FFFFFF",
  },
  {
    backgroundFillType: "Linear",
    backgroundStartColor: "#DECBA4",
    backgroundEndColor: "#3E5151",
    backgroundAngle: 45,
    iconColor: "#FFFFFF",
  },
  {
    backgroundFillType: "Linear",
    backgroundStartColor: "#FC466B",
    backgroundEndColor: "#3F5EFB",
    backgroundAngle: 180,
    iconColor: "#FFFFFF",
  },
  {
    backgroundFillType: "Linear",
    backgroundStartColor: "#CCCFE2",
    backgroundEndColor: "#25242B",
    backgroundAngle: 180,
    iconColor: "#FFFFFF",
  },
  {
    backgroundFillType: "Linear",
    backgroundStartColor: "#68AEFF",
    backgroundEndColor: "#003EB7",
    backgroundAngle: 180,
    iconColor: "#FFFFFF",
  },
  {
    backgroundFillType: "Linear",
    backgroundStartColor: "#C9D6FF",
    backgroundEndColor: "#596AA1",
    backgroundAngle: 180,
    iconColor: "#FFFFFF",
  },
  {
    backgroundFillType: "Linear",
    backgroundStartColor: "#5C5C5C",
    backgroundEndColor: "#0F1015",
    backgroundAngle: 180,
    iconColor: "#FFFFFF",
  },
  {
    backgroundFillType: "Radial",
    backgroundStartColor: "#695BF8",
    backgroundEndColor: "#131308",
    backgroundPosition: "50%,0%",
    iconColor: "#FFFFFF",
  },
  {
    backgroundFillType: "Radial",
    backgroundStartColor: "#4d4d4d",
    backgroundEndColor: "#000000",
    backgroundPosition: "50%,0%",
    iconColor: "#e6e6e6",
  },
  {
    backgroundFillType: "Radial",
    backgroundStartColor: "#f5af19",
    backgroundEndColor: "#f12711",
    backgroundPosition: "50%,50%",
    iconColor: "#FFFFFF",
  },
  {
    backgroundFillType: "Radial",
    backgroundStartColor: "#1D6E47",
    backgroundEndColor: "#041B11",
    backgroundPosition: "50%,0%",
    iconColor: "#DCEEDE",
  },
  {
    backgroundFillType: "Radial",
    backgroundStartColor: "#ffffff",
    backgroundEndColor: "#666666",
    backgroundPosition: "50%,100%",
    iconColor: "#232323",
  },
  {
    backgroundFillType: "Radial",
    backgroundStartColor: "#d9f1f8",
    backgroundEndColor: "#002069",
    backgroundPosition: "50%,100%",
    iconColor: "#e3efff",
  },
  {
    backgroundFillType: "Radial",
    backgroundStartColor: "#f95356",
    backgroundEndColor: "#7e0000",
    backgroundPosition: "50%,50%",
    iconColor: "#ffd5d5",
  },
  {
    backgroundFillType: "Radial",
    backgroundStartColor: "#ffbb00",
    backgroundEndColor: "#ffe74b",
    backgroundPosition: "50%,0%",
    iconColor: "#2a1a00",
  },
];

let infoMessageTimeout: NodeJS.Timeout | undefined;

// 经注册表解析主题工作台 UI 原语（模块级，避免直连具体主题实现）。
const ColorInput = resolveComponent("WorkbenchColorInput");
const WorkbenchFormSection = resolveComponent("WorkbenchFormSection");
const WorkbenchFormItem = resolveComponent("WorkbenchFormItem");
const WorkbenchToolbarActions = resolveComponent("WorkbenchToolbarActions");
const WorkbenchPanel = resolveComponent("WorkbenchPanel");
const WorkbenchIconPicker = resolveComponent("WorkbenchIconPicker");
const WorkbenchIconPreviewStage = resolveComponent("WorkbenchIconPreviewStage");

export const IconGenerator = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("q") || "";

  const [scale, setScale] = useState<number>(() =>
    typeof window !== "undefined" && window.innerWidth < 512 ? window.innerWidth / 512 - 0.03125 * 2 : 1,
  );
  const [initialSettings] = useState<SettingsType>(() => {
    const defaultPresetIndex = 0;
    const defaultIcon = (Object.keys(Icons)[0] || "Dots") as IconName;
    const baseSettings: SettingsType = {
      fileName: "extension_icon",
      icon: defaultIcon,
      backgroundRadius: 128,
      backgroundStrokeSize: 0,
      backgroundStrokeColor: "#FFFFFF",
      backgroundRadialGlare: false,
      backgroundNoiseTexture: false,
      backgroundNoiseTextureOpacity: 25,
      backgroundStrokeOpacity: 100,
      backgroundPosition: "50%,0%",
      backgroundSpread: 100,
      backgroundAngle: 0,
      iconSize: 352,
      iconOffsetX: 0,
      iconOffsetY: 0,
      selectedPresetIndex: defaultPresetIndex,
      customSvg: undefined,
      ...presets[defaultPresetIndex],
    };

    const settingsFromUrl = Object.keys(baseSettings).reduce((acc, key) => {
      if (key === "customSvg") return acc;
      const rawValue = searchParams.get(key);
      if (rawValue === null) return acc;

      let value: string | boolean | number | undefined = rawValue;
      if (value === "undefined") value = undefined;
      if (key === "backgroundRadialGlare" || key === "backgroundNoiseTexture") {
        value = value === "true" || value === "1";
      }

      return {
        ...acc,
        [key]: value,
      };
    }, {} as Partial<SettingsType>);

    return { ...baseSettings, ...settingsFromUrl };
  });
  const [history, setHistory] = useState<SettingsType[]>(() => [initialSettings]);
  const [redoHistory, setRedoHistory] = useState<SettingsType[]>([]);
  const [recentColors, setRecentColors] = useState<string[]>([]);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [panelsVisible, setPanelsVisible] = useState<boolean>(true);
  const [headerVisible, setHeaderVisible] = useState<boolean>(true);
  const [infoMessage, setInfoMessage] = useState<string>();
  const [infoMessageVisible, setInfoMessageVisible] = useState<boolean>(false);
  const [showInfoMessageUndoButton, setShowInfoMessageUndoButton] = useState<boolean>(true);
  const [iconsPanelOpened, setIconsPanelOpened] = useState<boolean>(false);
  const [optionsPanelOpened, setOptionsPanelOpened] = useState<boolean>(false);
  const [exportDropdownOpen, setExportDropdownOpen] = useState<boolean>(false);
  const [showTextIconInput, setShowTextIconInput] = useState<boolean>(false);

  const [draggingFile, setDraggingFile] = useState<boolean>(false);
  const [settings, setSettings] = useState<SettingsType>(initialSettings);
  const pngClipboardSupported = usePngClipboardSupported();

  const searchRef = useRef<HTMLInputElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const iconsWrapperRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<HTMLElement & SVGSVGElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoMessageRef = useRef<HTMLDivElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const pushNewSettings = useCallback(
    (newSettings: Partial<SettingsType>) => {
      setSettings((currentSettings) => {
        const settingsToSet = {
          ...currentSettings,
          ...newSettings,
        };
        setHistory((history) => [...history, settingsToSet]);
        setRedoHistory([]);
        return settingsToSet;
      });
    },
    [setSettings],
  );

  const showInfoMessage = (message: string, showUndo = false) => {
    if (infoMessageTimeout) {
      clearTimeout(infoMessageTimeout);
    }
    setInfoMessageVisible(true);
    setInfoMessage(message);
    setShowInfoMessageUndoButton(showUndo);
    infoMessageTimeout = setTimeout(() => {
      setInfoMessageVisible(false);
    }, 3000);
  };

  const undo = useCallback(() => {
    if (history.length <= 1) {
      return;
    }
    history.pop();
    setRedoHistory((redoHistory) => [...redoHistory, settings]);
    setSettings(history[history.length - 1]);
    return setHistory(history);
  }, [history, settings]);

  const redo = useCallback(() => {
    if (redoHistory.length === 0) {
      return;
    }
    const lastHistory = redoHistory.pop();
    if (lastHistory) {
      setHistory((redoHistory) => [...redoHistory, lastHistory]);
      setSettings(lastHistory);
    }
    return setRedoHistory(redoHistory);
  }, [redoHistory]);

  const onChangeIcon = (value: string) => {
    pushNewSettings({
      icon: value as IconName,
      customSvg: undefined,
    });
  };

  const onRandomIconClick = () => {
    pushNewSettings({
      icon: randomElement(Object.keys(Icons) as IconName[]),
    });
  };

  const onCopyImageToClipboard = useCallback(async () => {
    if (svgRef.current) {
      // Fixes @2x png export instead of the same size as png
      const realPixelRatio = window.devicePixelRatio;
      window.devicePixelRatio = 1;
      const dataUri = await htmlToPng(svgRef.current, { pixelRatio: 1, width: 512, height: 512 });
      const blob = await (await fetch(dataUri)).blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
      window.devicePixelRatio = realPixelRatio;
      showInfoMessage("Image copied to clipboard", false);
    }
  }, []);

  const onCopyShareUrl = async () => {
    showInfoMessage("Copying URL to clipboard…", false);
    const url = `${BASE_URL}/icon?${new URLSearchParams(
      Object.entries(settings).map(([key, value]) => [key, String(value)]),
    ).toString()}`;

    let urlToCopy = url;
    const encodedUrl = encodeURIComponent(url);
    const response = await fetch(`https://ray.so/api/shorten-url?url=${encodedUrl}&ref=icons`).then((res) =>
      res.json(),
    );

    if (response.link) {
      urlToCopy = response.link;
    }

    navigator.clipboard.writeText(urlToCopy);
    showInfoMessage("URL copied to clipboard", false);
  };

  const onSelectCustomIcon = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      localStorage.setItem("uploadCustomIconClicked", "1");
    } catch (error) {
      console.log("Could not set uploadCustomIconClicked in localStorage", error);
    }
    if (event && event.target && event.target.files) {
      const file = event.target.files[0];
      if (file?.type === "image/svg+xml") {
        const customSvg = await file.text();
        if (customSvg) {
          showInfoMessage("Image pasted to canvas", true);
          pushNewSettings({
            customSvg,
            icon: undefined,
          });
        } else {
          showInfoMessage("We don't support that file format. Try dropping an .SVG or .PNG file instead.", false);
        }
      } else if (file?.type === "image/png") {
        const reader = new FileReader();
        reader.onload = () => {
          const customPng = reader.result as string;
          showInfoMessage("Image pasted to canvas", true);
          pushNewSettings({
            customSvg: customPng,
            icon: undefined,
          });
        };
        reader.onerror = () => {
          showInfoMessage("Failed to read the file. Please try again.", false);
        };
        reader.readAsDataURL(file);
      } else {
        showInfoMessage("We don't support that file format. Try dropping an .SVG or .PNG file instead.", false);
      }
    } else if (event && event.target.value && showTextIconInput) {
      const customText = "data:text/plaintext=" + event.target.value;
      pushNewSettings({
        customSvg: customText,
        icon: undefined,
      });
    } else {
      pushNewSettings({
        customSvg: undefined,
        icon: randomElement(Object.keys(Icons) as IconName[]),
      });
    }
  };

  // Custom SVG icons support: copy/paste, drag-n-drop
  useEffect(() => {
    async function onPaste(event: ClipboardEvent) {
      try {
        const customSvg = await getPastedSvgFile(event.clipboardData?.items || []);
        if (customSvg) {
          showInfoMessage("Image pasted to canvas", true);
          pushNewSettings({
            customSvg,
            icon: undefined,
          });
        }
      } catch (err) {
        console.log(err);
      }
    }

    async function onDrop(event: DragEvent) {
      event.preventDefault();
      setDraggingFile(false);
      try {
        const customSvg = await getPastedSvgFile(event.dataTransfer?.items || []);
        if (customSvg) {
          showInfoMessage("Image pasted to canvas", true);
          pushNewSettings({
            customSvg,
            icon: undefined,
          });
        }
      } catch (err) {
        showInfoMessage(err as string, false);
      }
    }

    function onDragOver(event: DragEvent) {
      setDraggingFile(true);
      event.preventDefault();
    }

    function onDragLeave() {
      setDraggingFile(false);
    }

    document.addEventListener("paste", onPaste);
    document.addEventListener("drop", onDrop);
    document.addEventListener("dragover", onDragOver);
    document.addEventListener("dragleave", onDragLeave);

    return () => {
      document.removeEventListener("paste", onPaste);
      document.removeEventListener("drop", onDrop);
      document.removeEventListener("dragover", onDragOver);
      document.removeEventListener("dragleave", onDragLeave);
    };
  }, [pushNewSettings]);

  useHotkeys("ctrl+0,cmd+0", () => setScale(1));
  useHotkeys("ctrl+.,cmd+.", () => setPanelsVisible((panelsVisible) => !panelsVisible));
  useHotkeys("ctrl+z,cmd+z", () => undo());
  useHotkeys("ctrl+shift+z,cmd+shift+z", () => redo());
  useHotkeys("ctrl+shift+e,cmd+shift+e", () => setShowExportModal(true));
  useHotkeys("ctrl+shift+c,cmd+shift+c", () => onCopyShareUrl() as any);
  useHotkeys("ctrl+c,cmd+c", () => onCopyImageToClipboard() as any);
  useHotkeys("ctrl+f,cmd+f", (e) => {
    if (searchRef && searchRef.current) {
      e.preventDefault();
      searchRef.current.focus();
    }
  });
  useHotkeys("ctrl+k,cmd+k", () => setExportDropdownOpen((opened) => !opened));

  const onWheel = useCallback((event: WheelEvent) => {
    if (event.ctrlKey || event.metaKey) {
      setScale((currentScale) => currentScale + 0.0001 * event.deltaY);
      event.preventDefault();
      event.stopPropagation();
    }
  }, []);

  useEffect(() => {
    const mainRefCurent = mainRef?.current;

    if (mainRefCurent) {
      mainRefCurent.addEventListener("wheel", onWheel, { passive: false });
    }

    return () => {
      if (mainRefCurent) {
        mainRefCurent.removeEventListener("wheel", onWheel);
      }
    };
  }, [mainRef, onWheel]);

  const onFormChange = () => {
    if (!formRef.current) {
      return;
    }
    const formData = new FormData(formRef.current);
    const data: Record<string, unknown> = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // If these properties change, we need to detach from preset
    const shouldDetatchPreset =
      data.backgroundStartColor !== settings.backgroundStartColor ||
      data.backgroundEndColor !== settings.backgroundEndColor ||
      data.backgroundAngle !== settings.backgroundAngle;

    pushNewSettings({
      ...data,
      backgroundRadialGlare: data.backgroundRadialGlare ? true : false,
      backgroundNoiseTexture: data.backgroundNoiseTexture ? true : false,
      selectedPresetIndex: shouldDetatchPreset ? null : settings.selectedPresetIndex,
    });
  };

  const onPresetChange = (preset: Partial<SettingsType>, index: number) => {
    pushNewSettings({
      ...preset,
      selectedPresetIndex: index,
    });
  };

  const onChangeSearchTerm: React.FormEventHandler<HTMLInputElement> = (event) => {
    const newSeachTerm = (event.target as HTMLInputElement).value;
    router.replace(`?q=${newSeachTerm}`);
  };

  const onFileNameBlured = (event: React.ChangeEvent<HTMLDivElement>) => {
    pushNewSettings({
      fileName: (event.currentTarget as HTMLDivElement).textContent || "extension_name",
    });
  };
  const onFileNameKeydown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.currentTarget.blur();
      pushNewSettings({
        fileName: (event.currentTarget as HTMLDivElement).textContent || "",
      });
    }
  };

  const onChangeColorSetting =
    (settingName: string): ColorChangeHandler =>
    (newValue) => {
      const color = newValue.hex.toUpperCase();
      pushNewSettings({
        [settingName]: color,
        selectedPresetIndex: null,
      });
      onSaveRecentColor(color);
    };

  const onChangeAngle = (event: React.ChangeEvent<HTMLInputElement>) => {
    return pushNewSettings({
      backgroundAngle: Number(event.target.value),
      selectedPresetIndex: null,
    });
  };

  // TODO: update to the latest react-color when it is released and use onChangeComplete
  const onSaveRecentColor = debounce((color: string) => {
    setRecentColors((colors) => uniq([color, ...colors]).slice(0, 16));
  });

  const onChangeFillType = (newValue: string) => {
    if (newValue) {
      pushNewSettings({
        backgroundFillType: newValue,
        selectedPresetIndex: null,
      });
    }
  };

  const onChangeBackgroundPosition = (newValue: string) => {
    if (newValue) {
      pushNewSettings({
        backgroundPosition: newValue,
        selectedPresetIndex: null,
      });
    }
  };

  const onChangeScale = (newValue: string) => {
    if (newValue) {
      setScale(Number(newValue));
    }
  };

  let IconComponent: React.FC<React.SVGProps<SVGSVGElement>> = () => null;
  const customSvgIsPng = settings.customSvg?.startsWith("data:image/png");
  const customSvgIsText = settings.customSvg?.startsWith("data:text/plaintext");
  if (settings.customSvg) {
    const svgSource = customSvgIsPng
      ? `<svg><image xlink:href="${settings.customSvg}" x="0" y="0" width="${settings.iconSize}" height="${settings.iconSize}" /></svg>`
      : customSvgIsText
        ? `<svg width="${settings.iconSize}" height="${settings.iconSize}" viewBox="0 0 ${settings.iconSize} ${settings.iconSize}">
        <style>
          text {
           font-family: Inter, sans-serif;
            font-weight: bold;
          }
         </style>
        <rect width="${settings.iconSize}" height="${settings.iconSize}" />
        <text 
        x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="${settings.iconSize * 0.48}" font-family="Arial, sans-serif" fill="${settings.iconColor}"
        >
        ${settings.customSvg.split("=")[1]}
      </text>
      </svg>`
        : settings.customSvg;

    IconComponent = function CustomSvg(props) {
      return <CustomSvgIcon {...props} svgSource={svgSource} />;
    };
  } else if (settings.icon) {
    IconComponent = Icons[settings.icon];
  }

  const filteredIcons = Object.keys(Icons).filter((key) =>
    key.toLowerCase().includes(searchTerm.toLowerCase()),
  ) as IconName[];

  const scaleOptions = scales.map((value) => ({
    value,
    label: `${Math.round(value * 100)}%`,
  }));

  if (!scales.includes(scale)) {
    scaleOptions.unshift({
      value: scale,
      label: `${Math.round(scale * 100)}%`,
    });
  }

  const fillTypeOptions = [
    { value: "Linear", label: "Linear" },
    { value: "Radial", label: "Radial" },
    { value: "Solid", label: "Solid" },
  ];

  const backgroundPositionOptions = [
    { value: "50%,50%", label: "Center" },
    { value: "50%,0%", label: "Top" },
    { value: "100%,50%", label: "Right" },
    { value: "50%,100%", label: "Bottom" },
    { value: "0%,50%", label: "Left" },
  ];

  const onShare = async () => {
    try {
      const url = window.location.href.split("?")[0] + "?" + new URLSearchParams(settings as any).toString();
      await navigator.share({
        title: "Raycast Icon",
        url,
      });
    } catch (err) {
      console.error("sharing not available");
    }
  };

  return (
    <div className={styles.container}>
      <ExportModal
        open={showExportModal}
        onOpenChange={setShowExportModal}
        onStartExport={() => showInfoMessage("Download started", false)}
        fileName={settings.fileName}
        svgRef={svgRef}
      />
      <CSSTransition
        in={draggingFile}
        nodeRef={dropZoneRef}
        timeout={300}
        classNames={{
          enter: styles.transitionEnter,
          enterActive: styles.transitionEnterActive,
          exit: styles.transitionExit,
          exitActive: styles.transitionExitActive,
        }}
        unmountOnExit
      >
        <div className={styles.dropZone} ref={dropZoneRef}>
          <div className={styles.dropZoneIndicator}>
            <DropZoneIndicator />
            <span className={styles.dropZoneMessage}>
              Drag and drop
              <br /> your SVG file here
            </span>
          </div>
        </div>
      </CSSTransition>
      <NavigationActions>
        <WorkbenchToolbarActions
          left={
          <>
          <Button
          variant="transparent"
          className={styles.undoButton}
          disabled={history.length <= 1}
          title={`cmd+z`}
          onClick={undo}
          >
          <UndoIcon />
          <span className={styles.label}>Undo</span>
          </Button>

          <Button
          variant="transparent"
          className={styles.redoButton}
          disabled={redoHistory.length === 0}
          title={`shift+cmd+z`}
          onClick={redo}
          >
          <RedoIcon />
          <span className={styles.label}>Redo</span>
          </Button>
          </>
          }
          center={<div className={styles.filename} contentEditable suppressContentEditableWarning onBlur={onFileNameBlured} onKeyDown={onFileNameKeydown}>{settings.fileName}</div>}
          right={
          <>
          <div className="flex gap-2 sm:hidden">
          <Button variant="primary" className={styles.exportButton} onClick={onShare}>
          <DownloadIcon /> Share Icon
          </Button>
          </div>
          <div className="sm:flex gap-2 hidden">
          <InfoDialog />
          <ButtonGroup>
          <Button variant="primary" className={styles.exportButton} onClick={() => setShowExportModal(true)}>
          <DownloadIcon />
          Export icon
          </Button>
          <DropdownMenu open={exportDropdownOpen} onOpenChange={setExportDropdownOpen}>
          <DropdownMenuTrigger asChild>
          <Button variant="primary" aria-label="See other export options">
          <ChevronDownIcon className="w-4 h-4" />
          </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="end">
          <DropdownMenuItem onSelect={() => setShowExportModal(true)}>
          <ImageIcon /> Download
          <Kbds>
          <Kbd>⌘</Kbd>
          <Kbd>⇧</Kbd>
          <Kbd>E</Kbd>
          </Kbds>
          </DropdownMenuItem>
          {pngClipboardSupported && (
          <DropdownMenuItem onSelect={onCopyImageToClipboard}>
          <CopyClipboardIcon /> Copy Image
          <Kbds>
          <Kbd>⌘</Kbd>
          <Kbd>C</Kbd>
          </Kbds>
          </DropdownMenuItem>
          )}
          <DropdownMenuItem onSelect={onCopyShareUrl}>
          <LinkIcon /> Copy URL
          <Kbds>
          <Kbd>⌘</Kbd>
          <Kbd>⇧</Kbd>
          <Kbd>C</Kbd>
          </Kbds>
          </DropdownMenuItem>
          </DropdownMenuContent>
          </DropdownMenu>
          </ButtonGroup>
          </div>
          </>
          }
        />
      </NavigationActions>
      <main className={styles.content} ref={mainRef}>
        <CSSTransition
          in={panelsVisible}
          nodeRef={iconsWrapperRef}
          timeout={300}
          classNames={{
            enter: styles.transitionEnter,
            enterActive: styles.transitionEnterActive,
            exit: styles.transitionExit,
            exitActive: styles.transitionExitActive,
          }}
          unmountOnExit
        >
<WorkbenchPanel
          side="left"
          opened={iconsPanelOpened}
          hidden={optionsPanelOpened}
          handleIcon={<AppImageSidebarLeftIcon />}
          onHandleClick={() => setIconsPanelOpened(!iconsPanelOpened)}
        >
            <div className={styles.searchWrapper}>
              <Input
                type="text"
                placeholder="Search icons…"
                value={searchTerm}
                ref={searchRef}
                size="large"
                variant="soft"
                onChange={onChangeSearchTerm}
              >
                <InputSlot side="left">
                  <MagnifyingGlassIcon className="!w-4 !h-4" />
                </InputSlot>
              </Input>
              <Button iconOnly size="large" onClick={onRandomIconClick} title="Random icon">
                <ShuffleIcon className="!w-4 !h-4" />
              </Button>
              <Button
                iconOnly
                size="large"
                onClick={() => setShowTextIconInput(!showTextIconInput)}
                title="Create text icon"
              >
                <span className="text-sm">Aa</span>
              </Button>
              <Button iconOnly size="large" title="Upload your own SVG" className="relative">
                <input
                  type="file"
                  className={styles.uploadCustomIconFileInput}
                  onChange={onSelectCustomIcon}
                  accept=".svg, .png"
                />
                <FolderIcon className="!w-4 !h-4" />
              </Button>
            </div>

            {showTextIconInput && (
              <>
                <h4>Text</h4>
                <div className={styles.searchWrapper}>
                  <Input
                    type="text"
                    placeholder="Enter text (e.g., AA, BN, C)"
                    onChange={(e) => onSelectCustomIcon(e)}
                    maxLength={2}
                    size={"large"}
                    variant={"soft"}
                    className="w-full"
                  />
                </div>
              </>
            )}

            {filteredIcons.length === 0 ? (
              <div className={styles.emptyIconsList}>
                <BrushIcon className={styles.emptyIconsListIcon} />
                We couldn’t find an icon for that
                <Link href={`mailto:${FEEDBACK_EMAIL}?subject=Request%20Icon`}>
                  Request icon <ArrowRightIcon />
                </Link>
              </div>
            ) : (
              <>
                <h4>{searchTerm ? "Results" : "All Icons"}</h4>
                <ScrollArea className={styles.scrollWrapper}>
                  <div className={styles.iconsWrapper}>
                    {filteredIcons.map((icon) => {
                      const Component = Icons[icon];
                      return (
                        <label key={icon} className={styles.icon}>
                          <input
                            type="radio"
                            name="icon"
                            value={icon}
                            checked={icon === settings.icon}
                            onChange={() => onChangeIcon(icon)}
                          />
                          <Component width={16} height={16} />
                        </label>
                      );
                    })}
                  </div>
                </ScrollArea>
              </>
            )}
        </WorkbenchPanel>
        </CSSTransition>
        <WorkbenchIconPreviewStage
          size={512}
          scale={scale}
          dimensionsLabel="512 x 512"
          backgroundImage={`url(${previewBgUrl})`}
          onBackgroundClick={() => {
            setIconsPanelOpened(false);
            setOptionsPanelOpened(false);
          }}
        >
          <CSSTransition
            in={history.length > 0}
            nodeRef={svgRef}
            timeout={300}
            classNames={{
              enter: styles.transitionEnter,
              enterActive: styles.transitionEnterActive,
              exit: styles.transitionExit,
              exitActive: styles.transitionExitActive,
            }}
            unmountOnExit
          >
            <ResultIcon settings={settings} IconComponent={IconComponent} ref={svgRef} />
          </CSSTransition>
        </WorkbenchIconPreviewStage>
        <CSSTransition
          in={panelsVisible}
          nodeRef={formRef}
          timeout={300}
          classNames={{
            enter: styles.transitionEnter,
            enterActive: styles.transitionEnterActive,
            exit: styles.transitionExit,
            exitActive: styles.transitionExitActive,
          }}
          unmountOnExit
        >
<WorkbenchPanel
          side="right"
          opened={optionsPanelOpened}
          hidden={!panelsVisible}
          handleIcon={<AppImageSidebarRightIcon />}
          onHandleClick={() => setOptionsPanelOpened(!optionsPanelOpened)}
        >
            <ScrollArea>
              <div className={styles.inner}>
                <WorkbenchFormSection title="Presets" defaultOpen>
                  <div className={styles.presets}>
                    {presets.map((preset, index) => {
                      return (
                        <label key={index} className={styles.preset}>
                          <input
                            type="radio"
                            name="preset"
                            value={index}
                            checked={
                              settings.selectedPresetIndex === null
                                ? false
                                : index === Number(settings.selectedPresetIndex)
                            }
                            onChange={() => onPresetChange(preset, index)}
                          />

                          <ResultIcon size={20} isPreview settings={{ ...settings, ...preset, backgroundRadius: 0 }} />
                        </label>
                      );
                    })}
                  </div>
                </WorkbenchFormSection>
                <form onChange={onFormChange} ref={formRef} style={{ width: "100%" }}>
                  <WorkbenchFormSection title="Fill Styles" defaultOpen>
                    <div>
                      <WorkbenchFormItem>
                        <span>Fill Type</span>
                        <Select
                          name="backgroundFillType"
                          value={settings.backgroundFillType}
                          onValueChange={onChangeFillType}
                        >
                          <SelectTrigger className="w-[120px]" size="large">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {fillTypeOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                <SelectItemText>{option.label}</SelectItemText>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </WorkbenchFormItem>
                      <WorkbenchFormItem>
                        <span>{settings.backgroundFillType === "Solid" ? "Color" : "Primary color"}</span>
                        <ColorInput
                          value={settings.backgroundStartColor}
                          name="backgroundStartColor"
                          onChange={onChangeColorSetting("backgroundStartColor")}
                          recentColors={recentColors}
                        />
                      </WorkbenchFormItem>
                      {settings.backgroundFillType !== "Solid" && (
                        <WorkbenchFormItem disabled={settings.backgroundFillType === "Solid"}>
                          <span>Secondary color</span>
                          <ColorInput
                            value={settings.backgroundEndColor}
                            name="backgroundEndColor"
                            onChange={onChangeColorSetting("backgroundEndColor")}
                            recentColors={recentColors}
                          />
                        </WorkbenchFormItem>
                      )}
                      {settings.backgroundFillType === "Radial" ? (
                        <>
                          <WorkbenchFormItem>
                            <span>Position</span>
                            <Select
                              name="backgroundPosition"
                              value={settings.backgroundPosition}
                              onValueChange={onChangeBackgroundPosition}
                            >
                              <SelectTrigger className="w-[120px]" size="large">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {backgroundPositionOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    <SelectItemText>{option.label}</SelectItemText>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </WorkbenchFormItem>
                          <WorkbenchFormItem>
                            <span>Spread</span>
                            <Input
                              name="backgroundSpread"
                              type="number"
                              defaultValue={settings.backgroundSpread}
                              min={0}
                              max={100}
                              className="w-[120px]"
                              size="large"
                            >
                              <InputSlot>%</InputSlot>
                            </Input>
                          </WorkbenchFormItem>
                        </>
                      ) : settings.backgroundFillType === "Linear" ? (
                        <WorkbenchFormItem>
                          <span>Angle</span>
                          <Input
                            name="backgroundAngle"
                            type="number"
                            onChange={onChangeAngle}
                            defaultValue={settings.backgroundAngle}
                            min={0}
                            max={360}
                            className="w-[120px]"
                            size="large"
                          >
                            <InputSlot>º</InputSlot>
                          </Input>
                        </WorkbenchFormItem>
                      ) : null}
                    </div>
                  </WorkbenchFormSection>
                  <WorkbenchFormSection title="Background">
                    <div>
                      <WorkbenchFormItem>
                        <span>Radial glare</span>
                        <Switch
                          name="backgroundRadialGlare"
                          checked={settings.backgroundRadialGlare}
                          onCheckedChange={(checked) =>
                            pushNewSettings({
                              backgroundRadialGlare: checked,
                            })
                          }
                          className="focus-visible:ring-offset-gray-3"
                        />
                      </WorkbenchFormItem>

                      <WorkbenchFormItem>
                        <span>Noise texture</span>
                        <Switch
                          name="backgroundNoiseTexture"
                          checked={settings.backgroundNoiseTexture}
                          onCheckedChange={(checked) =>
                            pushNewSettings({
                              backgroundNoiseTexture: checked,
                            })
                          }
                          className="focus-visible:ring-offset-gray-3"
                        />
                      </WorkbenchFormItem>
                      <WorkbenchFormItem>
                        <span>Noise opacity</span>
                        <Input
                          name="backgroundNoiseTextureOpacity"
                          type="number"
                          min={0}
                          max={100}
                          defaultValue={settings.backgroundNoiseTextureOpacity}
                          className="w-[120px]"
                          size="large"
                        >
                          <InputSlot>%</InputSlot>
                        </Input>
                      </WorkbenchFormItem>
                      <WorkbenchFormItem>
                        <span>Radius</span>
                        <Input
                          name="backgroundRadius"
                          type="number"
                          min={0}
                          max={256}
                          defaultValue={settings.backgroundRadius}
                          className="w-[120px]"
                          size="large"
                        >
                          <InputSlot>px</InputSlot>
                        </Input>
                      </WorkbenchFormItem>
                      <WorkbenchFormItem>
                        <span>Stroke size</span>
                        <Input
                          name="backgroundStrokeSize"
                          type="number"
                          min={0}
                          defaultValue={settings.backgroundStrokeSize}
                          className="w-[120px]"
                        >
                          <InputSlot>px</InputSlot>
                        </Input>
                      </WorkbenchFormItem>
                      <WorkbenchFormItem>
                        <span>Stroke color</span>
                        <ColorInput
                          value={settings.backgroundStrokeColor}
                          name="backgroundStrokeColor"
                          onChange={onChangeColorSetting("backgroundStrokeColor")}
                          recentColors={recentColors}
                        />
                      </WorkbenchFormItem>
                      <WorkbenchFormItem>
                        <span>Stroke opacity</span>
                        <Input
                          name="backgroundStrokeOpacity"
                          type="number"
                          defaultValue={settings.backgroundStrokeOpacity}
                          className="w-[120px]"
                          size="large"
                        >
                          <InputSlot>%</InputSlot>
                        </Input>
                      </WorkbenchFormItem>
                    </div>
                  </WorkbenchFormSection>

                  <WorkbenchFormSection title="Icon">
                    <div>
                      {!customSvgIsPng && (
                        <WorkbenchFormItem>
                          <span>Color</span>
                          <ColorInput
                            value={settings.iconColor}
                            name="iconColor"
                            onChange={onChangeColorSetting("iconColor")}
                            recentColors={recentColors}
                          />
                        </WorkbenchFormItem>
                      )}
                      <WorkbenchFormItem>
                        <span>Size</span>
                        <div className={cn(styles.inputWrapper, styles.inputWithUnit)}>
                          <Input
                            name="iconSize"
                            type="number"
                            defaultValue={settings.iconSize}
                            min={0}
                            className="w-[120px]"
                            size="large"
                          >
                            <InputSlot>px</InputSlot>
                          </Input>
                        </div>
                      </WorkbenchFormItem>
                      <WorkbenchFormItem>
                        <span>X Offset</span>
                        <div className={cn(styles.inputWrapper, styles.inputWithUnit)}>
                          <Input
                            name="iconOffsetX"
                            type="number"
                            defaultValue={settings.iconOffsetX}
                            className="w-[120px]"
                            size="large"
                          >
                            <InputSlot>px</InputSlot>
                          </Input>
                        </div>
                      </WorkbenchFormItem>
                      <WorkbenchFormItem>
                        <span>Y Offset</span>
                        <div className="flex flex-col">
                          <Input
                            name="iconOffsetY"
                            type="number"
                            defaultValue={settings.iconOffsetY}
                            className="w-[120px]"
                            size="large"
                          >
                            <InputSlot>px</InputSlot>
                          </Input>
                        </div>
                      </WorkbenchFormItem>
                    </div>
                  </WorkbenchFormSection>
                </form>
              </div>
            </ScrollArea>
        </WorkbenchPanel>
        </CSSTransition>
      </main>
      <div className={styles.scale}>
        <Select defaultValue={`${scale}`} value={`${scale}`} onValueChange={onChangeScale}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {scaleOptions.map((option) => (
              <SelectItem key={option.value} value={`${option.value}`}>
                <SelectItemText>{option.label}</SelectItemText>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <CSSTransition
        in={infoMessageVisible}
        nodeRef={infoMessageRef}
        timeout={300}
        classNames={{
          enter: styles.transitionEnter,
          enterActive: styles.transitionEnterActive,
          exit: styles.transitionExit,
          exitActive: styles.transitionExitActive,
        }}
        unmountOnExit
      >
        <div className={styles.infoMessage} ref={infoMessageRef}>
          {infoMessage}
          {showInfoMessageUndoButton ? (
            <>
              <div className={styles.separator} />
              <button className={styles.undoLastAction} onClick={undo}>
                Undo
              </button>
            </>
          ) : null}
        </div>
      </CSSTransition>
    </div>
  );
};
