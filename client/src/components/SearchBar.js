import {Form, Button} from 'react-bootstrap'
import { useEffect, useState} from 'react'

const SearchBar = ({onClickSearch,setSearchText,searchText}) => {
    const [refresh, setRefresh] = useState(false)

    const onChangeSearchText =(e)=>{
        setSearchText(e.target.value)
    }

    const onKeyPressSearchText= (e) =>{
        if (e.charCode===13){
            setRefresh(false)
            onClickSearch()
        }
    }
    
    //reset functionality 
    useEffect(() => {
        onClickSearch()
    }, [refresh])

    
    const onClickReset = () => {
        setRefresh(true)
        setSearchText('');
      };

    return (
        <div className="d-flex justify-content-around">
            <Form.Control type="text" placeholder="Search a movie...." 
            onChange={onChangeSearchText}
            onKeyPress={onKeyPressSearchText}
            value={searchText}
            />
            <Button variant="primary mx-2" onClick={onClickSearch}> Search </Button>
            <Button variant="success" onClick={onClickReset}> Refresh </Button>
        </div>
      
    )
}

export default SearchBar
