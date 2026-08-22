import type { ComponentType } from 'react'
import type { Section } from '../../types/landing'

export interface LogosProps {
  section: Section
  className?: string
  /** 可选注入：logo 图片渲染；不提供时 fallback 原生 <img> */
  ImageComponent?: ComponentType<any>
}
