import type { ComponentType } from 'react'
import type { Section } from '../../types/landing'

export interface TestimonialsProps {
  section: Section
  className?: string
  /** 可选注入：图片渲染（default 用 LazyImage，pixel 用 PixelTestimonialCard 内置） */
  ImageComponent?: ComponentType<any>
}
