import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Table from 'react-bootstrap/Table';
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { API_Types_Enum } from './DataConstants';
import apiService from './apiService';

const RenderLineItem = (item, index, viewURL, tableHeaders, deleteURL) => {

    let history = useHistory();
    // rest to remove _id and compress item object into itemViewData
    let { _id, ...itemViewData } = item;
    let viewData = {};
    Object.keys(itemViewData).map(key => {
        tableHeaders.map(heads => {
            // Render only those columns whose key is present in tableHeaders object
            if (heads[key])
                viewData[key] = itemViewData[key];
        })
    })

    return (
        <tr key={index}>
            <td>{index + 1}</td>
            {Object.entries(viewData).map(k => <td>{k[1]}</td>)}
            <td>
                {viewURL ? <Button size="sm" onClick={() => { history.push(viewURL + _id); }}>
                    View
                </Button> : null}
            </td>
            <td>
                {deleteURL ? <Button size="sm" variant="danger" onClick={() => {
                    apiService(deleteURL,
                        {
                            id: _id
                        },
                        API_Types_Enum.delete_with_auth,
                        () => history.push(viewURL),
                        (err) => console.log(err));
                }}>
                    Delete
                </Button> : null}
            </td>
        </tr>
    )
}

// Generic table view component - 
// addEditApplicationUrl - line item click's dynamic navigation based on route url id.
// tableHeaders - Choose which columns from the incoming data to show, value denotes column heading display
// deleteURL - API url to call for deleting the line item
const TableView = (props) => {
    let history = useHistory();
    return (
        <React.Fragment>
            {
                props.addEditApplicationUrl ? <Button size="lg" onClick={() => { history.push(props.addEditApplicationUrl + 0); }}>
                    Add
                </Button> : null
            }
            <Table className="sortable" condensed hover>
                <thead>
                    <tr>
                        <th></th>
                        {props.tableHeaders.map((header) => <th>{Object.values(header)}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {props.datalist.map((item, index) => RenderLineItem(item, index, props.addEditApplicationUrl, props.tableHeaders, props.deleteURL))}
                </tbody>
            </Table>
        </React.Fragment>
    );
}

export default TableView;