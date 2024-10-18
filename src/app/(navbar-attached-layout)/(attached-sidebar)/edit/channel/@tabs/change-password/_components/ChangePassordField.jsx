import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const ChangePassordField = ({ item, form }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div key={item.name} className="relative w-full">
      <FormField
        control={form.control}
        name={item.name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[15px]">{item.label}</FormLabel>
            <FormControl>
              <Input
                {...field}
                type={showPassword ? "text" : "password"}
                id={item.name}
                placeholder={item.placeholder}
              />
            </FormControl>
            {field?.value && (
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer absolute top-[32px] right-3"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={19} />}
              </div>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ChangePassordField;
