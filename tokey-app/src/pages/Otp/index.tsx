import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonField from "../../components/ButtonField";
import useRequest from "../../hooks/useRequest";
import { useCookies } from "react-cookie";
import OtpField from "../../components/OtpField";
import ButtonLoader from "../../components/ButtonLoader";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(120);
  const { request, loading, response } = useRequest(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const handleSubmitOtp = () => {
    request({
      method: "POST",
      url: "/api/auth/verify-otp",
      data: { email: localStorage.getItem("email"), otp: otp },
    });
  };

  useEffect(() => {
    if (response?.token) {
      setCookie("token", response?.token);
      localStorage.removeItem("email");
      navigate("/vault/items");
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
      <OtpField value={otp} setValue={setOtp} />
      <ButtonField
        color="error"
        disabled={otp.length < 6 || timer === 0}
        onClick={handleSubmitOtp}
        icon={
          loading
            ? `${Math.floor(timer / 60)}:${timer % 60 < 10 ? "0" : ""}${Math.ceil(timer % 60)}`
            : null
        }
        iconRight={loading ? <ButtonLoader /> : null}
        style={{ margin: "30px", width: "300px" }}
      >
        {timer === 0 ? "OTP Expired!" : "Submit OTP"}
      </ButtonField>
    </div>
  );
};

export default Otp;
