import { Table, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Actions from "../../components/Actions";
import useRequest from "../../hooks/useRequest";
import { ViewModal } from "../Items/Modals";
import CreateOrUpdateNote from "./CreateOrUpdate";
import InitialView from "../../components/InitialView";
import Loader from "../../components/Loader";
import TableView from "../../components/TableView";

const Notes = () => {
  //selected notes
  const [selected, setSelected] = useState<string[]>([]);
  //all the uuid
  const [all, setAll] = useState<string[]>([]);
  //bool for opening modal for viewing note
  const [open, setOpen] = useState(false);
  //bool for opening modal for editing or creating note
  const [modal, setModal] = useState(false);
  //note selected to edit or view
  const [note, setNote] = useState<any>();

  //fetching notes
  const { request, response, loading } = useRequest({
    method: "GET",
    url: "/api/note/relay",
  });

  //for delete query
  const { request: del, response: delRes, loading: delLoading } = useRequest(null);

  //refetching the notes
  const fetchNotes = () => {
    request({
      method: "GET",
      url: "/api/note/relay",
    });
  };

  //common functions
  const config = (type: string, note: any) => {
    setSelected([]);
    setNote(note);
    type === "view" ? setOpen(true) : type === "edit" ? setModal(true) : (type = "");
  };

  //request for deleting notes
  const deleteNotes = (notes: any) => {
    setSelected([]);
    del({
      method: "DELETE",
      url: "/api/note/remove",
      data: {
        notes,
      },
    });
  };

  //setting uuid of all the notes
  useEffect(() => {
    if (response) setAll(response.notes.map((note: any) => note.uuid));
  }, [response]);

  //on deleting a note refetch
  useEffect(() => {
    if (delRes) {
      toast.success(delRes.message);
      fetchNotes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delRes]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : response?.notes?.length === 0 ? (
        <InitialView
          src="secure_note"
          title="Create Secure Notes"
          des="Add any susceptive information in a safe and secure way"
          buttonText="Create Note"
          onClick={() => {
            setNote(null);
            setModal(true);
          }}
        />
      ) : (
        <TableView
          title="Secure Notes"
          actionText="Create Note"
          onClick={() => {
            setNote(null);
            setModal(true);
          }}
          selected={selected}
          setSelected={setSelected}
          all={all}
          deleteFn={() => {
            const notes = response.notes.filter((note: any) => selected.includes(note.uuid));
            deleteNotes(notes);
          }}
        >
          {response?.notes?.map((note: any) => {
            return (
              <Table.Row key={note.uuid}>
                <Table.Cell>
                  <div className="cell">
                    <img alt="card" src="/media/note.png" width={35} />
                    <div>
                      <Text h5>{note?.noteTitle}</Text>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Actions
                    view={() => config("view", note)}
                    edit={() => config("edit", note)}
                    del={() => deleteNotes([note])}
                    loading={delLoading}
                  />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </TableView>
      )}
      {open && <ViewModal open={open} setOpen={setOpen} value={note} type="note" />}
      {modal && (
        <CreateOrUpdateNote fetch={fetchNotes} open={modal} setOpen={setModal} note={note} />
      )}
    </>
  );
};

export default Notes;
