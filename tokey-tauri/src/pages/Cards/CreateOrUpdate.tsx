import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ButtonField from "../../components/ButtonField";
import ButtonLoader from "../../components/ButtonLoader";
import Password from "../../components/Password";
import TextField from "../../components/TextField";
import useRequest from "../../hooks/useRequest";
import ItemActionModal from "../../components/ItemActionModal";

const CreateOrUpdateCard = ({
  fetch,
  open,
  setOpen,
  card,
}: {
  fetch: () => void;
  open: boolean;
  setOpen: any;
  card: any;
}) => {
  //request hook
  const { request, response, loading } = useRequest(null);
  //current card value
  const [value, setValue] = useState(
    card ?? {
      cardTitle: "",
      cardHolder: "",
      cardNumber: "",
      cardExp: null,
      cardCvv: null,
      cardPin: null,
      cardPc: null,
    }
  );

  const changes = (e: any) => {
    const { name, value } = e.target;
    setValue((prev: any) => {
      return {
        ...prev,
        [name]:
          value === ""
            ? null
            : name === "cardNumber"
            ? value
                .replace(/[^\dA-Z]/g, "")
                .replace(/(.{4})/g, "$1 ")
                .trim()
            : name === "cardExp"
            ? value.length === 3 && !value.includes("/")
              ? value.substr(0, 2) + "/" + value.substr(2)
              : value
            : value,
      };
    });
  };

  const handleAction = () => {
    if (value?.cardHolder && value?.cardNumber && value?.cardTitle) {
      request({
        method: card ? "PUT" : "POST",
        url: `/api/card/${card ? "modify" : "publish"}`,
        data: {
          ...value,
        },
      });
    } else toast("Card Holder and Number are required!");
  };

  useEffect(() => {
    if (response?.message) {
      toast.success(response.message);
      fetch();
      setOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  return (
    <ItemActionModal open={open} setOpen={setOpen} src="cash">
      <TextField
        name="cardTitle"
        label="Title *"
        placeholder="Enter Title of your Card"
        value={value?.cardTitle ?? ""}
        onChange={changes}
      />
      <TextField
        name="cardHolder"
        label="Card Holder *"
        placeholder="Owner of the card"
        value={value?.cardHolder ?? ""}
        onChange={changes}
      />
      <TextField
        name="cardNumber"
        label="Card Number *"
        placeholder="Number on your card"
        value={value?.cardNumber ?? ""}
        onChange={changes}
        maxLength={19}
      />
      <div className="card-flex">
        <TextField
          name="cardExp"
          label="Expiry Date"
          placeholder="MM/YY"
          value={value?.cardExp ?? ""}
          onChange={changes}
          className="card-fields"
          maxLength={5}
        />
        <Password
          type="number"
          name="cardCvv"
          label="CVV"
          placeholder="Enter CVV code"
          value={value?.cardCvv ?? ""}
          onChange={changes}
          className="card-fields"
          maxLength={3}
        />
      </div>
      <div className="card-flex">
        <Password
          type="number"
          name="cardPin"
          label="PIN"
          placeholder="Enter card pin"
          value={value?.cardPin ?? ""}
          onChange={changes}
          className="card-fields"
        />
        <TextField
          name="cardPc"
          maxLength={10}
          label="Postal Code"
          placeholder="Zip or Postal Code"
          value={value?.cardPc ?? ""}
          onChange={changes}
          className="card-fields"
        />
      </div>
      <div className="btn-container">
        <ButtonField
          disabled={JSON.stringify(card) === JSON.stringify(value)}
          iconRight={loading ? <ButtonLoader /> : null}
          onClick={handleAction}
        >
          {card ? "Update" : "Create"}
        </ButtonField>
        <ButtonField onClick={() => setOpen(false)} color="error">
          Cancel
        </ButtonField>
      </div>
    </ItemActionModal>
  );
};

export default CreateOrUpdateCard;
