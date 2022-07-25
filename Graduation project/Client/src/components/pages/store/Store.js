import React, {useState, useEffect} from 'react';
import {
    InfoWindow, 
    GoogleMap, 
    LoadScript,
    Marker,
} from '@react-google-maps/api';
import {
    Button,
    Input,
    InputGroup,
    InputGroupText,
    Popover,
    PopoverHeader,
    PopoverBody
} from 'reactstrap';
import axios from 'axios';

import './store.css'

const milestonePosition = {
    lat: 21.01258, 
    lng: 105.830865
}

const defaultBakeryLocation = "21.023284,105.809213"

const containerStyle = {
    zoom: 14,
    size: {
        width: '1450px',
        height: '450px'
    } 
}

const Map = () => {
    const [selectedBakery,setSelectedBakery] = useState(null);
    const [info,setInfo] = useState(null);
    const [selectedGoal,setSelectedGoal] = useState(defaultBakeryLocation);
    const [link,setLink]= useState(null);
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [place,setPlace] = useState([])

    useEffect(() => {
        axios.get("http://localhost:2109/place").then((res) => {
          setPlace(res.data);
        });
      }, []);
    
    return (
        <div  className="sbs" >
            <LoadScript googleMapsApiKey="AIzaSyAa3KDk7b3_S-IzXzeunqDyuJXbg5Quf_w">   
            <h1 className="hlis">
                Our bakeries
            </h1>
            <div className="lfis pfs">
                <div className="firs">
                    From
                </div>
                <div className="girs">
                    {info === "" ? "": info}
                </div>   
                <Button 
                    className="lpbs bbs"
                    onClick={()=>{
                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition((position) =>{
                                setInfo(position.coords.latitude + "," + position.coords.longitude);
                            });
                          }
                        }}
                >
                    <img src="/place-localizer-svgrepo-com.svg" alt="place"/>
                </Button>
            </div>
            <InputGroup className="pfs">
                <InputGroupText className="igtgs">
                    Goal
                </InputGroupText>
                <Input type="select" className="gits" onChange={(e)=>setSelectedGoal(e.target.value)}>
                    {place.map(bakery => (
                        <option value={bakery.location_str}>
                            {bakery.address_components.name}
                        </option>
                    ))}
                </Input>    
            </InputGroup>
            <div className="bls" >
                <Button 
                    className="pfs bbs"
                    onClick={()=>{
                    setLink("https://www.google.com/maps/dir/"+info+"/"+selectedGoal+"/");
                    }}
                    href={link}
                >
                    <img src="/route-svgrepo-com.svg" alt="direct"/>
                </Button>
                <div>
                    <Button 
                        className="gbs"
                        id="guide"
                        type="button"
                    >
                        <img src="/circular-info-sign-svgrepo-com.svg" alt="guide"/>
                    </Button>
                    <Popover
                        placement="bottom"
                        target="guide"
                        isOpen={popoverOpen}
                        toggle={() => { setPopoverOpen(!popoverOpen)}}
                        trigger="focus"
                        
                    >
                        <PopoverHeader className="hlis">
                            GUIDE
                        </PopoverHeader>
                        <PopoverBody>
                            1.	Press the red button on the “From” line to get your location<br/>
                            2.	Select your bakery that you want to go to on the “Goal” line<br/>
                            3.	Double click the red button on the line below “Goal” line to get direction<br/>
                            Note: Click on cake markers on the map below to get more information about our bakeries.
                        </PopoverBody>
                        </Popover>
                </div>
            </div>
            <div className="pfs">
                    <GoogleMap
                        mapContainerStyle={containerStyle.size}
                        center={milestonePosition}
                        zoom={containerStyle.zoom}
                    >
                        {place.map(bakery => (
                    
                        <Marker 
                            position = {bakery.location_obj}
                            onClick = {() => {setSelectedBakery(bakery)}}
                            icon = {{ url: "/wedding-cake-svgrepo-com.svg"}}
                        />    
                        ))}

                        {selectedBakery && (
                        <InfoWindow 
                            position = {selectedBakery.location_obj}
                            onCloseClick = {() => {
                            setSelectedBakery(null);
                        }}
                        >
                            <div>
                                <h1>
                                    {selectedBakery.address_components.name}
                                </h1>
                                <h1>
                                Hotline: {selectedBakery.contact.hotline}
                                </h1>
                                <h1>
                                Email: {selectedBakery.contact.email}
                                </h1>
                            </div>    
                        </InfoWindow> 
                        )}           
                    </GoogleMap>
            </div> 
            </LoadScript>
        </div>
    )
}

export default Map;