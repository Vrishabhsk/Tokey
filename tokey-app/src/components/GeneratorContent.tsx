import { Avatar, Divider, Switch, Text } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { generator } from "../utils/Generator";
import Slider from "@mui/material/Slider";
import ButtonField from "./ButtonField";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import toast from "react-hot-toast";

export default function GeneratorContent({ Header, Body, setPassword }: any) {
  const [current, setCurrent] = useState("");
  const [config, setConfig] = useState({
    length: 10,
    uppercase: true,
    numbers: true,
    symbols: true,
  });

  const updateConfig = (name: string, val: any) => {
    setConfig((prev: any) => {
      return {
        ...prev,
        [name]: val,
      };
    });
  };

  useEffect(() => {
    setCurrent(generator(config));
  }, [config]);

  return (
    <>
      <Header>
        <Text h1={!setPassword} h3={setPassword}>Generate Password</Text>
      </Header>
      {setPassword && <Divider />}
      <Body css={{ width: "100%", gap: "10px" }}>
        <div className={`flex-center ${!setPassword && "pwd-padding"}`}>
          <Text
            css={{
              margin: "10px 0px",
              width: "95%",
              wordWrap: "break-word",
              textAlign: "left",
            }}
            h5
          >
            {current}
          </Text>
          <Avatar
            className="actions"
            css={{ marginLeft: "auto" }}
            onClick={() => {
              navigator.clipboard.writeText(current);
              toast.success("Copied to Clipboard!");
            }}
            icon={<ContentCopyIcon />}
          />
        </div>
        {!setPassword && <Divider />}
        <div className={`flex-center ${!setPassword && "pwd-padding"}`}>
          <label>Choose Length</label>
          <Slider
            style={{
              width: "70%",
              marginLeft: "auto",
              marginRight: !setPassword ? "10px" : "none",
            }}
            max={60}
            min={6}
            valueLabelDisplay="auto"
            defaultValue={10}
            onChangeCommitted={(e, val: any) => updateConfig("length", val)}
          />
        </div>
        {!setPassword && <Divider />}
        <div className={`flex ${!setPassword && "pwd-padding"}`}>
          <label>Use Uppercase letter</label>
          <Switch
            color="success"
            css={{ marginLeft: "auto" }}
            onChange={(e: any) => updateConfig("uppercase", e.target.checked)}
            checked={config.uppercase}
          />
        </div>
        {!setPassword && <Divider />}
        <div className={`flex ${!setPassword && "pwd-padding"}`}>
          <label>Use Digits</label>
          <Switch
            color="success"
            onChange={(e: any) => updateConfig("numbers", e.target.checked)}
            css={{ marginLeft: "auto" }}
            checked={config.numbers}
          />
        </div>
        {!setPassword && <Divider />}
        <div className={`flex ${!setPassword && "pwd-padding"}`}>
          <label>Use Symbols</label>
          <Switch
            color="success"
            onChange={(e: any) => updateConfig("symbols", e.target.checked)}
            css={{ marginLeft: "auto" }}
            checked={config.symbols}
          />
        </div>
        {!setPassword && <Divider />}
        <div className="flex" style={{ gap: "20px", paddingBottom: "10px" }}>
          {setPassword && (
            <ButtonField onClick={() => setPassword(current)} size="sm">
              Select
            </ButtonField>
          )}
          <ButtonField
            css={{ marginTop: !setPassword && "10px" }}
            color="error"
            onClick={() => setCurrent(generator(config))}
            size="sm"
          >
            Regenerate
          </ButtonField>
        </div>
      </Body>
    </>
  );
}
