import React from "react"
import { saveAs } from 'file-saver';

import "./index.css"

import { makeData } from "./makeData"

import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable
} from "@tanstack/react-table"
import fs from "fs";

export default function MainTable() {
    const rerender = React.useReducer(() => ({}), {})[1]

    const [rowSelection, setRowSelection] = React.useState({})
    const [globalFilter, setGlobalFilter] = React.useState("")
    const [tableType, setTableType] = React.useState("")

    React.useEffect(() => {
        setTableType('players')
    }, [])

    const columns = React.useMemo(
        () => [
            {
                id: "select",
                header: ({ table }) => (
                    <IndeterminateCheckbox
                        {...{
                            checked: table.getIsAllRowsSelected(),
                            indeterminate: table.getIsSomeRowsSelected(),
                            onChange: table.getToggleAllRowsSelectedHandler()
                        }}
                    />
                ),
                cell: ({ row }) => (
                    <div className="px-1">
                        <IndeterminateCheckbox
                            {...{
                                checked: row.getIsSelected(),
                                disabled: !row.getCanSelect(),
                                indeterminate: row.getIsSomeSelected(),
                                onChange: row.getToggleSelectedHandler()
                            }}
                        />
                    </div>
                )
            },
            {
                header: "Players",
                footer: props => props.column.id,
                columns: [
                    {
                        accessorKey: "firstName",
                        cell: info => info.getValue(),
                        footer: props => props.column.id
                    },
                    {
                        accessorFn: row => row.lastName,
                        id: "lastName",
                        cell: info => info.getValue(),
                        header: () => <span>Last Name</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "team",
                        header: () => "Team",
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "position",
                        header: () => <span>Position</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "scoreQuarter1",
                        header: () => <span>Score Q1</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "scoreQuarter2",
                        header: () => <span>Score Q2</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "scoreQuarter3",
                        header: () => <span>Score Q3</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "scoreQuarter4",
                        header: () => <span>Score Q4</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "firstDownsByRushing",
                        header: () => <span>First Downs by Rushing</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "offensiveYards",
                        header: () => <span>Offensive Yards</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "passingYards",
                        header: () => <span>Passing Yards</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "rushingYards",
                        header: () => <span>Rushing Yards</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "passerRating",
                        header: () => <span>Passer Rating</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "thirdDownAttempts",
                        header: () => <span>Third Down Attempts</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "redZoneAttempts",
                        header: () => <span>Red Zone Attempts</span>,
                        footer: props => props.column.id
                    }
                    /*{
                        accessorKey: "status",
                        header: "Status",
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "progress",
                        header: "Profile Progress",
                        footer: props => props.column.id
                    }*/
                ]

                /* columns: [
                    {
                        accessorKey: "season",
                        cell: info => info.getValue(),
                        footer: props => props.column.id
                    },
                    {
                        accessorFn: row => row.lastName,
                        id: "seasonType",
                        cell: info => info.getValue(),
                        header: () => <span>Last Name</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "team",
                        header: () => "Age",
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "score",
                        header: () => <span>Visits</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "opponentScore",
                        header: "Status",
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "totalScore",
                        header: "Profile Progress",
                        footer: props => props.column.id
                    }
                ]
                */
            },

        ],
        [tableType]
    )

    const teamColumns = React.useMemo(
        () => [
            {
                id: "select",
                header: ({ table }) => (
                    <IndeterminateCheckbox
                        {...{
                            checked: table.getIsAllRowsSelected(),
                            indeterminate: table.getIsSomeRowsSelected(),
                            onChange: table.getToggleAllRowsSelectedHandler()
                        }}
                    />
                ),
                cell: ({ row }) => (
                    <div className="px-1">
                        <IndeterminateCheckbox
                            {...{
                                checked: row.getIsSelected(),
                                disabled: !row.getCanSelect(),
                                indeterminate: row.getIsSomeSelected(),
                                onChange: row.getToggleSelectedHandler()
                            }}
                        />
                    </div>
                )
            },
            {
                header: "Players",
                footer: props => props.column.id,
                columns: [
                    {
                        accessorKey: "firstName",
                        cell: info => info.getValue(),
                        footer: props => props.column.id
                    },
                    {
                        accessorFn: row => row.lastName,
                        id: "lastName",
                        cell: info => info.getValue(),
                        header: () => <span>Last Name</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "team",
                        header: () => "Team",
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "position",
                        header: () => <span>Position</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "scoreQuarter1",
                        header: () => <span>Score Q1</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "scoreQuarter2",
                        header: () => <span>Score Q2</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "scoreQuarter3",
                        header: () => <span>Score Q3</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "scoreQuarter4",
                        header: () => <span>Score Q4</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "firstDownsByRushing",
                        header: () => <span>First Downs by Rushing</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "offensiveYards",
                        header: () => <span>Offensive Yards</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "passingYards",
                        header: () => <span>Passing Yards</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "rushingYards",
                        header: () => <span>Rushing Yards</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "passerRating",
                        header: () => <span>Passer Rating</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "thirdDownAttempts",
                        header: () => <span>Third Down Attempts</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "redZoneAttempts",
                        header: () => <span>Red Zone Attempts</span>,
                        footer: props => props.column.id
                    }
                    /*{
                        accessorKey: "status",
                        header: "Status",
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "progress",
                        header: "Profile Progress",
                        footer: props => props.column.id
                    }*/
                ]

                /* columns: [
                    {
                        accessorKey: "season",
                        cell: info => info.getValue(),
                        footer: props => props.column.id
                    },
                    {
                        accessorFn: row => row.lastName,
                        id: "seasonType",
                        cell: info => info.getValue(),
                        header: () => <span>Last Name</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "team",
                        header: () => "Age",
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "score",
                        header: () => <span>Visits</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "opponentScore",
                        header: "Status",
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "totalScore",
                        header: "Profile Progress",
                        footer: props => props.column.id
                    }
                ]
                */
            },

        ],
        [tableType]
    )


    //Read data from file
    {/*
    const fs = require('fs');
    const rawData = fs.readFileSync('teams.json');
    const data2 = JSON.parse(rawData);

    //Remove _id field from each object in the array
    const formattedData = data2.map(obj => {
        delete obj._id;
        return obj;
    });*/
    }

    let data, setData;
    [data, setData] = React.useState(() => makeData(100000));

    //[data, setData] = React.useState(formattedData);

    const refreshData = () => setData(() => makeData(100000))
    
    const WriteToCSV = (data) => {
            // Just print it for debugging purposes
    console.info(
        "table.getSelectedFlatRows()",
        //data[1]['original']['age']
        //Object.keys(data[0]['original'])
        data.length
    )
    if(data.length === 0) {
        return;
    }
    const modifiedData = []
    const keys = Object.keys(data[0]['original'])
    if(keys[keys.length - 1] === 'subRows') {
        keys.pop()
    }
    modifiedData.push(keys)
    for(let i = 1; i <= data.length; i++) {
        modifiedData.push([])
        for(const x of keys) {
            modifiedData[i].push(data[i-1]['original'][x])
        }
    }

    let buttonType = 'players';

    // Tab-separated values (consistent with previous .tsv files)
    const csv = modifiedData.map(row => row.join(',')).join('\n');

    // Create a blob for the TSV string
    const blob = new Blob([csv], { type: 'text/tab-separated-values;charset=utf-8' });

    // Save the file
    saveAs(blob, 'selected_data.csv')
    }

    const table = useReactTable({
        data,
        columns,
        state: {
            rowSelection
        },
        enableRowSelection: true, //enable row selection for all rows
        // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: true
    })

    const changeToPlayerTable = () => {
        setTableType('players')
        console.log(tableType)
    }

    const changeToTeamTable = () => {
        setTableType('teams')
        console.log(tableType)
    }

    // Change
    React.useEffect(() => {

    })

    return (
        <div className="p-2" id={'table-buttons'}>
            {/*<div>
                <input
                    value={globalFilter ?? ""}
                    onChange={e => setGlobalFilter(e.target.value)}
                    className="p-2 font-lg shadow border border-block"
                    placeholder="Search all columns..."
                />
            </div>*/}
            <div id={"players-teams-select"}>
                <button className={"border rounded p-2 mb-2"} onClick={changeToPlayerTable} style={{margin: "0 auto"}}>Select From Players</button>
                <button className={"border rounded p-2 mb-2"} onClick={changeToTeamTable} style={{margin: "0 auto"}}>Select From Teams</button>
            </div>
            <div className="h-2" />
            <table>
                <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => {
                            return (
                                <th key={header.id} colSpan={header.colSpan}>
                                    {header.isPlaceholder ? null : (
                                        <>
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {header.column.getCanFilter() ? (
                                                <div>
                                                    <Filter column={header.column} table={table} />
                                                </div>
                                            ) : null}
                                        </>
                                    )}
                                </th>
                            )
                        })}
                    </tr>
                ))}
                </thead>
                <tbody>
                {table.getRowModel().rows.map(row => {
                    return (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => {
                                return (
                                    <td key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
                </tbody>
                <tfoot>
                <tr>
                    <td className="p-1">
                        <IndeterminateCheckbox
                            {...{
                                checked: table.getIsAllPageRowsSelected(),
                                indeterminate: table.getIsSomePageRowsSelected(),
                                onChange: table.getToggleAllPageRowsSelectedHandler()
                            }}
                        />
                    </td>
                    <td colSpan={20}>Page Rows ({table.getRowModel().rows.length})</td>
                </tr>
                </tfoot>
            </table>
            <div className="h-2" />
            <div className="flex items-center gap-2">
                <button
                    className="border rounded p-1"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    {"<<"}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {"<"}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {">"}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    {">>"}
                </button>
                <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
          </strong>
        </span>
                <span className="flex items-center gap-1">
          | Go to page:
          <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={e => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  table.setPageIndex(page)
              }}
              className="border p-1 rounded w-16"
          />
        </span>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={e => {
                        table.setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
            <br />
            <div>
                {Object.keys(rowSelection).length} of{" "}
                {table.getPreFilteredRowModel().rows.length} Total Rows Selected
            </div>
            <hr />
            <br />
            {/*<div>
                <button className="border rounded p-2 mb-2" onClick={() => rerender()}>
                    Force Rerender
                </button>
            </div>*/}
            <div>
                <button
                    className="border rounded p-2 mb-2"
                    onClick={() => refreshData()}
                >
                    Refresh Data
                </button>
            </div>
            <div>
                {/*<button
                    className="border rounded p-2 mb-2"
                    onClick={() => console.info("rowSelection", rowSelection)}
                >
                    Log `rowSelection` state
                </button>*/}
            </div>
            <div>
                <button
                    className="border rounded p-2 mb-2"
                    onClick={() =>
                            WriteToCSV(table.getSelectedRowModel().flatRows)
                    }
                >
                    Generate CSV From Selected Rows
                </button>
            </div>
        </div>
    )
}

function Filter({ column, table }) {
    const firstValue = table
        .getPreFilteredRowModel()
        .flatRows[0]?.getValue(column.id)

    return typeof firstValue === "number" ? (
        <div className="flex space-x-2">
            <input
                type="number"
                value={column.getFilterValue()?.[0] ?? ""}
                onChange={e => column.setFilterValue(old => [e.target.value, old?.[1]])}
                placeholder={`Min`}
                className="w-24 border shadow rounded"
            />
            <input
                type="number"
                value={column.getFilterValue()?.[1] ?? ""}
                onChange={e => column.setFilterValue(old => [old?.[0], e.target.value])}
                placeholder={`Max`}
                className="w-24 border shadow rounded"
            />
        </div>
    ) : (
        <input
            type="text"
            value={column.getFilterValue() ?? ""}
            onChange={e => column.setFilterValue(e.target.value)}
            placeholder={`Search...`}
            className="w-36 border shadow rounded"
        />
    )
}

function IndeterminateCheckbox({ indeterminate, className = "", ...rest }) {
    const ref = React.useRef(null)

    React.useEffect(() => {
        if (typeof indeterminate === "boolean") {
            ref.current.indeterminate = !rest.checked && indeterminate
        }
    }, [ref, indeterminate])

    return (
        <input
            type="checkbox"
            ref={ref}
            className={className + " cursor-pointer"}
            {...rest}
        />
    )
}
