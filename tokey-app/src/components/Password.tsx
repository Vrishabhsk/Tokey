import { Input } from "@nextui-org/react";

const Password = (props: any) => {
  return (
    <Input.Password
      clearable
      bordered
      placeholder={props.placeholder}
      label={props.label}
      {...props}
    />
  );
};

export default Password;
