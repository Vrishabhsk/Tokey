import { Image, Modal, Text } from "@nextui-org/react";

const ViewNote = ({ note, open, setOpen }: any) => {
  return (
    <Modal
      scroll
      open={open}
      onClose={() => setOpen(false)}
      css={{ padding: "40px" }}
      width="700px"
    >
      <Modal.Header css={{ display: "grid", gap: "10px" }}>
        <Image src="/media/notepad.png" width={50} />
        <Text css={{ marginBottom: "10px" }} h2>
          {note?.noteTitle}
        </Text>
      </Modal.Header>
      <Modal.Body style={{ textAlign: "left" }}>
        <div style={{ marginLeft: "20px" }}>
          <Text css={{ whiteSpace: "pre-wrap" }}>{JSON.parse(note?.noteText)}</Text>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ViewNote;
