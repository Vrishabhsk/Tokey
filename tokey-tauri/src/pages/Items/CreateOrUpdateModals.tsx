import CreateOrUpdateCard from "../Cards/CreateOrUpdate";
import CreateOrUpdateNote from "../Notes/CreateOrUpdate";
import CreateOrUpdatePwd from "../Passwords/CreateOrUpdate";

export default function CreateOrUpdateModals({
  open,
  setOpen,
  value,
  type,
  fetch,
}: {
  open: boolean;
  setOpen: any;
  value: any;
  type: string;
  fetch: () => void;
}) {
  return (
    <>
      {type === "card" && (
        <CreateOrUpdateCard fetch={fetch} open={open} setOpen={setOpen} card={value} />
      )}
      {type === "note" && (
        <CreateOrUpdateNote fetch={fetch} open={open} setOpen={setOpen} note={value} />
      )}
      {type === "pwd" && (
        <CreateOrUpdatePwd fetch={fetch} open={open} setOpen={setOpen} pwd={value} />
      )}
    </>
  );
}
