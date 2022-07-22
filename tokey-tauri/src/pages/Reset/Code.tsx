import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonField from "../../components/ButtonField";
import useRequest from "../../hooks/useRequest";
import { useCookies } from "react-cookie";
import OtpField from "../../components/OtpField";
import ButtonLoader from "../../components/ButtonLoader";

const Code = () => {
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(120);
  const { request, loading, response } = useRequest(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const handleSubmitOtp = () => {
    request({
      method: "POST",
      url: "/api/reset/code",
      data: { email: localStorage.getItem("email"), code: code },
    });
  };

  useEffect(() => {
    if (response?.token) {
      setCookie("token", response?.token);
      navigate("/reset/password");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  useEffect(() => {
    const time: any =
      timer > 0 &&
      setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    return () => {
      clearInterval(time);
    };
  }, [timer]);

  return (
    <div className="otp-container">
      <h3 style={{ margin: "0px 20px" }}>Enter One Time Password to Verify your Account</h3>
      <label style={{ fontWeight: "200", marginBottom: "20px" }}>
        OTP has been sent to {localStorage.getItem("email")}
      </label>
      <OtpField value={code} setValue={setCode} />
      <ButtonField
        color="error"
        disabled={code.length < 6 || timer === 0}
        onClick={handleSubmitOtp}
        icon={`${Math.floor(timer / 60)}:${timer % 60 < 10 ? "0" : ""}${Math.ceil(timer % 60)}`}
        iconRight={loading ? <ButtonLoader /> : null}
        style={{ margin: "30px", width: "300px" }}
      >
        {timer === 0 ? "Code Expired!" : "Submit Code"}
      </ButtonField>
    </div>
  );
};

export default Code;
