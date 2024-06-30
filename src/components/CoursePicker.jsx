import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

const CoursePicker = ({ data, setSelectedRows }) => {
  const columns = React.useMemo(
    () => [
      {
        field: "section",
        headerName: "Section",
        flex: 1,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "key",
        headerName: "Key",
        flex: 1,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "open_seats",
        headerName: "Open Seats",
        flex: 1,
        align: "center",
        headerAlign: "center",
      },
    ],
    []
  );
  return (
    <div className="tablecontainer">
      <>
        {data && (
          <>
            <div className="explain">
              Pick which sections you want to track:
            </div>
            <>
              {Object.keys(data).map((key) => {
                if (data[key].length > 0) {
                  return (
                    <Accordion key={key}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{key}</Typography>
                      </AccordionSummary>

                      <AccordionDetails style={{ height: "auto" }}>
                        <div style={{ height: "auto", width: "100%" }}>
                          <DataGrid
                            state={{
                              keyboard: {
                                cell: null,
                                columnHeader: null,
                                isMultipleKeyPressed: false,
                              },
                            }}
                            disableColumnMenu={true}
                            sx={{
                              width: "100%",
                              "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer":
                                {
                                  display: "none",
                                },
                            }}
                            rows={data[key]}
                            columns={columns}
                            checkboxSelection
                            getRowId={(row) => row.key}
                            isRowSelectable={(params) =>
                              params.row.open_seats < 1
                            }
                            headerSelection={false}
                            getCellClassName={(params) =>
                              params.row.open_seats > 0 ? "unselectable" : ""
                            }
                            sortModel={[
                              {
                                field: "section",
                                sort: "asc",
                              },
                            ]}
                            onRowSelectionModelChange={(newSelection) => {
                              const selectedRowsForKey = newSelection.map(
                                (rowId) => {
                                  const rowData = data[key].find(
                                    (row) => row.key === rowId
                                  );
                                  return [key, rowData.section, rowData.key];
                                }
                              );
                              setSelectedRows((prevSelectedRows) => {
                                const updatedSelectedRows = {
                                  ...prevSelectedRows,
                                  [key]: selectedRowsForKey,
                                };
                                return updatedSelectedRows;
                              });
                            }}
                          />
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  );
                }
                return null;
              })}
            </>
          </>
        )}
      </>
    </div>
  );
};

export default CoursePicker;
