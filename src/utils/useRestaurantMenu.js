import React, { useEffect, useState } from 'react'
import { FETCH_MENU_URL, FETCH_MENU_URL_MOBILE} from '../constants'

const useRestaurantMenu = (resId) => {
    const [restaurantInfo, setRestaurantInfo] = useState(null)
    const [restaurantMenu, setRestaurantMenu] = useState(null)

    useEffect(() => {
        getRestaurantMenu();
        window.scrollTo(0, 0);
    }, [])

    const getRestaurantMenu = async () => {
        let data;
        let menuData;
        let json;
        if(window.innerWidth >=1024){
             data = await fetch(FETCH_MENU_URL + resId)
             json = await data.json();
             menuData = json?.data?.cards[4].groupedCard?.cardGroupMap?.REGULAR?.cards
        }
        else{
             data = await fetch(FETCH_MENU_URL_MOBILE);
             json = await data.json();
             menuData = json?.data?.cards[5].groupedCard?.cardGroupMap?.REGULAR?.cards
            }
        // console.log(json.data)
        const info = json?.data?.cards[0].card?.card.info || json?.data?.cards[2].card?.card.info;
        const menu =  menuData
        // console.log(menu);
        setRestaurantInfo(info)
        setRestaurantMenu(menu)
    }
    return {restaurantInfo , restaurantMenu}
}

export default useRestaurantMenu