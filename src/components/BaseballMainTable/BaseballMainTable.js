import React from "react"
import { saveAs } from 'file-saver';

import "./index.css"

import { makePlayerData, makeTeamData } from "./makeBaseballData"

import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable
} from "@tanstack/react-table"
import fs from "fs";
export default function BaseballMainTable() {
    const rerender = React.useReducer(() => ({}), {})[1]

    const [rowSelection, setRowSelection] = React.useState({})
    const [globalFilter, setGlobalFilter] = React.useState("")

    const playerColumns = React.useMemo(
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
                        header: () => <span>First Name</span>,
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
                        accessorKey: "season",
                        header: () => <span>Season</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "assists",
                        header: () => <span>Assists</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "battingAverage",
                        header: () => <span>Batting Average</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "doubles",
                        header: () => <span>Doubles</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "earnedRuns",
                        header: () => <span>Earned Runs</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "earnedRunAverage",
                        header: () => <span>Earned Run Average</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "errors",
                        header: () => <span>Errors</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "hits",
                        header: () => <span>Hits</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "homeRuns",
                        header: () => <span>Home Runs</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "runs",
                        header: () => <span>Runs</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "runsBattedIn",
                        header: () => <span>Runs Batted In</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "singles",
                        header: () => <span>Singles</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "stolenBases",
                        header: () => <span>Stolen Bases</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "triples",
                        header: () => <span>Triples</span>,
                        footer: props => props.column.id
                    }
                ]
            },
        ],
        []
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
                header: "Teams",
                footer: props => props.column.id,
                columns: [
                    {
                        accessorKey: "team",
                        header: () => "Team",
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "season",
                        header: () => <span>Season</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "assists",
                        header: () => <span>Assists</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "doubles",
                        header: () => <span>Doubles</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "earnedRuns",
                        header: () => <span>Earned Runs</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "earnedRunAverage",
                        header: () => <span>Earned Run Average</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "errors",
                        header: () => <span>Errors</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "hits",
                        header: () => <span>Hits</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "homeRuns",
                        header: () => <span>Home Runs</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "runs",
                        header: () => <span>Runs</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "singles",
                        header: () => <span>Singles</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "stolenBases",
                        header: () => <span>Stolen Bases</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "strikeouts",
                        header: () => <span>Strikeouts</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "triples",
                        header: () => <span>Triples</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "walks",
                        header: () => <span>Walks</span>,
                        footer: props => props.column.id
                    }
                ]
            },
        ],
        []
    )

    let playerData, setPlayerData;
    [playerData, setPlayerData] = React.useState(() => makePlayerData(100000));
    let teamData, setTeamData;
    [teamData, setTeamData] = React.useState(() => makeTeamData(100000));

    // Currently these are not used, but they could be used to update the data
    const refreshPlayerData = () => setPlayerData(() => makePlayerData(100000))
    const refreshTeamData = () => setTeamData(() => makeTeamData(100000))
    
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
        console.log(data)
        const modifiedData = []
        const keys = Object.keys(data[0]['original'])
        if (keys[keys.length - 1] === 'subRows') {
            keys.pop()
        }
        modifiedData.push(keys)
        for(let i = 1; i <= data.length; i++) {
            modifiedData.push([])
            for(const x of keys) {
                modifiedData[i].push(data[i-1]['original'][x])
            }
        }
        // Tab-separated values (consistent with previous .tsv files)
        const csv = modifiedData.map(row => row.join(',')).join('\n');

        // Create a blob for the TSV string
        const blob = new Blob([csv], { type: 'text/tab-separated-values;charset=utf-8' });

        // Save the file
        saveAs(blob, 'selected_data.csv')
    }

    let playerTable = useReactTable({
        data: playerData,
        columns: playerColumns,
        state: {
            rowSelection
        },
        enableRowSelection: true, //enable row selection for all rows
        // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: true,
    });

    let teamTable = useReactTable({
        data: teamData,
        columns: teamColumns,
        state: {
            rowSelection
        },
        enableRowSelection: true, //enable row selection for all rows
        // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: true,
    });

    // Displays the player table and closes the teams table
    const displayPlayerTable = () => {
        document.getElementById('team-table').style.display = 'none';
        document.getElementById('player-table').style.display = 'block';
    }

    // Displays the teams table and closes the player table
    const displayTeamTable = () => {
        document.getElementById('player-table').style.display = 'none';
        document.getElementById('team-table').style.display = 'block';
    }

    return (
        <div className="p-2" id={"tables-container"}>
            <br />
            <div id={"players-teams-select"}>
                <button
                    className={"border rounded p-2 mb-2 table-btn"}
                    onClick={displayPlayerTable}
                >
                    Select From Players
                </button>
                <button
                    className={"border rounded p-2 mb-2 table-btn"}
                    onClick={displayTeamTable}
                >
                    Select From Teams
                </button>
            </div>
            <br />

            {/* Players Table */}
            <div className="h-2" id={"player-table"} style={{display: "block"}}>
                <table>
                    <thead>
                    {playerTable.getHeaderGroups().map(headerGroup => (
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
                                                        <Filter column={header.column} table={playerTable} />
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
                    {console.log(playerTable.getRowModel())}
                    {playerTable.getRowModel().rows.map(row => {
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
                                    checked: playerTable.getIsAllPageRowsSelected(),
                                    indeterminate: playerTable.getIsSomePageRowsSelected(),
                                    onChange: playerTable.getToggleAllPageRowsSelectedHandler()
                                }}
                            />
                        </td>
                        <td colSpan={20}>Page Rows ({playerTable.getRowModel().rows.length})</td>
                    </tr>
                    </tfoot>
                </table>
                <div className="h-2" />
                <div className="flex items-center gap-2">
                    <button
                        className="border rounded p-1"
                        onClick={() => playerTable.setPageIndex(0)}
                        disabled={!playerTable.getCanPreviousPage()}
                    >
                        {"<<"}
                    </button>
                    <button
                        className="border rounded p-1"
                        onClick={() => playerTable.previousPage()}
                        disabled={!playerTable.getCanPreviousPage()}
                    >
                        {"<"}
                    </button>
                    <button
                        className="border rounded p-1"
                        onClick={() => playerTable.nextPage()}
                        disabled={!playerTable.getCanNextPage()}
                    >
                        {">"}
                    </button>
                    <button
                        className="border rounded p-1"
                        onClick={() => playerTable.setPageIndex(playerTable.getPageCount() - 1)}
                        disabled={!playerTable.getCanNextPage()}
                    >
                        {">>"}
                    </button>
                    <span className="flex items-center gap-1">
                        <div>Page</div>
                        <strong>
                            {playerTable.getState().pagination.pageIndex + 1} of{" "}
                            {playerTable.getPageCount()}
                        </strong>
                    </span>
                    <span className="flex items-center gap-1">
                        | Go to page:
                        <input
                        type="number"
                        defaultValue={playerTable.getState().pagination.pageIndex + 1}
                        onChange={
                            e => {const page = e.target.value ? Number(e.target.value) - 1 : 0
                                playerTable.setPageIndex(page)}
                        }
                        className="border p-1 rounded w-16"
                        />
                    </span>
                    <select
                        value={playerTable.getState().pagination.pageSize}
                        onChange={e => {
                            playerTable.setPageSize(Number(e.target.value))
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
                    {playerTable.getPreFilteredRowModel().rows.length} Total Rows Selected
                </div>
                <hr />
                <br />
                <div>
                    <button
                        className="border rounded p-2 mb-2 table-btn"
                        onClick={() =>
                                WriteToCSV(playerTable.getSelectedRowModel().flatRows)
                        }
                    >
                        Generate CSV From Selected Rows

                    </button>
                </div>
            </div>

            {/* Team Table */}
            <div className="h-2" id={"team-table"} style={{display: "none"}}>
                <div className="h-2" />
                <table style={{}}>
                    <thead>
                    {teamTable.getHeaderGroups().map(headerGroup => (
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
                                                        <Filter column={header.column} table={teamTable} />
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
                    {teamTable.getRowModel().rows.map(row => {
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
                                    checked: teamTable.getIsAllPageRowsSelected(),
                                    indeterminate: teamTable.getIsSomePageRowsSelected(),
                                    onChange: teamTable.getToggleAllPageRowsSelectedHandler()
                                }}
                            />
                        </td>
                        <td colSpan={20}>Page Rows ({teamTable.getRowModel().rows.length})</td>
                    </tr>
                    </tfoot>
                </table>
                <div className="h-2" />
                <div className="flex items-center gap-2">
                    <button
                        className="border rounded p-1"
                        onClick={() => teamTable.setPageIndex(0)}
                        disabled={!teamTable.getCanPreviousPage()}
                    >
                        {"<<"}
                    </button>
                    <button
                        className="border rounded p-1"
                        onClick={() => teamTable.previousPage()}
                        disabled={!teamTable.getCanPreviousPage()}
                    >
                        {"<"}
                    </button>
                    <button
                        className="border rounded p-1"
                        onClick={() => teamTable.nextPage()}
                        disabled={!teamTable.getCanNextPage()}
                    >
                        {">"}
                    </button>
                    <button
                        className="border rounded p-1"
                        onClick={() => teamTable.setPageIndex(teamTable.getPageCount() - 1)}
                        disabled={!teamTable.getCanNextPage()}
                    >
                        {">>"}
                    </button>
                    <span className="flex items-center gap-1">
                        <div>Page</div>
                        <strong>
                            {teamTable.getState().pagination.pageIndex + 1} of{" "}
                            {teamTable.getPageCount()}
                        </strong>
                    </span>
                    <span className="flex items-center gap-1">
                        | Go to page:
                        <input
                            type="number"
                            defaultValue={teamTable.getState().pagination.pageIndex + 1}
                            onChange={
                                e => {const page = e.target.value ? Number(e.target.value) - 1 : 0
                                    teamTable.setPageIndex(page)}
                            }
                            className="border p-1 rounded w-16"
                        />
                    </span>
                    <select
                        value={teamTable.getState().pagination.pageSize}
                        onChange={e => {
                            teamTable.setPageSize(Number(e.target.value))
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
                    {teamTable.getPreFilteredRowModel().rows.length} Total Rows Selected
                </div>
                <hr />
                <br />
                <div>
                    <button
                        className="border rounded p-2 mb-2 table-btn"
                        onClick={() =>
                            WriteToCSV(teamTable.getSelectedRowModel().flatRows)
                        }
                    >
                        Generate CSV From Selected Rows
                    </button>
                </div>
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
