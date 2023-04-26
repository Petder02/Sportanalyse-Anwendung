import React from "react"
import { saveAs } from 'file-saver';

import "./index.css"

import { makePlayerData, makeTeamData } from "./makeFootballData"

import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable
} from "@tanstack/react-table"

const FootballMainTable = ({onDataSelect}) => {
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
                        accessorKey: "passingAttempts",
                        header: () => <span>Passing Attempts</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "passingYards",
                        header: () => <span>Passing Yards</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "rushingAttempts",
                        header: () => <span>Rushing Yards</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "rushingYards",
                        header: () => <span>Rushing Yards</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "receptions",
                        header: () => <span>Receptions</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "receivingYards",
                        header: () => <span>Receiving Yards</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "fumbles",
                        header: () => <span>Fumbles</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "interceptions",
                        header: () => <span>Interceptions</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "touchdowns",
                        header: () => <span>Touchdowns</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "sacks",
                        header: () => <span>Sacks</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "safeties",
                        header: () => <span>Safeties</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "tackles",
                        header: () => <span>Tackles</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "passerRating",
                        header: () => <span>Passer Rating</span>,
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
                        accessorKey: "receivingYards",
                        header: () => <span>Receiving Yards</span>,
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
                    },
                    {
                        accessorKey: "fumbles",
                        header: () => <span>Fumbles</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "safeties",
                        header: () => <span>Safeties</span>,
                        footer: props => props.column.id
                    },
                    {
                        accessorKey: "sacks",
                        header: () => <span>Sacks</span>,
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
        saveAs(blob, 'selected_data.csv');

        // Finally, display the next section of the page
        onDataSelect();
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
            </div>

            {/* Team Table */}
            <div className="h-2" id={"team-table"} style={{display: "none"}}>
                <div className="h-2" />
                <table>
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
            </div>
            <hr />
            <br />
            {/* Generate CSV Button */}
            <div>
                <button
                    className="border rounded p-2 mb-2 table-btn"
                    onClick={() => {
                        WriteToCSV(teamTable.getSelectedRowModel().flatRows);
                    }}
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

export default FootballMainTable;
