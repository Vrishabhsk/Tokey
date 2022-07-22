import { Card, Table, Text } from "@nextui-org/react";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DataTable({
  selected,
  setSelected,
  children,
  all,
  deleteFn,
  hide,
}: {
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  children: any;
  all: string[];
  deleteFn?: () => void;
  hide?: boolean;
}) {
  return (
    <>
      <Table
        showSelectionCheckboxes={hide ? false : true}
        selectionMode="multiple"
        aria-label="Data Table"
        headerLined
        bordered
        selectedKeys={selected}
        onSelectionChange={(e: any) => {
          if (e === "all") return setSelected(all);
          return setSelected(Array.from(e));
        }}
      >
        <Table.Header>
          <Table.Column css={{ width: "100%", paddingLeft: "10px" }}>Title</Table.Column>
          <Table.Column align="center">Actions</Table.Column>
        </Table.Header>
        <Table.Body>{children}</Table.Body>
      </Table>
      {selected.length > 0 && (
        <Card
          css={{
            mw: "400px",
            position: "absolute",
            bottom: 40,
            left: "45%",
          }}
        >
          <Card.Body>
            <Text className="flex">
              {selected.length} items selected
              {!hide && (
                <DeleteIcon className="actions" onClick={deleteFn} style={{ marginLeft: "auto" }} />
              )}
            </Text>
          </Card.Body>
        </Card>
      )}
    </>
  );
}
