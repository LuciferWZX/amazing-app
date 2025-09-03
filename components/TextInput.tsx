import { useThemeColor } from "@/hooks/useThemeColor";
import { ComponentProps } from "react";
import { TextInput } from "react-native";
interface MyTextInputProps extends ComponentProps<typeof TextInput> {
  placeholder: string;
}
const MyTextInput = (props: MyTextInputProps) => {
  const { ...restProps } = props;

  const textColor = useThemeColor({}, "text");

  return <TextInput style={{ color: textColor }} {...restProps} />;
};

export default MyTextInput;
