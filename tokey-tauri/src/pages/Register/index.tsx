import { Avatar, Spacer, useInput } from "@nextui-org/react";
import TextField from "../../components/TextField";
import Password from "../../components/Password";
import ButtonField from "../../components/ButtonField";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import useRequest from "../../hooks/useRequest";
import toast from "react-hot-toast";
import ButtonLoader from "../../components/ButtonLoader";

const Register = () => {
  //navigate to dashboard
  const navigate = useNavigate();
  const { request, response, loading } = useRequest(null);
  //state for text fields
  const { value: text, bindings: textBind } = useInput("");
  const { value: pass, bindings: passBind } = useInput("");
  const [cookie] = useCookies(["token"]);

  useEffect(() => {
    //if token cookie is set, redirect to dashboard
    if (cookie?.token) return navigate("/vault/items");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //login by email handler
  const handleLogin = async () => {
    request({
      url: "/api/auth/register",
      method: "POST",
      data: { email: text, password: pass },
    });
  };

  useEffect(() => {
    if (response?.user) {
      localStorage.setItem("email", response?.user);
      toast.success("OTP sent to mail!");
      navigate("/otp");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  return (
    <div className="container">
      <div>
        <h3 style={{ textAlign: "center" }}>First Time? Register and Enjoy our Services!</h3>
        <Spacer />
        <div className="flex">
          <TextField {...textBind} label="Email" placeholder="sample@email.com" />
          <Spacer />
          <Password {...passBind} label="Password" placeholder="Exw1aR$zc" />
        </div>

        <Spacer />
        <div>
          <ButtonField
            style={{ width: "100%" }}
            disabled={!text || !pass}
            onClick={handleLogin}
            iconRight={loading ? <ButtonLoader /> : null}
          >
            REGISTER
          </ButtonField>
          <Spacer />
          <ButtonField
            icon={<Avatar bordered src="/media/google.png" size="sm" />}
            onClick={() => window.open(`${process.env.REACT_APP_GOOGLE_OAUTH}`, "_self")}
            className="oauth"
          >
            REGISTER WITH GOOGLE
          </ButtonField>
        </div>
        <Spacer />
        <ButtonField size="sm" color="error" onClick={() => navigate("/")}>
          Already have an account?
        </ButtonField>
      </div>
      <img src="/media/icon.png" alt="logo" className="img" />
    </div>
  );
};

export default Register;
