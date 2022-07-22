import Tip from "./Tip";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Loading } from "@nextui-org/react";

export default function Actions({
  view,
  edit,
  del,
  loading,
}: {
  view?: () => void;
  edit?: () => void;
  del?: () => void;
  loading?: boolean;
}) {
  return (
    <>
      <Tip text="View">
        <VisibilityIcon onClick={view} className="actions" style={{ marginRight: "20px" }} />
      </Tip>
      <Tip text="Edit">
        <EditIcon onClick={edit} className="actions" style={{ marginRight: "20px" }} />
      </Tip>
      <Tip text="Delete">
        {loading ? <Loading /> : <DeleteIcon onClick={del} className="actions" />}
      </Tip>
    </>
  );
}
