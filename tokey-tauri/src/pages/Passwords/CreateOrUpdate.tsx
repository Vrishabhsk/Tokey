import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ButtonField from "../../components/ButtonField";
import ButtonLoader from "../../components/ButtonLoader";
import Password from "../../components/Password";
import TextField from "../../components/TextField";
import useRequest from "../../hooks/useRequest";
import GeneratePassword from "./GeneratePassword";
import StrengthScore from "./StrengthScore";
import ItemActionModal from "../../components/ItemActionModal";
const zxcvbn = require("zxcvbn");

const CreateOrUpdatePwd = ({
  fetch,
  open,
  setOpen,
  pwd,
}: {
  fetch: () => void;
  open: boolean;
  setOpen: any;
  pwd: any;
}) => {
  //request hook
  const { request, response, loading } = useRequest(null);
  //bool for password gen modal
  const [passModal, setPassModal] = useState(false);
  //current card value
  const [value, setValue] = useState(
    pwd ?? {
      pwdTitle: "",
      pwdId: "",
      pwdPassword: "",
      pwdWebsite: null,
    }
  );

  const changes = (e: any) => {
    const { name, value } = e.target;
    setValue((prev: any) => {
      return {
        ...prev,
        [name]: value === "" ? null : value,
      };
    });
  };

  const handleAction = () => {
    if (value?.credId && value?.credTitle && value?.credPassword) {
      request({
        method: pwd ? "PUT" : "POST",
        url: `/api/pwd/${pwd ? "modify" : "publish"}`,
        data: {
          ...value,
        },
      });
    } else toast("Please Fill in all fields!");
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
    <ItemActionModal open={open} setOpen={setOpen} src="security">
      <TextField
        name="credTitle"
        label="Title *"
        placeholder="Enter Title of your password"
        value={value?.credTitle ?? ""}
        onChange={changes}
      />
      <TextField
        name="credId"
        label="Email or Username *"
        placeholder="enter your identification"
        value={value?.credId ?? ""}
        onChange={changes}
      />
      <Password
        name="credPassword"
        label="Password *"
        placeholder="Enter your password"
        value={value?.credPassword ?? ""}
        onChange={changes}
      />
      <div className="flex">
        <StrengthScore score={value?.credPassword ? zxcvbn(value?.credPassword).score : 0} />
        <ButtonField
          size="sm"
          css={{ width: "100px", marginLeft: "auto" }}
          onClick={() => setPassModal(true)}
        >
          Generate Password
        </ButtonField>
      </div>
      <TextField
        name="credWebsite"
        label="Website"
        placeholder="Website related to your password"
        value={value?.credWebsite ?? ""}
        onChange={changes}
      />
      <div className="btn-container">
        <ButtonField
          iconRight={loading ? <ButtonLoader /> : null}
          disabled={JSON.stringify(pwd) === JSON.stringify(value)}
          onClick={handleAction}
        >
          {pwd ? "Update" : "Create"}
        </ButtonField>
        <ButtonField onClick={() => setOpen(false)} color="error">
          Cancel
        </ButtonField>
      </div>
      {passModal && (
        <GeneratePassword
          open={passModal}
          setOpen={setPassModal}
          setPassword={(value: string) => {
            setValue((prev: any) => {
              return {
                ...prev,
                credPassword: value,
              };
            });
            setPassModal(false);
          }}
        />
      )}
    </ItemActionModal>
  );
};

export default CreateOrUpdatePwd;
