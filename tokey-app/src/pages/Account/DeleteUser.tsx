import { Text, Button, Grid, Row, Modal, Divider } from "@nextui-org/react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ButtonLoader from "../../components/ButtonLoader";
import useRequest from "../../hooks/useRequest";

export default function DeleteUser({ open, setOpen }: { open: boolean; setOpen: any }) {
  const { request, response, loading } = useRequest(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const handleUser = () => {
    request({
      method: "DELETE",
      url: "/api/user/exterminate",
    });
  };

  useEffect(() => {
    if (response) {
      removeCookie("token", { path: "/" });
      setOpen(false);
      toast.success(response.message);
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      width="425px"
      closeButton
      css={{ borderRadius: "14px", padding: "0.75rem" }}
    >
      <Modal.Header>
        <Text h4>Confirm</Text>
      </Modal.Header>
      <Row>
        <Text h5>
          Are you sure you want to delete your account? By doing this, you will not be able to
          recover the data.
        </Text>
      </Row>
      <Divider css={{ margin: "10px 0px" }} />
      <Grid.Container justify="space-between" alignContent="center">
        <Grid>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </Grid>
        <Grid>
          <Button onClick={handleUser} iconRight={loading ? <ButtonLoader /> : null} color="error">
            Delete
          </Button>
        </Grid>
      </Grid.Container>
    </Modal>
  );
}
