import { Avatar, Card, Divider, Switch, Text } from "@nextui-org/react";
import useRequest from "../../hooks/useRequest";
import Loader from "../../components/Loader";
import ButtonField from "../../components/ButtonField";
import { useEffect, useState } from "react";
import ChangeAvatar from "./ChangeAvatar";
import DeleteUser from "./DeleteUser";
import { useNavigate } from "react-router-dom";

const Account = ({ theme, setTheme, setRefetch }: any) => {
  //open avatar model
  const [open, setOpen] = useState(false);
  //delete modal
  const [del, setDel] = useState(false);
  const { request, response, loading } = useRequest({
    method: "GET",
    url: "/api/user/details",
  });
  const navigate = useNavigate();

  //when avatar is updated fetch details again
  useEffect(() => {
    setRefetch(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const fetchUserDetails = () => {
    request({
      method: "GET",
      url: "/api/user/details",
    });
    setRefetch(true);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="main-container">
          <div style={{ margin: "auto" }}>
            <Text h1>Settings</Text>
            <Text h3 css={{ margin: "20px 5px 0px" }}>
              Account
            </Text>
            <Card css={{ padding: "20px", marginTop: "5px" }}>
              <div className="flex-align">
                <Avatar
                  squared
                  bordered
                  color="gradient"
                  size="lg"
                  src={`/avatars/${response?.avatar}`}
                />
                <Text css={{ width: "fit-content" }} h5>
                  {response?.email}
                </Text>
                <ButtonField ghost onClick={() => setOpen(true)} css={{ marginLeft: "auto" }}>
                  Change Avatar
                </ButtonField>
              </div>
              <Divider css={{ margin: "20px 0px" }} />
              <div className="flex-align">
                <img alt="del" src="/media/delete.png" width={50} />
                <Text h5>Delete Account</Text>
                <ButtonField
                  onClick={() => setDel(true)}
                  css={{ marginLeft: "auto" }}
                  color="error"
                  ghost
                >
                  Delete
                </ButtonField>
              </div>
              <Divider css={{ margin: "20px 0px" }} />
              <div className="flex-align">
                <img alt="del" src="/media/reset.png" width={50} />
                <Text h5>Reset Password</Text>
                <ButtonField
                  onClick={() => navigate("/vault/reset")}
                  color="warning"
                  ghost
                  css={{ marginLeft: "auto" }}
                >
                  Reset Password
                </ButtonField>
              </div>
            </Card>
            <Text h3 css={{ margin: "20px 5px 0px" }}>
              Appearance
            </Text>
            <Card css={{ padding: "20px", marginTop: "5px" }}>
              <div className="flex">
                <Text>Dark Mode</Text>
                <Switch
                  css={{ marginLeft: "auto" }}
                  checked={theme === "dark"}
                  onChange={(e) => {
                    if (e.target.checked) {
                      localStorage.setItem("theme", "dark");
                      setTheme("dark");
                    } else {
                      localStorage.setItem("theme", "light");
                      setTheme("light");
                    }
                  }}
                />
              </div>
            </Card>
          </div>
        </div>
      )}
      {open && (
        <ChangeAvatar
          fetch={fetchUserDetails}
          open={open}
          setOpen={setOpen}
          current={response?.avatar}
        />
      )}
      {del && <DeleteUser open={del} setOpen={setDel} />}
    </>
  );
};

export default Account;
