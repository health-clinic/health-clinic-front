import { useState } from "react"
import { View } from "react-native"
import DropDownPicker from "react-native-dropdown-picker"
// @ts-ignore
import tailwind from "../../../tailwind.config"

interface DropdownItem {
  label: string
  value: string
}

interface TextInputDropdownControlProps {
  value?: string | null
  onValueChange?: (value: string) => void
  items: DropdownItem[]
  placeholder?: string
  hasError?: boolean
}

export const TextInputDropdownControl = ({
  value,
  onValueChange,
  items,
  placeholder = "Selecione uma opção",
  hasError = false,
}: TextInputDropdownControlProps) => {
  const [open, setOpen] = useState(false)
  const [dropdownItems, setDropdownItems] = useState(items)
  const colors = tailwind.theme.extend.colors

  return (
    <View style={{ zIndex: open ? 1000 : 1 }}>
      <DropDownPicker
        open={open}
        value={value || null}
        items={dropdownItems}
        setOpen={setOpen}
        setValue={(callback: any) => {
          const newValue = typeof callback === "function" ? callback(value || null) : callback
          onValueChange?.(newValue)
        }}
        setItems={setDropdownItems}
        placeholder={placeholder}
        style={{
          backgroundColor: "transparent",
          borderWidth: 0,
          borderRadius: 0,
          minHeight: "auto",
          height: "auto",
          paddingLeft: 0,
          paddingRight: 30,
          flex: 1,
          fontSize: 18,
        }}
        containerStyle={{
          flex: 1,
        }}
        textStyle={{
          fontSize: 18,
          color: colors.neutral[900],
          fontWeight: "500",
          fontFamily: "InterMedium",
        }}
        placeholderStyle={{
          fontSize: 18,
          color: colors.neutral[500],
          fontFamily: "InterMedium",
        }}
        dropDownContainerStyle={{
          backgroundColor: colors.neutral[200],
          borderColor: colors.neutral[400],
          borderWidth: 1,
          borderRadius: 12,
          flex: 1,
          marginTop: 4,
          marginLeft: -26,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.25,
          shadowRadius: 20,
          elevation: 12,
          zIndex: 1000,
        }}
        listItemContainerStyle={{
          paddingHorizontal: 20,
          borderBottomWidth: 0.5,
          borderBottomColor: colors.neutral[300],
        }}
        listItemLabelStyle={{
          fontSize: 16,
          fontWeight: "500",
          color: colors.neutral[900],
          fontFamily: "InterMedium",
        }}
        selectedItemLabelStyle={{
          color: colors.neutral[900],
          fontWeight: "600",
          fontFamily: "InterMedium",
        }}
        selectedItemContainerStyle={{
          backgroundColor: colors.primary[500],
        }}
        tickIconStyle={{
          width: 20,
          height: 20,
          tintColor: colors.neutral[900],
        }}
        arrowIconStyle={{
          width: 20,
          height: 20,
          tintColor: colors.neutral[600],
        }}
        closeIconStyle={{
          width: 20,
          height: 20,
          tintColor: colors.neutral[600],
        }}
        listMode="SCROLLVIEW"
        itemSeparator={true}
        itemSeparatorStyle={{
          backgroundColor: colors.neutral[300],
          marginHorizontal: 20,
        }}
        showArrowIcon={true}
        showTickIcon={true}
        dropDownDirection="BOTTOM"
      />
    </View>
  )
}
