import { Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ButtonField from "../../components/ButtonField";
import ButtonLoader from "../../components/ButtonLoader";
import ItemActionModal from "../../components/ItemActionModal";
import TextField from "../../components/TextField";
import useRequest from "../../hooks/useRequest";

const CreateOrUpdateNote = ({
  fetch,
  open,
  setOpen,
  note,
}: {
  fetch: () => void;
  open: boolean;
  setOpen: any;
  note: any;
}) => {
  //request hook
  const { request, response, loading } = useRequest(null);
  //current note value
  const [value, setValue] = useState({
    ...note,
    noteText: note?.noteText ? JSON.parse(note?.noteText) : "",
  });

  //for disabling the button
  const inital = {
    ...note,
    noteText: note?.noteText ? JSON.parse(note?.noteText) : "",
  };

  //rows of textarea
  const TextRows = 20;

  //handle input change
  const changes = (e: any) => {
    setValue((prev: any) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  //submit action
  const handleAction = () => {
    if (value?.noteTitle && value?.noteText) {
      request({
        method: note ? "PUT" : "POST",
        url: `/api/note/${note ? "modify" : "publish"}`,
        data: {
          ...value,
          noteText: JSON.stringify(value.noteText),
        },
      });
    } else toast("Please fill all the fields");
  };

  //on completing action
  useEffect(() => {
    if (response?.message) {
      toast.success(response.message);
      fetch();
      setOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  return (
    <ItemActionModal open={open} setOpen={setOpen} src="notepad">
      <TextField
        name="noteTitle"
        label="Title *"
        placeholder="Enter Title of your Note"
        value={value?.noteTitle ?? ""}
        onChange={changes}
      />
      <Textarea
        name="noteText"
        label="Content *"
        placeholder="Enter content for your Note"
        value={value?.noteText ?? ""}
        onChange={changes}
        minRows={TextRows}
        maxRows={TextRows}
        bordered
      />
      <div className="btn-container">
        <ButtonField
          iconRight={loading ? <ButtonLoader /> : null}
          disabled={JSON.stringify(inital) === JSON.stringify(value)}
          onClick={handleAction}
        >
          {note ? "Update" : "Create"}
        </ButtonField>
        <ButtonField onClick={() => setOpen(false)} color="error">
          Cancel
        </ButtonField>
      </div>
    </ItemActionModal>
  );
};

export default CreateOrUpdateNote;
