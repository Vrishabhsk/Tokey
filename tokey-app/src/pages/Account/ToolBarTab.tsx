import { Divider, Toolbar } from "@mui/material";
import { Avatar, Loading } from "@nextui-org/react";
import useRequest from "../../hooks/useRequest";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ToolBarTab = ({ refetch }: any) => {
  const { request, response, loading } = useRequest({
    method: "GET",
    url: "/api/user/details",
  });
  const navigate = useNavigate();

  const fetchUserDetails = () => {
    request({
      method: "GET",
      url: "/api/user/details",
    });
  };

  useEffect(() => {
    if (response) localStorage.setItem("email", response?.email);
  }, [response]);

  useEffect(() => {
    if (refetch) fetchUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch]);

  return (
    <>
      {loading ? (
        <Loading style={{ marginLeft: "100px" }} />
      ) : (
        <>
          <Toolbar
            style={{
              marginLeft: "10px",
              padding: "10px 0px 15px",
            }}
            disableGutters
          >
            <Avatar squared bordered color="gradient" src={`/avatars/${response?.avatar}`} />
            <h6 className="small" style={{ margin: "10px" }}>
              {response?.email}
            </h6>
            <Avatar
              onClick={() => navigate("/vault/settings")}
              className="actions"
              squared
              bordered
              size="sm"
              style={{ margin: "0px 15px 0px auto" }}
              icon={<SettingsIcon />}
            />
          </Toolbar>
          <Divider />
        </>
      )}
    </>
  );
};

export default ToolBarTab;
