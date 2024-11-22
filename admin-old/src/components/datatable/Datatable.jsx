import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";

const Datatable = ({ row, column, setRowSelection }) => {
 
  
  return (
    <div className="datatable">
      <DataGrid
        className="datagrid"
         rows={row}
        columns={column}
        pageSize={20}
        rowsPerPageOptions={[10]}
        checkboxSelection
        onSelectionModelChange={itm => setRowSelection && setRowSelection(itm)}
      />
    </div>
  );
};

export default Datatable;
