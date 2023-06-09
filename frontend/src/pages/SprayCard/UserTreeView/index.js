import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';

export default function UserTreeView({
                                         sprayData,
                                         field_names,
                                         handleInputChange
                                     }) {
    const [expanded, setExpanded] = React.useState([]);
    const [selected, setSelected] = React.useState("");

    const handleToggle = (event, nodeIds) => {
        setExpanded(nodeIds);
    };

    const handleSelect = (event, nodeIds) => {
        setSelected(nodeIds);
        handleInputChange(event, nodeIds, field_names[5])
    };

    const collectNodeIds = (nodes) => {
        let ids = [];
        for (let nodeId in nodes) {
            ids.push(nodeId);
            if (nodes[nodeId].children) {
                ids = ids.concat(collectNodeIds(nodes[nodeId].children));
            }
        }
        return ids;
    };

    const handleExpandClick = () => {
        if (expanded.length === 0) {
            const allNodeIds = collectNodeIds(sprayData["userSubTree"]);
            setExpanded(allNodeIds);
        } else {
            setExpanded([]);
        }
    };

    const renderTree = (nodes) => {
        if (!nodes) {
            return null;
        }
        return Object.entries(nodes).map(([nodeId, nodeData]) => {
            return (
                <TreeItem key={nodeId} nodeId={nodeId} label={nodeData.label}>
                    {nodeData.children && renderTree(nodeData.children)}
                </TreeItem>
            );
        });
    };


    return (
        <Box sx={{height: 280, flexGrow: 1, maxWidth: 400, overflowY: 'auto', overflowX: 'auto'}}>
            <Box>
                <Button onClick={handleExpandClick}>
                    {expanded.length === 0 ? 'Expand all' : 'Collapse all'}
                </Button>
            </Box>
            <TreeView
                aria-label="controlled"
                defaultCollapseIcon={<ExpandMoreIcon/>}
                defaultExpandIcon={<ChevronRightIcon/>}
                expanded={expanded}
                selected={selected}
                onNodeToggle={handleToggle}
                onNodeSelect={handleSelect}
            >
                {renderTree(sprayData["userSubTree"])}
            </TreeView>
        </Box>
    );
}
