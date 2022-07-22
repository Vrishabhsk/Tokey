import { Text } from "@nextui-org/react";
import ButtonField from "./ButtonField";

export default function InitialView({
  src,
  title,
  des,
  onClick,
  buttonText,
  children,
}: {
  src: string;
  title: string;
  des: string;
  onClick?: () => void;
  buttonText?: string;
  children?: any;
}) {
  return (
    <div className="container">
      <div style={{ textAlign: "center" }}>
        <img alt="empty" src={`/media/${src}.png`} width={100} />
        <Text h3>{title}</Text>
        <Text css={{ width: "60%", margin: "auto", color: "Grey" }} h6>
          {des}
        </Text>
        {onClick && (
          <ButtonField onClick={onClick} css={{ margin: "10px auto" }}>
            {buttonText}
          </ButtonField>
        )}
        {children}
      </div>
    </div>
  );
}
