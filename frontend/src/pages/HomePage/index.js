import React, {useState} from 'react';
import Paper from '@mui/material/Paper';
import {
    TreeDataState,
    CustomTreeData,
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableTreeColumn,
    TableInlineCellEditing,
} from '@devexpress/dx-react-grid-material-ui';

import {
    generateRows,
    defaultColumnValues,
} from './demo-data/generator';

const getChildRows = (row, rootRows) => (row ? row.items : rootRows);

const EditButton = ({onClick}) => (
    <button onClick={onClick}>Edit</button>
);

const EditCell = ({value, onValueChange}) => {
    const [tempValue, setTempValue] = useState(value);

    const handleInputChange = (e) => {
        setTempValue(e.target.value);
    };

    const handleSaveClick = () => {
        onValueChange(tempValue);
    };

    return (
        <>
            <input type="text" value={tempValue} onChange={handleInputChange}/>
            <button onClick={handleSaveClick}>Save</button>
        </>
    );
};

const EditCellComponent = ({column, row, value, onValueChange}) => {
    const [editing, setEditing] = useState(false);

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleSaveClick = (newValue) => {
        onValueChange(row.id, column.name, newValue);
        setEditing(false);
    };

    if (editing) {
        return (
            <EditCell value={value} onValueChange={handleSaveClick}/>
        );
    }

    return (
        <EditButton onClick={handleEditClick}/>
    );
};

const Cell = (props) => {
    const {column, row, value} = props;

    if (column.name === 'edit') {
        return (
            <EditCellComponent {...props} />
        );
    }

    return (
        <Table.Cell {...props} />
    );
};

export default function Homepage() {
    const [columns] = useState([
        {name: 'name', title: 'Name'},
        {name: 'gender', title: 'Gender'},
        {name: 'city', title: 'City'},
        {name: 'car', title: 'Car'},
        {
            name: 'edit',
            title: '',
            getCellValue: (row) => row.id,
        },
    ]);
    const [data, setData] = useState(generateRows({
        columnValues: {
            ...defaultColumnValues,
            items: ({random}) => (random() > 0.5
                ? generateRows({
                    columnValues: {
                        ...defaultColumnValues,
                        items: () => (random() > 0.5
                            ? generateRows({
                                columnValues: {
                                    ...defaultColumnValues,
                                },
                                length: Math.trunc(random() * 5) + 1,
                                random,
                            })
                            : null),
                    },
                    length: Math.trunc(random() * 3) + 1,
                    random,
                })
                : null),
        },
        length: 3,
    }));
    const [tableColumnExtensions] = useState([
        {columnName: 'name', width: 300},
    ]);

    return (
        <Paper>
            <Grid
                rows={data}
                columns={columns}
            >
                <TreeDataState/>
                <CustomTreeData
                    getChildRows={getChildRows}
                />
                <Table
                    columnExtensions={tableColumnExtensions}
                />
                <TableHeaderRow/>
                <TableTreeColumn
                    for="name"
                />
            </Grid>
        </Paper>
    );
};