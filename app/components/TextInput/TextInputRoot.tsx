import { View, ViewProps } from "react-native"
import { cn } from "@/utils/cn"
import { ReactNode, isValidElement, useState, Children, cloneElement } from "react"
import { TextInputControl } from "./TextInputControl"

interface InputRootProps extends ViewProps {
  children: ReactNode
}

export const TextInputRoot = ({ children, ...props }: InputRootProps) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <View
      className={cn(
        "flex-row items-center gap-2 bg-[rgba(80,90,110,0.95)] rounded-xl px-4 py-3 h-14 border-2",
        isFocused ? "border-primary-500" : "border-primary-300",
        props.className,
      )}
      {...props}
    >
      {Children.map(children, (child) => {
        if (isValidElement(child) && child.type === TextInputControl) {
          return cloneElement(child, {
            onFocus: () => setIsFocused(true),
            onBlur: () => setIsFocused(false),
          })
        }
        return child
      })}
    </View>
  )
}
