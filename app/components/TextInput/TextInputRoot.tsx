import { Children, cloneElement, isValidElement, ReactNode, useState } from "react"
import { View, ViewProps } from "react-native"
import { cn } from "@/utils/cn"

interface InputRootProps extends ViewProps {
  children: ReactNode
  hasError?: boolean
}

export const TextInputRoot = ({ children, hasError, className, ...props }: InputRootProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false)

  const borderColor = hasError
    ? "border-red-500"
    : isFocused
      ? "border-primary-500"
      : "border-neutral-500"

  return (
    <View
      className={cn(
        `flex-row items-center gap-2 h-14 rounded-xl border bg-neutral-200 px-4 ${borderColor}`,
        className,
      )}
      {...props}
    >
      {Children.map(children, (child) =>
        isValidElement(child)
          ? cloneElement(child, {
              onFocus: (...args: any) => {
                child.props.onFocus?.(...args)
                setIsFocused(true)
              },
              onBlur: (...args: any) => {
                child.props.onBlur?.(...args)
                setIsFocused(false)
              },
              ...(child.type?.name === 'TextInputIcon' ? { hasError } : {}),
            })
          : child,
      )}
    </View>
  )
}
