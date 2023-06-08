import React, {useEffect} from 'react';
import CheckboxTree from 'react-checkbox-tree';
import '@fortawesome/fontawesome-free/css/all.css';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import {Box} from "@mui/system";
import {Button, Grid} from "@mui/material";
import {useState} from "react";

export default function SprayCardSiteTreeView({
                                                  sprayData,
                                                  field_names,
                                                  fieldValues,
                                                  setFieldValues,
                                                  siteOptions,
                                                  end_site_types,
                                                  checked,
                                                  setChecked,
                                                  expanded,
                                                  setExpanded,
                                                  nodes
                                              }) {

    const findNodesWithChildren = (nodes) => {
        return nodes.reduce((acc, node) => {
            if (node.children && node.children.length > 0) {
                acc.push(node.value);
                acc.push(...findNodesWithChildren(node.children));
            }
            return acc;
        }, []);
    }

    const handleExpandToggleClick = (node) => {
        setExpanded((prev) =>
            ({...prev, [node.value]: prev[node.value]?.length === 0 ? findNodesWithChildren([node]) : []})
        );
    };

    const handleCheck = (treeId, checkedNodes) => {
        setChecked(prev => ({...prev, [treeId]: checkedNodes}));
    };

    const handleExpand = (treeId, expandedNodes) => {
        setExpanded(prev => ({...prev, [treeId]: expandedNodes}));
    };

    return (
        <>
            {nodes.map(node => (
                <Grid item xs={4} key={node.value}>
                    <Box
                        key={node.value}
                        sx={{
                            border: '1px solid #000',
                            borderRadius: '4px',
                            maxHeight: 250,
                            flexGrow: 1,
                            maxWidth: 300,
                            overflowY: 'auto',
                            overflowX: 'auto',
                        }}>
                        <Box>
                            <Button onClick={() => handleExpandToggleClick(node)}>
                                {expanded[node.value] && expanded[node.value].length === 0 ? 'Expand' : 'Collapse'}
                            </Button>
                        </Box>
                        <CheckboxTree
                            nodes={[node]}
                            checked={checked[node.value] || []}
                            expanded={expanded[node.value] || []}
                            onCheck={checkedNodes => handleCheck(node.value, checkedNodes)}
                            onExpand={expandedNodes => handleExpand(node.value, expandedNodes)}
                            showNodeIcon={false}
                        />
                    </Box>
                </Grid>))}
        </>
    );
}
