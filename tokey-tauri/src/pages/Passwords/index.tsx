import { Table, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Actions from "../../components/Actions";
import useRequest from "../../hooks/useRequest";
import { ViewModal } from "../Items/Modals";
import CreateOrUpdatePwd from "./CreateOrUpdate";
import InitialView from "../../components/InitialView";
import Loader from "../../components/Loader";
import TableView from "../../components/TableView";

const Pwds = () => {
  //table selected values
  const [selected, setSelected] = useState<string[]>([]);
  //all the uuids of the pwds
  const [all, setAll] = useState<string[]>([]);
  //bool for opening modal for viewing pwd
  const [open, setOpen] = useState(false);
  //bool for opening modal for editing or creating pwd
  const [modal, setModal] = useState(false);
  //pwd selected to edit or view
  const [pwd, setPwd] = useState<any>({});

  const { request, response, loading } = useRequest({
    method: "GET",
    url: "/api/pwd/relay",
  });

  const { request: del, response: delRes, loading: delLoading } = useRequest(null);

  //delete pwds
  const deletePwds = (pwds: any) => {
    setSelected([]);
    del({
      method: "DELETE",
      url: "/api/pwd/remove",
      data: {
        pwds,
      },
    });
  };

  const config = (type: string, pwd: any) => {
    setSelected([]);
    setPwd(pwd);
    type === "view" ? setOpen(true) : type === "edit" ? setModal(true) : (type = "");
  };

  const fetchPwds = () => {
    request({
      method: "GET",
      url: "/api/pwd/relay",
    });
  };

  useEffect(() => {
    if (delRes) {
      toast.success(delRes.message);
      fetchPwds();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delRes]);

  useEffect(() => {
    if (response) setAll(response.pwds.map((pwd: any) => pwd.uuid));
  }, [response]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : response?.pwds?.length === 0 ? (
        <InitialView
          src="pwd"
          title="Create Secure Passwords"
          des="Store your website and important credentials in a secure way"
          buttonText="Create Password"
          onClick={() => {
            setPwd(null);
            setModal(true);
          }}
        />
      ) : (
        <TableView
          title="Passwords"
          actionText="Create Password"
          onClick={() => {
            setPwd(null);
            setModal(true);
          }}
          selected={selected}
          setSelected={setSelected}
          all={all}
          deleteFn={() => {
            const pwds = response.pwds.filter((pwd: any) => selected.includes(pwd.uuid));
            deletePwds(pwds);
          }}
        >
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
                    view={() => config("view", pwd)}
                    edit={() => config("edit", pwd)}
                    del={() => deletePwds([pwd])}
                    loading={delLoading}
                  />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </TableView>
      )}
      {open && <ViewModal open={open} setOpen={setOpen} value={pwd} type="pwd" />}
      {modal && <CreateOrUpdatePwd open={modal} setOpen={setModal} pwd={pwd} fetch={fetchPwds} />}
    </>
  );
};

export default Pwds;
