import * as React from 'react';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {TreeView, TreeItem} from '@mui/lab';
import AddIcon from '@mui/icons-material/Add';

const columns = [
    {field: 'id', headerName: 'ID', width: 150},
    {field: 'name', headerName: 'Name', width: 200},
    {field: 'type', headerName: 'Type', width: 150},
    {field: 'size', headerName: 'Size', width: 100},
    {field: 'crop', headerName: 'Crop', width: 150},
];

const rows = [
    {
        id: 'SID-0978dda7-c711-4b81-9e9a-33b2fffd50aa',
        name: 'grod farm',
        type: 'Golf Course',
        size: '12',
        crop: {crop: 'Peach'},
        children: [
            {
                id: 'SID-724612bd-b1ed-4249-939b-150ac8d2a45b',
                name: 'berry',
                type: 'Section',
                size: '2',
                children: [],
            },
            {
                id: 'SID-abbb6b65-2d75-4b7a-8d3d-ec70e213e093',
                name: 'asd',
                type: 'Orchard',
                children: [],
            },
        ],
    },
];

function renderTreeView(node) {
    const {id, name, children} = node;
    if (children) {
        return (
            <TreeItem key={id} nodeId={id} label={name}>
                {children.map((child) => renderTreeView(child))}
            </TreeItem>
        );
    }

    return <TreeItem key={id} nodeId={id} label={name}/>;
}

export default function App() {
    return (
        <DataGrid rows={rows} columns={columns}>
            {(params) => {
                const {id, name, type, size, crop} = params.row;
                return (
                    <TreeView
                        defaultCollapseIcon={<AddIcon/>}
                        defaultExpandIcon={<AddIcon/>}
                    >
                        {renderTreeView(params.row)}
                    </TreeView>
                );
            }}
        </DataGrid>
    );
}
