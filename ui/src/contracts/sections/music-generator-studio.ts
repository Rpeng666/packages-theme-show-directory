import type { ReactNode } from 'react';

/**
 * MusicGeneratorStudio - the AI music creation studio.
 *
 * Pure presentational: the app keeps the full business layer (auth, credit
 * balance, task creation, polling, audio playback, download) and passes
 * structured data + callbacks down. The section renders the designed studio:
 * a violet gradient hero strip with the credit wallet, a two-panel workspace
 * (prompt deck on the left, player on the right), the segmented mode tabs
 * (quick / custom), provider/model selects, the custom-mode composer
 * (title, style, lyrics, instrumental switch), the prompt composer with a
 * live count, the generate action, the live progress rail and the song
 * player with cover art, play / pause with an equalizer animation and a
 * download action, plus empty / loading states.
 */

export type MusicGeneratorStudioMode = 'quick' | 'custom';

export interface MusicGeneratorStudioModeItem {
  key: MusicGeneratorStudioMode;
  label: string;
  icon?: string;
}

export interface MusicGeneratorStudioOption {
  value: string;
  label: string;
}

export interface MusicGeneratorStudioSong {
  id: string;
  title: string;
  artist?: string;
  style?: string;
  durationLabel?: string;
  imageUrl?: string;
  audioUrl?: string;
  prompt?: string;
  status?: string;
}

export interface MusicGeneratorStudioProps {
  className?: string;
  /** forwarded to the DOM root by the registry wrapper */
  'data-registry'?: string;
  /** hero */
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  /** studio panel titles */
  deckTitle?: ReactNode;
  playerTitle?: ReactNode;
  /** mode tabs (quick / custom) */
  activeMode: MusicGeneratorStudioMode;
  modes: MusicGeneratorStudioModeItem[];
  onModeChange: (mode: MusicGeneratorStudioMode) => void;
  /** provider + model selects */
  providerLabel?: ReactNode;
  providerPlaceholder?: string;
  providerOptions: MusicGeneratorStudioOption[];
  provider: string;
  onProviderChange: (value: string) => void;
  modelLabel?: ReactNode;
  modelPlaceholder?: string;
  modelOptions: MusicGeneratorStudioOption[];
  model: string;
  onModelChange: (value: string) => void;
  /** custom composer (custom mode) */
  customTitleLabel?: ReactNode;
  customTitlePlaceholder?: string;
  customTitle: string;
  onCustomTitleChange: (value: string) => void;
  styleLabel?: ReactNode;
  stylePlaceholder?: string;
  style: string;
  onStyleChange: (value: string) => void;
  lyricsLabel?: ReactNode;
  lyricsPlaceholder?: string;
  lyrics: string;
  lyricsMaxLength?: number;
  onLyricsChange: (value: string) => void;
  lyricsTooLong?: boolean;
  lyricsTooLongLabel?: ReactNode;
  instrumentalLabel?: ReactNode;
  instrumentalHint?: ReactNode;
  instrumental: boolean;
  onInstrumentalChange: (value: boolean) => void;
  customHint?: ReactNode;
  /** quick prompt composer (quick mode) */
  promptLabel?: ReactNode;
  promptPlaceholder?: string;
  prompt: string;
  promptMaxLength?: number;
  onPromptChange: (value: string) => void;
  promptTooLong?: boolean;
  promptTooLongLabel?: ReactNode;
  promptHint?: ReactNode;
  /** credit wallet (hero) */
  balanceLabel?: ReactNode;
  balanceValue?: string;
  balanceUnit?: ReactNode;
  signedInBalanceLabel?: ReactNode;
  costChipLabel?: ReactNode;
  buyCreditsLabel?: ReactNode;
  buyCreditsHref?: string;
  signedIn?: boolean;
  checking?: boolean;
  mounted?: boolean;
  /** generate action */
  isGenerating: boolean;
  canGenerate?: boolean;
  generateLabel?: ReactNode;
  generatingLabel?: ReactNode;
  checkingLabel?: ReactNode;
  loadingLabel?: ReactNode;
  signInLabel?: ReactNode;
  onGenerate: () => void;
  creditsCostLabel?: ReactNode;
  creditsRemainingLabel?: ReactNode;
  /** progress rail */
  progressVisible?: boolean;
  progress?: number;
  progressLabel?: ReactNode;
  progressStatusLabel?: ReactNode;
  /** player / gallery */
  songs: MusicGeneratorStudioSong[];
  playerEmptyLabel?: ReactNode;
  playerReadyLabel?: ReactNode;
  playingId?: string | null;
  loadingId?: string | null;
  onTogglePlay: (song: MusicGeneratorStudioSong) => void;
  downloadLabel?: ReactNode;
  downloadingId?: string | null;
  onDownload: (song: MusicGeneratorStudioSong) => void;
  footerHint?: ReactNode;
}
