import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { FormControl } from "@/components/ui/form";
import { Option } from "@/dashboard/entities/types";

type Props = {
  placeholder: string;
  options: Option[];
  onValueChange: (value: string) => void;
  value: string;
};

export function AllSelect({
  placeholder,
  options,
  onValueChange,
  value,
}: Props) {
  return (
    <Select onValueChange={onValueChange} defaultValue={value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {options.length > 0 &&
          options.map((option) => (
            <SelectItem value={`${option.value}`} key={`${option.value}`}>
              {option.label}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}
