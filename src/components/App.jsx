import { useState} from "react"
import {Searchbar} from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { getImgsApi } from "./API";
import { LoadButton } from "./BtnLoad/Button";
import { Modal } from "./Modal/Modal";
import { Loader } from "./Loader/Loader";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const imgApi = new getImgsApi()

export const App = () => {
const [imgSet, setImgSet] = useState([]);
const [selectedImg, setSelectedImg] = useState({});
const [showButton, setShowButton] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const [showModal, setShowModal] = useState(false);
const [error, setError] = useState(false);

  const onSearchForm = ({value}) =>{
    setError(false);
    setShowButton(false)
    const searchValue = value.trim();
    if(!searchValue.length)  return;
    imgApi.query = searchValue;
    imgApi.resetPage()
    fetchImg([])
  }
  
  const handleLoadMoreBtn =()=>{
    fetchImg(imgSet)
  }

const fetchImg = async(set) => {
   try{
      setIsLoading(true);
      const result = await imgApi.fetchImgItem()
      setImgSet([...set, ...result])
      console.log(imgSet);
      result.length >= 12 ? setShowButton(true) : setShowButton(false)
    } catch(error){
      setError(true)
    } finally{
      setIsLoading(false)
    }
}

  const onImgClick = (id) =>{
    setSelectedImg(imgSet.filter(img => img.id === id))
    setShowModal(!showModal)
  }
const toggleModal = ()=>{
  setShowModal(!showModal)
}


  return (
    <>
      <Searchbar onSubmit= {onSearchForm}/>
      {error && Notify.failure('Nothing was found for your request')}
      <ImageGallery items= {imgSet} onImgClick = {onImgClick}></ImageGallery>
      {showButton &&<LoadButton onClick={handleLoadMoreBtn}></LoadButton>}
      {isLoading && <Loader></Loader>}
      {showModal && <Modal onClose={toggleModal} selectedImg={selectedImg}></Modal>}
    </>
  );
};
