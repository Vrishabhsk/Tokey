import { Spacer, useInput } from "@nextui-org/react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ButtonField from "../../components/ButtonField";
import ButtonLoader from "../../components/ButtonLoader";
import TextField from "../../components/TextField";
import useRequest from "../../hooks/useRequest";

const ResetPassword = () => {
  const { value, bindings } = useInput("");
  const { request, loading, response } = useRequest(null);
  const navigate = useNavigate();

  const handleReset = () => {
    request({
      method: "POST",
      url: "/api/reset/mail",
      data: { email: value },
    });
  };

  useEffect(() => {
    if (response?.user) {
      localStorage.setItem("email", response?.user);
      toast.success("Code sent to mail!");
      navigate("/code");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  return (
    <div className="container">
      <div>
        <h3>Enter email to reset password</h3>
        <label style={{ marginBottom: "20px", fontWeight: "200" }}>
          6 digit code will be sent to you
        </label>
        <Spacer />
        <TextField
          {...bindings}
          aria-label="email"
          style={{ width: "300px" }}
          placeholder="sample@email.com"
        />
        <Spacer />
        <ButtonField
          iconRight={loading ? <ButtonLoader /> : null}
          onClick={handleReset}
          disabled={!value}
          color="error"
        >
          Send Code
        </ButtonField>
      </div>
      <img src="/media/confused.png" alt="condused" />
    </div>
  );
};
export default ResetPassword;
