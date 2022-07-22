import { useEffect, useState } from "react";
import { Dropdown, Table, Text } from "@nextui-org/react";
import useRequest from "../../hooks/useRequest";
import Actions from "../../components/Actions";
import { ViewModal } from "./Modals";
import CreateOrUpdateModals from "./CreateOrUpdateModals";
import toast from "react-hot-toast";
import InitialView from "../../components/InitialView";
import Loader from "../../components/Loader";
import TableView from "../../components/TableView";

const Items = () => {
  //items that are selected via checkbox
  const [selected, setSelected] = useState<string[]>([]);
  //when selecting all the items, this value will be used
  const [all, setAll] = useState<string[]>([]);
  //modal bool
  const [open, setOpen] = useState(false);
  //modal bool
  const [modal, setModal] = useState(false);
  //modal values
  const [value, setValue] = useState<any>({
    info: {},
    type: "",
  });

  //fetching items of the user
  const { request, response, loading } = useRequest({
    method: "GET",
    url: "/api/user/everything",
  });

  //deleting items
  const { request: delReq, response: delRes, loading: delLoading } = useRequest(null);

  //fetching items of the user
  const fetchEverything = () => {
    request({
      method: "GET",
      url: "/api/user/everything",
    });
  };

  const DropdownComponent = ({ center }: { center?: boolean }) => {
    return (
      <Dropdown>
        <Dropdown.Button
          css={{ marginLeft: !center ? "auto" : "none", margin: center ? "10px auto" : "none" }}
        >
          Create Items
        </Dropdown.Button>
        <Dropdown.Menu
          onAction={(e) => {
            setValue({ info: null, type: e });
            setModal(true);
          }}
        >
          <Dropdown.Item key="card">Create Card</Dropdown.Item>
          <Dropdown.Item key="note">Create Note</Dropdown.Item>
          <Dropdown.Item key="pwd">Create Password</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  //viewing the content of the secure item
  const view = (val: any, type: string) => {
    setSelected([]);
    setValue({ info: val, type: type });
    setOpen(true);
  };

  const edit = (val: any, type: string) => {
    setSelected([]);
    setValue({ info: val, type: type });
    setModal(true);
  };

  //del individual items
  const del = (val: any, type: string) => {
    setSelected([]);
    setValue({ ...value, type: type });
    let itemsToDelete: any = {};
    if (type === "card") itemsToDelete.cards = val;
    if (type === "note") itemsToDelete.notes = val;
    if (type === "pwd") itemsToDelete.pwds = val;
    delReq({
      method: "DELETE",
      url: "/api/user/delEverything",
      data: itemsToDelete,
    });
  };

  useEffect(() => {
    if (delRes) {
      toast.success(delRes.message);
      fetchEverything();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delRes]);

  useEffect(() => {
    if (response) {
      const cardIds = response.cards.map((card: any) => card.uuid);
      const noteIds = response.notes.map((note: any) => note.uuid);
      const pwdIds = response.pwds.map((pwd: any) => pwd.uuid);
      setAll(() => {
        return [...cardIds, ...noteIds, ...pwdIds];
      });
    }
  }, [response]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : response?.cards.length === 0 &&
        response?.notes.length === 0 &&
        response?.pwds.length === 0 ? (
        <InitialView
          src="items"
          title="Create Items"
          des="Start creating items that are securely stored and can be accessed from anywhere!"
        >
          <DropdownComponent center />
        </InitialView>
      ) : (
        <TableView
          title="All Items"
          component={<DropdownComponent />}
          selected={selected}
          setSelected={setSelected}
          all={all}
          hide
        >
          {response?.cards?.map((card: any) => {
            return (
              <Table.Row key={card.uuid}>
                <Table.Cell>
                  <div className="cell">
                    <img alt="card" src="/media/credit.png" width={35} />
                    <div>
                      <Text h5>{card?.cardTitle}</Text>
                      <Text h6>{card?.cardNumber.replace(/\d{4}(?= \d{4})/g, "****")}</Text>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Actions
                    view={() => view(card, "card")}
                    edit={() => edit(card, "card")}
                    del={() => del([card], "card")}
                    loading={value.type === "card" && delLoading}
                  />
                </Table.Cell>
              </Table.Row>
            );
          })}
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
                    view={() => view(note, "note")}
                    edit={() => edit(note, "note")}
                    del={() => del([note], "note")}
                    loading={value.type === "note" && delLoading}
                  />
                </Table.Cell>
              </Table.Row>
            );
          })}
          {response?.pwds?.map((pwd: any) => {
            return (
              <Table.Row key={pwd.uuid}>
                <Table.Cell>
                  <div className="cell">
                    <img alt="card" src="/media/keys.png" width={35} />
                    <div>
                      <Text h5>{pwd?.credTitle}</Text>
                      <Text h6>{pwd.credId}</Text>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Actions
                    view={() => view(pwd, "pwd")}
                    edit={() => edit(pwd, "pwd")}
                    del={() => del([pwd], "pwd")}
                    loading={value.type === "pwd" && delLoading}
                  />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </TableView>
      )}
      {open && <ViewModal open={open} setOpen={setOpen} value={value.info} type={value.type} />}
      {modal && (
        <CreateOrUpdateModals
          open={modal}
          setOpen={setModal}
          value={value.info}
          type={value.type}
          fetch={fetchEverything}
        />
      )}
    </>
  );
};

export default Items;
