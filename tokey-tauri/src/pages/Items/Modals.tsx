import { Modal } from "@nextui-org/react";
import ViewCard from "../Cards/ViewCard";
import ViewNote from "../Notes/ViewNote";
import ViewPwd from "../Passwords/ViewPwd";

const ViewModal = ({
  open,
  setOpen,
  value,
  type,
}: {
  open: boolean;
  setOpen: any;
  value: any;
  type: string;
}) => {
  return (
    <>
      {type === "note" ? (
        <ViewNote note={value} open={open} setOpen={setOpen} />
      ) : (
        <Modal width="700px" onClose={() => setOpen(false)} open={open}>
          {type === "card" && <ViewCard card={value} />}
          {type === "pwd" && <ViewPwd pwd={value} />}
        </Modal>
      )}
    </>
  );
};

export { ViewModal };
