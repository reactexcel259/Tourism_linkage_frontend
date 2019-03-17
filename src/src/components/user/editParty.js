import React from 'react';
import { withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Field, reset, reduxForm, FieldArray } from 'redux-form';
import { renderField, renderFieldTextArea, renderSelectBox } from './inputComponent'
import './editrecord.scss'

import { Modal, Button } from 'antd';

import { query as query1} from './userDashIndex';

import ManageSupplierImages from '../ManageSupplierImages';
import { renderSelect } from '../wizard/renderField';
import moment from 'moment'


const form = reduxForm( {
    form: 'editSupplier',
    enableReinitialize: true,
    //validate

} )

function someFunction() {
    let items = [];
    new Array(24).fill().forEach((acc, index) => {
        items.push(moment({ hour: index }).format('h:mm A'));
        //items.push(moment({ hour: index, minute: 60 }).format('h:mm A'));
    })
    return items;
}



const renderWorkingDays = ({ fields, meta: { error, submitFailed } }) => {
    // fields.push({}, {}, {}, {}, {}, {}, {})
    return (<div>
        <div>
            <a href="" onClick={(e) => {
                // e.preventDefault();
                //fields.push({})
            }}>
                Bussiness Hours
             </a>
            {submitFailed && error && <span>{error}</span>}
        </div>




        {fields.map((member, index) => (
            <div>

                <div style={{

                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gridAutoRows: 'dense',
                    gridGap: 10
                }} >
                    <Field
                        name={`${member}.day`}
                        type="select" data={["Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday", "Sunday"]} component={renderSelect}
                        label="" />

                    <Field
                        name={`${member}.openClose`}
                        type="select" data={["Open", "Closed"]} component={renderSelect} label="" />
                    <Field name={`${member}.fromHour`} type="select" data={someFunction()} component={renderSelect} label="" />
                    <Field name={`${member}.toHour`} type="select" data={someFunction()} component={renderSelect} label="" />
                </div>
            </div>
        ))}
    </div>
    )
}


const query = gql` query singleParty($name:String){
   
        singleParty(name:$name){
         _id
             name
             region
             categories
             address
             phoneNumber
             website
             tags
             latitude
             longitude
             description
             workingDay{
                  day
      openClose
      fromHour
      toHour
             }
        }
        
   
  }
  `
/*$email:String,$tags: String,
, $categories: String, $region: String, $description: String, $email: String,
$address: String,
$phoneNumber: String, $website: String

categories:$categories,description:$description,phoneNumber:$phoneNumber,tags:$tags,
    region:$region,website:$website,address:$address,

*/

const mutation = gql`mutation editVendor1($dataId:String,$name:String,$tags: String,
, $categories: String, $region: String, $description: String, 
$address: String,
$phoneNumber: String, $website: String,$workingDay:[workingDayInput]
){
        editVendor(name:$name,dataId:$dataId,
        categories:$categories,description:$description,phoneNumber:$phoneNumber,tags:$tags,
    region:$region,website:$website,address:$address,workingDay:$workingDay
        
        ){
            party{
                name
            }
            errors
                
            
        }
    }

`



class EditRecord extends React.Component {
    state = { visible: false }

    showModal = () => {
        this.setState( {
            visible: true,
        } );
    }

    componentWillMount() {
        this.props.refetch()
    }


    handleOk = ( e ) => {
        this.setState( {
            visible: false,
        } );
        this.props.history.push('/user')
    }

