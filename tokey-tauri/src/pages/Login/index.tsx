import { Avatar, Spacer, useInput } from "@nextui-org/react";
import TextField from "../../components/TextField";
import Password from "../../components/Password";
import ButtonField from "../../components/ButtonField";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import useRequest from "../../hooks/useRequest";
import ButtonLoader from "../../components/ButtonLoader";

const Login = () => {
  //navigate to dashboard
  const navigate = useNavigate();
  const { request, response, loading } = useRequest(null);
  //state for text fields
  const { value: text, bindings: textBind } = useInput("");
  const { value: pass, bindings: passBind } = useInput("");
  const [tokenParams, setTokenParam] = useSearchParams();
  const [cookie, setCookie] = useCookies(["token"]);

  useEffect(() => {
    //if token cookie is set, redirect to dashboard
    if (cookie?.token) return navigate("/vault/items");
    //when oauth is triggered
    if (tokenParams.get("token")) {
      setCookie("token", tokenParams.get("token"));
      tokenParams.delete("token");
      setTokenParam(tokenParams);
      return navigate("/vault/items");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //login by email handler
  const handleLogin = async () => {
    request({
      url: "/api/auth/login",
      method: "POST",
      data: { email: text, password: pass },
    });
  };

  useEffect(() => {
    if (response?.token) {
      setCookie("token", response.token);
      toast.success("Login Successful");
      navigate("/vault/items");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  return (
    <div className="container">
      <div>
        <h3 style={{ textAlign: "center" }}>Welcome to Tokey! Please Login to Continue</h3>
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
            LOGIN
          </ButtonField>
          <Spacer />
          <ButtonField
            icon={<Avatar bordered src="/media/google.png" size="sm" />}
            onClick={() => window.open(`${process.env.REACT_APP_GOOGLE_OAUTH}`, "_self")}
            className="oauth"
          >
            LOGIN WITH GOOGLE
          </ButtonField>
        </div>
        <Spacer />
        <div className="flex">
          <ButtonField size="sm" color="error" onClick={() => navigate("/register")}>
            New User?
          </ButtonField>
          <ButtonField
            size="sm"
            style={{ marginLeft: "auto" }}
            color="error"
            onClick={() => navigate("/reset")}
          >
            Forgot password?
          </ButtonField>
        </div>
      </div>
      <img src="/media/icon.png" alt="logo" className="img" />
    </div>
  );
};

export default Login;
