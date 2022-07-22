import { Modal } from "@nextui-org/react";
import GeneratorContent from "../../components/GeneratorContent";

export default function GeneratePassword({
  open,
  setOpen,
  setPassword,
}: {
  open: boolean;
  setOpen?: any;
  setPassword?: any;
}) {
  return (
    <Modal open={open} width="500px" closeButton onClose={() => setOpen(false)}>
      <GeneratorContent Header={Modal.Header} Body={Modal.Body} setPassword={setPassword} />
    </Modal>
  );
}
