import { Spacer, useInput } from "@nextui-org/react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ButtonField from "../../components/ButtonField";
import ButtonLoader from "../../components/ButtonLoader";
import Password from "../../components/Password";
import useRequest from "../../hooks/useRequest";

const Reset = ({ from }: { from: string }) => {
  const { bindings, value } = useInput("");
  const { bindings: repeat, value: repeatPass } = useInput("");
  const { request, response, loading } = useRequest(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, __, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const handlePassword = () => {
    if (value !== repeatPass) return toast.error("Passwords do not match");
    request({
      method: "POST",
      url: "/api/reset/password",
      data: { email: localStorage.getItem("email"), newPass: value },
    });
  };

  useEffect(() => {
    if (response?.message) {
      toast.success(response.message);
      if (from === "forgot") {
        removeCookie("token", { path: "/" });
        navigate("/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  useEffect(() => {
    const removeToken = (e: any) => {
      e.preventDefault();
      removeCookie("token", { path: "/" });
    };
    window.addEventListener("beforeunload", removeToken);
    return () => {
      window.removeEventListener("beforeunload", removeToken);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <div>
        <h3>Create a new Secure Password!</h3>
        <Spacer />
        <div style={{ display: "grid" }}>
          <Password {...bindings} label="New Password" placeholder="Exw1aR$zc" />
          <Spacer />
          <Password {...repeat} label="Repeat Password" placeholder="Exw1aR$zc" />
        </div>
        <Spacer />
        <ButtonField
          color="error"
          iconRight={loading ? <ButtonLoader /> : null}
          disabled={!value || !repeatPass}
          onClick={handlePassword}
        >
          Change Password
        </ButtonField>
      </div>
      <img src="/media/secure.png" alt="secure" />
    </div>
  );
};

export default Reset;
