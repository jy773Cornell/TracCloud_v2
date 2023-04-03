import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import {Button} from "@mui/material";
import {Box} from "@mui/system";
import {CloseSquare, MinusSquare, PlusSquare, StyledTreeItem} from "./styles";
import Paper from "@mui/material/Paper";

export default function SiteTreeView(props) {
    const [expanded, setExpanded] = React.useState([]);

    const handleToggle = (event, nodeIds) => {
        setExpanded(nodeIds);
    };

    const findNodesWithChildren = (nodes) => {
        return nodes.reduce((acc, node) => {
            if (node.children && node.children.length > 0) {
                acc.push(node.sid);
                acc.push(...findNodesWithChildren(node.children));
            }
            return acc;
        }, []);
    }

    const handleExpandClick = () => {
        setExpanded((oldExpanded) =>
            oldExpanded.length === 0 ? findNodesWithChildren(props.siteList) : [],
        );
    };

    const renderTree = (nodes) => (
        <StyledTreeItem key={nodes.sid} nodeId={nodes.sid.toString()} label={nodes.type + " - " + nodes.name}>
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </StyledTreeItem>
    );

    return (
        <Paper style={{height: 400, width: 250, marginLeft: "15px"}}>
            <Box sx={{height: 400, flexGrow: 1, width: 250, overflowY: 'auto'}}>
                <Box sx={{mb: 1, margin: "0px"}}>
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
                    sx={{height: 400, flexGrow: 1, width: 250, overflowY: 'auto'}}
                >
                    {props.siteList.map((node) => renderTree(node))}
                </TreeView>
            </Box>
        </Paper>
    );
}