import { useDispatch, useSelector } from "react-redux";
import {selectErrorMassege, cleareError} from "../../redux/slices/errorSlice";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";

function Error() {
 const errorMassege = useSelector(selectErrorMassege);
  const dispatch = useDispatch();
 useEffect(()=>{
  if(errorMassege){
    toast.info(errorMassege);
    dispatch(cleareError);
  }
 },[errorMassege])
  return <ToastContainer position="top-right" autoClose={2000}/>
}

export default Error;
