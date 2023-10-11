import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Props {
    title: string
    placeholder: string
    options: any[]
    setter: (value: any) => void
}

const SelectDropdown: React.FC<Props> = ({ title, placeholder, options, setter }) => {
  return (
    <Select onValueChange={(value) => setter(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="text-black bg-white">
        <SelectGroup>
          <SelectLabel>{title}</SelectLabel>
          {options.map(
            (option) => <SelectItem key={option.id} value={option.id}>{option.name}</SelectItem>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
export default SelectDropdown