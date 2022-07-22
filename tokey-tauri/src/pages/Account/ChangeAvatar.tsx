import { Divider, Grid, Modal, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ButtonField from "../../components/ButtonField";
import ButtonLoader from "../../components/ButtonLoader";
import useRequest from "../../hooks/useRequest";

export default function ChangeAvatar({
  open,
  setOpen,
  fetch,
  current,
}: {
  open: boolean;
  setOpen: any;
  fetch: () => void;
  current: any;
}) {
  //select avatar
  const [selected, setSelected] = useState(current);
  //change avatar
  const { request, response, loading } = useRequest(null);
  //names
  const avatarNames = [
    "Default",
    "Ebenezer",
    "Hector",
    "Truman",
    "Kingsley",
    "Spike",
    "Sheila",
    "Zera",
    "Holly",
    "Regina",
    "Kirsten",
  ];

  //request to change avatar
  const handleChangeAvatar = () => {
    request({
      method: "POST",
      url: "/api/user/change-avatar",
      data: {
        avatar: selected,
      },
    });
  };

  useEffect(() => {
    if (response) {
      toast.success(response.message);
      fetch();
      setOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  return (
    <Modal open={open} width="800px" closeButton onClose={() => setOpen(false)}>
      <Modal.Header>
        <Text h3>Change Avatar</Text>
      </Modal.Header>
      <Divider />
      <Modal.Body>
        <Grid.Container>
          {Array(11)
            .fill(0)
            .map((_, index) => {
              return (
                <Grid key={index} xs={2} css={{ margin: "15px 0px" }}>
                  <div style={{ textAlign: "center" }}>
                    <img
                      onClick={() => setSelected(`${index}.png`)}
                      alt="avatars"
                      className={`avatars actions ${selected === `${index}.png` && "border"}`}
                      src={`/avatars/${index}.png`}
                    />
                    <Text h6>{avatarNames[index]}</Text>
                  </div>
                  {selected === `${index}.png` && (
                    <img src="/media/check.png" alt="check" className="check" />
                  )}
                </Grid>
              );
            })}
        </Grid.Container>
        <Divider />
        <div style={{ marginTop: "10px", gap: "10px" }} className="flex">
          <ButtonField
            iconRight={loading ? <ButtonLoader /> : null}
            onClick={handleChangeAvatar}
            disabled={current === selected}
            css={{ width: "fit-content" }}
          >
            Update
          </ButtonField>
          <ButtonField color="error" css={{ width: "fit-content" }}>
            Cancel
          </ButtonField>
        </div>
      </Modal.Body>
    </Modal>
  );
}
