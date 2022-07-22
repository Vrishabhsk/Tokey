import { Text } from "@nextui-org/react";

export default function StrengthScore({ score, noimg }: { score: number; noimg?: boolean }) {
  const type = score < 2 ? "weak" : score < 4 ? "moderate" : "strong";
  const color = score < 2 ? "error" : score < 4 ? "warning" : "success";

  return (
    <>
      {noimg ? (
        <Text color={color}>{type} password</Text>
      ) : (
        <div className="flex" style={{ width: "fit-content" }}>
          <div className="flex-center">
            <img className="strength" alt="strength-img" src={`/media/${type}.png`} />
            <Text h6 color={color}>
              {type} password
            </Text>
          </div>
        </div>
      )}
    </>
  );
}
