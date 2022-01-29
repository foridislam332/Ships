import React, { useEffect, useState } from "react";
import "./styles.css";
import gql from "graphql-tag";
import request from "./utils/request";
import Ships from "./components/Ships/Ships";

export default function App() {
    const [ships, setShips] = useState([]);
    const fetchShips = async () => {
        const response = await request(gql`
      {
        ships {
          name
          home_port
          image
        }
      }
    `);
        setShips(response.data.ships);
    };

    useEffect(() => {
        fetchShips();
    }, []);


    const [inputValue, setInputValue] = useState('');
    const [filterData, setFilterData] = useState([]);

    const handleOnChange = (e) => {
        setInputValue(e.target.value.toUpperCase())
    }

    // filter ship data
    useEffect(() => {
        const filterShips = ships.filter(ship => ship.name.toUpperCase() === inputValue);
        if (filterShips.length > 0 || inputValue !== "") {
            setFilterData(filterShips)
        } else {
            setFilterData(ships)
        }
    }, [inputValue, ships])

    // click to search
    const handleSubmit = (e) => {
        e.preventDefault()

        const filterShips = ships.filter(ship => ship.name.toUpperCase() === inputValue);
        if (filterShips.length > 0 || inputValue !== "") {
            setFilterData(filterShips)
        } else {
            setFilterData(ships)
        }
    }

    return (
        <div className="App">
            {/* logo */}
            <div className="logo">
                <img src="https://i.ibb.co/wWTf5xD/logo.png" alt="" />
            </div>

            <div className="ship_container">

                {/* search field */}
                <div className="search_box">
                    <form onClick={handleSubmit}>
                        <input onChange={handleOnChange} placeholder="Search Ships" type="text" />
                        <button type="submit"><i class="fas fa-search"></i></button>
                    </form>
                </div>

                {/* show total count */}
                <h2 className="total_count">Total Count : {
                    filterData.length || inputValue !== "" ? filterData.length : ships.length
                }</h2>

                {/* show ships */}
                <div>
                    {
                        filterData.map(ship => <Ships
                            key={ship.name}
                            ship={ship}
                        ></Ships>)
                    }
                </div>
            </div>
        </div>
    );
}
