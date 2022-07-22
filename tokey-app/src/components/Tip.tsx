import { Tooltip } from "@nextui-org/react";

export default function Tip({ children, text }: { children: any; text: string }) {
  return (
    <Tooltip color="invert" content={text}>
      {children}
    </Tooltip>
  );
}