    handleCancel = ( e ) => {
        this.setState( {
            visible: false,
        } );
        this.props.history.push( '/user' )
    }
    render() {
        const { match, mutate, handleSubmit, id, initialValues } = this.props;


        return <div className="editRecord">

            <h2>Edit Record</h2>

            <div className="row">
                <div className="col1">
                    <div className="label">Name</div>
                    <div className="input">
                        <Field name='name' component={ renderField } type="text" label="Name" />

                    </div>
                </div>
                <div className="col2">
                    <div className="label">Region</div>
                    <div className="input">
                        {/*<Field name='region' component={ renderField } type="text" label="Region" />*/}
                        <Field 
                            name="region" 
                            type="select" 
                            data={ ["Western Jamaica", "Central Jamaica", "Eastern Jamaica"] } 
                            component={ renderSelectBox } label="Select Region" />

                    </div>


                </div>
            </div>
            <div className="row">
                <div className="col1">
                    <div className="label">Select Manufacturer Type</div>
                    <div className="input">
                        {/*<Field name='categories' component={ renderField } type="text" label="Category" />*/}

                        <Field name="categories" type="select"
                            data={ ['Food and Agro', 'Printing, Packaging and Paper', 'Minerals and Metal',
                                'Electrical, Electronics and Automotive', 'Chemicals, Cosmetics and Pharmaceuticals',
                                'Furniture, Wooden and Bedding', 'Textile and Sewn'] }



                            component={ renderSelectBox } label="Select Manufacturer Type" />

                    </div>
                </div>
                <div className="col2">
                    <div className="label">Address</div>
                    <div className="input">
                        <Field name='address' component={ renderFieldTextArea } type="text" label="Address" />

                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col1">
                    <div className="label">Latitude</div>
                    <div className="input" style={{fontWeight:'bold'}}>
                        {initialValues.latitude || '--'}
                    </div>
                </div>
                <div className="col2">
                    <div className="label">Longitude</div>
                    <div className="input" style={{fontWeight:'bold'}}>
                        {initialValues.longitude || '--'}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col1">
                    <div className="label">Phone Number</div>
                    <div className="input">
                        <Field name='phoneNumber' component={ renderField } type="text" label="Phone Number" />

                    </div>
                </div>
                <div className="col2">
                    <div className="label">Website</div>
                    <div className="input">
                        <Field name='website' component={ renderField } type="text" label="Website" />

                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col1">
                    <div className="label">Description</div>
                    <div className="input">
                        <Field name='description' component={ renderFieldTextArea } type="text" label="Description" />

                    </div>
                </div>
                <div className="col2">
                    <div className="label">Tags(seprate by comma)</div>
                    <div className="input">
                        <Field name='tags' component={ renderFieldTextArea } type="text" label="tags" />

                    </div>
                </div>
            </div>

            <FieldArray name="workingDay" component={renderWorkingDays} />
            <Modal
                title="Notification"
                visible={ this.state.visible }
                onOk={ this.handleOk }
                onCancel={ this.handleCancel }
            >
            Data has been edited successfully
                
            </Modal>
            <button className="buttonSave" onClick={ handleSubmit( async ( data ) => {
               console.log(data)
                const editData = await mutate( {
                    variables: {
                        name: data.name, dataId: id, tags: data.tags, address: data.address, phoneNumber: data.phoneNumber,
                        region: data.region, categories: data.categories, website: data.website, 
                        description: data.description,
                        workingDay:data.workingDay
                    },
                    refetchQueries: [{query:query1}]
                } )
console.log(editData)
                this.showModal();


            } ) }>Save</button>

            <div className="row">
                <div className="col1">
                    <ManageSupplierImages id={id}/>
                </div>
                <div className="col2">
                </div>
            </div>

            



        </div>
    }
}
const EditRecordForm = form( graphql( mutation )( EditRecord ) )

const EditRecordWrapper = ( {  data,history } ) => {
    if ( data.loading ) {
        return <span>Loading ....</span>
    }

    
    const initialValues = {
        name: data.singleParty.name, categories: data.singleParty.categories, address: data.singleParty.address,
        region: data.singleParty.region, phoneNumber: data.singleParty.phoneNumber, website: data.singleParty.website,
        description: data.singleParty.description, tags: data.singleParty.tags, workingDay: data.singleParty.workingDay ? data.singleParty.workingDay: [
            { day: "Monday", openClose: "Open", fromHour: "10 A.M", toHour: "17:00 P.M" },
            { day: "Tuesday", openClose: "Open", fromHour: "10 A.M", toHour: "17:00 P.M" },
            { day: "Wednesday", openClose: "Open", fromHour: "10 A.M", toHour: "17:00 P.M" },
            { day: "Thrusday", openClose: "Open", fromHour: "10 A.M", toHour: "17:00 P.M" },
            { day: "Friday", openClose: "Open", fromHour: "10 A.M", toHour: "17:00 P.M" },
            { day: "Saturday", openClose: "Closed", fromHour: "10 A.M", toHour: "17:00 P.M" },
            { day: "Sunday", openClose: "Closed", fromHour: "10 A.M", toHour: "17:00 P.M" },


        ],
        latitude: data.singleParty.latitude, longitude: data.singleParty.longitude
    }

    return <EditRecordForm refetch={data.refetch} initialValues={ initialValues } id={ data.singleParty._id } history={ history} />


}





export default withRouter( graphql( query, {
    options: ( { match } ) => {
        return { variables: { name: match.params.name } }
    }

} )( EditRecordWrapper ) );