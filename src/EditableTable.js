import React, { useState, useEffect, Fragment } from 'react';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import MaterialTable from 'material-table';
import Loader from 'react-loader-spinner';
import useIsMounted from 'ismounted';
import awsconfig from './aws-exports.js';
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from 'mdbreact';

// Configure a custom GraphQL endpoint
Amplify.configure({
  API: {
    graphql_endpoint: awsconfig.aws_appsync_graphqlEndpoint,
    graphql_endpoint_iam_region: 'us-east-2'
  }
});

const convertDateTime = AWSDateTime => {
  return AWSDateTime.slice(0, 10);
};

export default function MaterialTableDemo(props) {
  const columns = [
    { title: 'Category', field: 'category' },
    { title: 'Item', field: 'item' },
    { title: 'Quantity', field: 'quantity' },
    { title: 'Storage', field: 'storage' },
    { title: 'Last Modified', field: 'updatedAt' },
    { title: 'Par Value', field: 'parValue' }
  ];
  const [data, setData] = useState([]);
  const isMounted = useIsMounted();

  const listItems = () => {
    API.graphql(
      graphqlOperation(queries.listInventoryItems, {
        filter: {
          location: {
            eq: props.location
          }
        }
      })
    )
      .then(result => {
        let initialData = [];
        let resultCopy = result.data.listInventoryItems.items;

        resultCopy.map(eachItem => {
          eachItem['updatedAt'] = convertDateTime(eachItem['updatedAt']);
        });

        resultCopy.map(eachItem => {
          initialData.push(eachItem);
        });

        setData(initialData);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    isMounted.current ? console.log('Mounted') : console.log('NOT Mounted');
    listItems();

    // return controller.abort();
  }, []);

  return (
    <Fragment>
      <MaterialTable
        title="Inventory Table"
        actions={[
          {
            icon: 'refresh',
            tooltip: 'Refresh Data',
            isFreeAction: true,
            onClick: () => {
              listItems();
              console.log(data);
            }
          }
        ]}
        columns={columns}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              const originalData = [...data];
              originalData.push(newData);
              setData(originalData);
              resolve();
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              const originalData = [...data];
              originalData[originalData.indexOf(oldData)] = newData;
              setData(originalData);
              resolve();
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              const originalData = [...data];
              originalData.splice(originalData.indexOf(oldData), 1);
              setData(originalData);
              resolve();
            })
        }}
      />
      <div className="d-flex justify-content-center">
        <MDBBtn color="primary" onClick={() => {}}>
          Save Changes
        </MDBBtn>
        <MDBBtn color="primary" onClick={() => {}}>
          Generate Supply Order
        </MDBBtn>
      </div>
    </Fragment>
  );

  //   return <Loader type="Puff" color="#00BFFF" height="100" width="100" />;
}

// const addItem = () =>
//   API.graphql(
//     graphqlOperation(mutations.createInventoryItem, { input: itemDetails })
//   )
//     .then(data => console.log(data))
//     .catch(err => console.log(err));

// addItem();
