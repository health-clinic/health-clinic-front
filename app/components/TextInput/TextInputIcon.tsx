import { ElementType } from "react"

interface InputIconProps {
  icon: ElementType
}

export const TextInputIcon = ({ icon: Icon }: InputIconProps) => {
  return <Icon className="text-primary-300" />
}
