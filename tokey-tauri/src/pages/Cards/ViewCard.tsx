import { Card, Image, Text } from "@nextui-org/react";

const ViewCard = ({ card }: any) => {
  const rows = [
    "Card Holder",
    "Card Number",
    "Expiration Date",
    "CVV",
    "PIN",
    "Postal Code",
  ];

  return (
    <Card variant="bordered" css={{ padding: "40px" }}>
      <Image src="/media/cash.png" width={50} />
      <Card.Header css={{ display: "flex", justifyContent: "center" }}>
        <Text css={{ marginBottom: "10px" }} h2>
          {card?.cardTitle}
        </Text>
      </Card.Header>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          textAlign: "left",
          paddingBottom: "40px",
          justifyContent: "center",
        }}
      >
        <div>
          {rows.map((row: string) => {
            return <Text>{row}</Text>;
          })}
        </div>
        <div style={{ marginLeft: "20px" }}>
          <Text>{card?.cardHolder}</Text>
          <Text>{card?.cardNumber}</Text>
          <Text>{card?.cardExp ?? "Empty"}</Text>
          <Text>{card?.cardCvv ?? "Empty"}</Text>
          <Text>{card?.cardPin ?? "Empty"}</Text>
          <Text>{card?.cardPc ?? "Empty"}</Text>
        </div>
      </div>
    </Card>
  );
};

export default ViewCard;
