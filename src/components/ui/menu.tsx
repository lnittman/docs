'use client'

// Base UI primitive menu - unstyled, accessible foundation
import * as React from 'react'
import { Menu as BaseMenu } from '@base-ui-components/react/menu'
import { cn } from '@/lib/utils'

export const Menu = BaseMenu

export const MenuRoot = BaseMenu.Root
export const MenuPortal = BaseMenu.Portal

export interface MenuTriggerProps extends BaseMenu.Trigger.Props {
  className?: string
}
export const MenuTrigger = React.forwardRef<HTMLButtonElement, MenuTriggerProps>(
  ({ className, ...props }, ref) => (
    <BaseMenu.Trigger ref={ref} className={cn(className)} {...props} />
  )
)
MenuTrigger.displayName = 'MenuTrigger'

export interface MenuBackdropProps extends BaseMenu.Backdrop.Props {
  className?: string
}
export const MenuBackdrop = React.forwardRef<HTMLDivElement, MenuBackdropProps>(
  ({ className, ...props }, ref) => (
    <BaseMenu.Backdrop ref={ref} className={cn(className)} {...props} />
  )
)
MenuBackdrop.displayName = 'MenuBackdrop'

export interface MenuPositionerProps extends BaseMenu.Positioner.Props {
  className?: string
}
export const MenuPositioner = React.forwardRef<HTMLDivElement, MenuPositionerProps>(
  ({ className, ...props }, ref) => (
    <BaseMenu.Positioner ref={ref} className={cn(className)} {...props} />
  )
)
MenuPositioner.displayName = 'MenuPositioner'

export interface MenuPopupProps extends BaseMenu.Popup.Props {
  className?: string
}
export const MenuPopup = React.forwardRef<HTMLDivElement, MenuPopupProps>(
  ({ className, ...props }, ref) => (
    <BaseMenu.Popup ref={ref} className={cn(className)} {...props} />
  )
)
MenuPopup.displayName = 'MenuPopup'

export interface MenuItemProps extends BaseMenu.Item.Props {
  className?: string
}
export const MenuItem = React.forwardRef<HTMLDivElement, MenuItemProps>(
  ({ className, ...props }, ref) => (
    <BaseMenu.Item ref={ref} className={cn(className)} {...props} />
  )
)
MenuItem.displayName = 'MenuItem'

export interface MenuSeparatorProps extends BaseMenu.Separator.Props {
  className?: string
}
export const MenuSeparator = React.forwardRef<HTMLDivElement, MenuSeparatorProps>(
  ({ className, ...props }, ref) => (
    <BaseMenu.Separator ref={ref} className={cn(className)} {...props} />
  )
)
MenuSeparator.displayName = 'MenuSeparator'