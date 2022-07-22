import { Image, Modal } from "@nextui-org/react";

const ItemActionModal = ({
  children,
  open,
  setOpen,
  src,
}: {
  children: any;
  open: boolean;
  setOpen: any;
  src: string;
}) => {
  return (
    <Modal open={open} width="800px" closeButton onClose={() => setOpen(false)}>
      <Modal.Header css={{ display: "grid", gap: "10px" }}>
        <Image src={`/media/${src}.png`} width={50} />
      </Modal.Header>
      <Modal.Body css={{ width: "800px", margin: "auto", gap: "10px" }}>{children}</Modal.Body>
    </Modal>
  );
};

export default ItemActionModal;
