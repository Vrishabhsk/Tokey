import OtpInput from "react-otp-input";

export default function OtpField({
  value,
  setValue,
}: {
  value: string;
  setValue: React.SetStateAction<any>;
}) {
  return (
    <OtpInput
      onChange={(e: any) => setValue(e)}
      numInputs={6}
      value={value}
      isInputNum
      shouldAutoFocus
      focusStyle={{ borderBottom: "3px solid grey" }}
      inputStyle={{
        color: "#fff",
        background: "transparent",
        borderBottom: "3px solid #000",
        borderTop: "none",
        borderLeft: "none",
        borderRight: "none",
        padding: "0px 10px",
        fontSize: "1.5rem",
        textAlign: "center",
        width: "40px",
      }}
      separator={<span style={{ margin: "5px" }} />}
    />
  );
}
