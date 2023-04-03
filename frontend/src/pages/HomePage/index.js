import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import {Button} from "@mui/material";
import {Box} from "@mui/system";
import {CloseSquare, MinusSquare, PlusSquare, StyledTreeItem} from "./styles";


export default function SiteTreeView(props) {
    const [expanded, setExpanded] = React.useState([]);

    const handleToggle = (event, nodeIds) => {
        setExpanded(nodeIds);
    };

    const handleExpandClick = () => {
        setExpanded((oldExpanded) =>
            oldExpanded.length === 0 ? ['1', '3', '7'] : [],
        );
    };

    const renderTree = (nodes) => (
        <StyledTreeItem key={nodes.sid} nodeId={nodes.sid.toString()} label={nodes.type + " - " + nodes.name}>
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </StyledTreeItem>
    );

    return (
        <Box sx={{height: 270, flexGrow: 1, maxWidth: 400, overflowY: 'auto'}}>
            <Box sx={{mb: 1}}>
                <Button onClick={handleExpandClick}>
                    {expanded.length === 0 ? 'Expand all' : 'Collapse all'}
                </Button>
            </Box>
            <TreeView
                aria-label="customized"
                defaultExpanded={[]}
                defaultCollapseIcon={<MinusSquare/>}
                defaultExpandIcon={<PlusSquare/>}
                defaultEndIcon={<CloseSquare/>}
                expanded={expanded}
                onNodeToggle={handleToggle}
                sx={{height: 400, flexGrow: 1, maxWidth: 250, overflowY: 'auto'}}
            >
                {props.data.map((node) => renderTree(node))}
            </TreeView>
        </Box>
    );
}