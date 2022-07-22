import { Card, Image, Text } from "@nextui-org/react";
import StrengthScore from "./StrengthScore";
const zxcvbn = require("zxcvbn");

const ViewPwd = ({ pwd }: any) => {
  const data = [
    {
      label: "Username",
      value: pwd?.credId,
      gap: 10,
    },
    {
      label: "Password",
      value: pwd?.credPassword,
      gap: 15,
    },
    {
      label: "Strength",
      value: <StrengthScore noimg score={zxcvbn(pwd?.credPassword).score} />,
      gap: 20,
    },
    {
      label: "Website",
      value: pwd?.credWebsite ?? "Empty",
      gap: 23,
    },
  ];

  return (
    <Card variant="bordered" css={{ padding: "40px" }}>
      <Image src="/media/security.png" width={60} />
      <Card.Header css={{ display: "flex", justifyContent: "center" }}>
        <Text css={{ marginBottom: "10px" }} h2>
          {pwd?.credTitle}
        </Text>
      </Card.Header>
      {data.map((item: any, index: number) => {
        return (
          <div className="flex" style={{ textAlign: "left", gap: item.gap }}>
            <Text>{item.label}</Text>
            <Text css={{ wordBreak: "break-word" }}>{item.value}</Text>
          </div>
        );
      })}
    </Card>
  );
};

export default ViewPwd;
