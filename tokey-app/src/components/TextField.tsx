import { Input } from "@nextui-org/react";

export const TextField = (props: any) => {
  return (
    <Input
      clearable
      bordered
      placeholder={props.placeholder}
      label={props.label}
      style={{borderColor: "red"}}
      {...props}
    />
  );
};

export default TextField;
