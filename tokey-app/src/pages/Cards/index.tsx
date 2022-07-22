import { Table, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Actions from "../../components/Actions";
import InitialView from "../../components/InitialView";
import Loader from "../../components/Loader";
import TableView from "../../components/TableView";
import useRequest from "../../hooks/useRequest";
import { ViewModal } from "../Items/Modals";
import CreateOrUpdateCard from "./CreateOrUpdate";

const Cards = () => {
  //table selected values
  const [selected, setSelected] = useState<string[]>([]);
  //all the uuids of the cards
  const [all, setAll] = useState<string[]>([]);
  //bool for opening modal for viewing card
  const [open, setOpen] = useState(false);
  //bool for opening modal for editing or creating card
  const [modal, setModal] = useState(false);
  //card selected to edit or view
  const [card, setCard] = useState<any>({});

  const { request, response, loading } = useRequest({
    method: "GET",
    url: "/api/card/relay",
  });

  const { request: del, response: delRes, loading: delLoading } = useRequest(null);

  //fetcb all the cards
  const fetchCards = () => {
    request({
      method: "GET",
      url: "/api/card/relay",
    });
  };

  //delete cards
  const deleteCards = (cards: any) => {
    setSelected([]);
    del({
      method: "DELETE",
      url: "/api/card/remove",
      data: {
        cards,
      },
    });
  };

  //common functions
  const config = (type: string, card: any) => {
    setSelected([]);
    setCard(card);
    type === "view" ? setOpen(true) : type === "edit" ? setModal(true) : (type = "");
  };

  useEffect(() => {
    if (response) setAll(response.cards.map((card: any) => card.uuid));
  }, [response]);

  useEffect(() => {
    if (delRes) {
      toast.success(delRes.message);
      fetchCards();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delRes]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : response?.cards?.length === 0 ? (
        <InitialView
          src="card"
          title="Create Secure Cards"
          des="Add credit card details to safely store and use them when required!"
          buttonText="Create Card"
          onClick={() => {
            setCard(null);
            setModal(true);
          }}
        />
      ) : (
        <TableView
          title="Secure Cards"
          actionText="Create Card"
          onClick={() => {
            setCard(null);
            setModal(true);
          }}
          selected={selected}
          setSelected={setSelected}
          all={all}
          deleteFn={() => {
            const cards = response.cards.filter((card: any) => selected.includes(card.uuid));
            deleteCards(cards);
          }}
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
                    view={() => config("view", card)}
                    edit={() => config("edit", card)}
                    del={() => deleteCards([card])}
                    loading={delLoading}
                  />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </TableView>
      )}
      {open && <ViewModal open={open} setOpen={setOpen} value={card} type="card" />}
      {modal && (
        <CreateOrUpdateCard fetch={fetchCards} open={modal} setOpen={setModal} card={card} />
      )}
    </>
  );
};

export default Cards;
