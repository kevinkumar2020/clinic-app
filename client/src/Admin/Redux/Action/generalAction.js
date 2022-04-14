import axios from '../../../axios';
import * as actionType from './ActionTypes';

export const getAllDetails = (id) => {
    return async dispatch => {
        axios.get(`/getSinglePatientDetails/${id}`).then((res) => {
            dispatch({
                type: actionType.GET_ALLDETAILS,
                payload: res?.data
            })
        }).catch((error) => {
            dispatch({
                type: actionType.GET_ALLDETAILS_FAILED,
                payload: error?.response?.data?.message
            })
        })
    }
}

export const getAppoinments = () => {
    return async dispatch => {
        axios.get('/allAppoinment').then((res) => {
            dispatch({
                type: actionType.GET_APPOINMENTS,
                payload: res?.data
            })
        }).catch((error) => {
            dispatch({
                type: actionType.GET_ALLDETAILS_FAILED,
                payload: error?.response?.data?.message
            })
        })
    }
}

export const appoveAppoinmet = (id) => {
    return async dispatch => {
        axios.patch(`/approveAppoinment/${id}`).then((res) => {
            dispatch({
                type: actionType.APPROVE_APPOINMENT,
                payload: res?.data
            })
        }).catch((error) => {
            dispatch({
                type: actionType.APPROVE_APPOINMENT_FAILED,
                payload: error?.response?.data?.message
            })
        })
    }
}

export const deleteAppoinment = (id) => {
    return async dispatch => {
        axios.delete(`/deleteAppoinment/${id}`).then((res) => {
            dispatch({
                type: actionType.DELETE_APPOINMENT,
                payload: id
            })
        }).then((error) => {
            dispatch({
                type: actionType.DELETE_APPOINMENT_FAILED,
                payload: error?.response?.data?.message
            })
        })
    }
}