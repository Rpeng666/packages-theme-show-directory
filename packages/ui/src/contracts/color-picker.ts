/**
 * ColorPicker contract — pick a color, exposed as a hex string. semi → Semi
 * ColorPicker (onChange receives a ColorValue → normalized to hex), default →
 * native `<input type="color">`.
 */
export interface ColorPickerProps {
  /** controlled hex string, e.g. '#ff3355' */
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  disabled?: boolean
  /** show the alpha slider */
  showAlpha?: boolean
  className?: string
  id?: string
}
