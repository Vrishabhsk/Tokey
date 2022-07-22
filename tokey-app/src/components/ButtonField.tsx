import { Button } from "@nextui-org/react";

export default function ButtonField(props: any) {
  return (
    <Button color={props.color} onClick={props.onClick} {...props}>
      {props.children}
    </Button>
  );
}
