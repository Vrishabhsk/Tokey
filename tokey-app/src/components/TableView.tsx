import ButtonField from "./ButtonField";
import DataTable from "./DataTable";

const TableView = ({
  children,
  title,
  onClick,
  actionText,
  component,
  selected,
  setSelected,
  all,
  deleteFn,
  hide,
}: {
  children: any;
  title: string;
  onClick?: () => void;
  actionText?: string;
  component?: any;
  selected: string[];
  setSelected: any;
  all: string[];
  deleteFn?: () => void;
  hide?: boolean;
}) => {
  return (
    <div className="main-container">
      <div className="flex">
        <h2>{title}</h2>
        {component ? (
          component
        ) : (
          <ButtonField onClick={onClick} css={{ marginLeft: "auto" }}>
            {actionText}
          </ButtonField>
        )}
      </div>
      <DataTable hide={hide} selected={selected} setSelected={setSelected} all={all} deleteFn={deleteFn}>
        {children}
      </DataTable>
    </div>
  );
};

export default TableView;
