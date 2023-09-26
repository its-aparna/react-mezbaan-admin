import { createContext, useState } from "react";

export const MyContext= createContext({
    requestRes : [],
    restaurantList : [],
    plans : []
   
});

export default function MyProvider(props) {
    const [requestRes, setRequestRes] = useState([]);
    const [restaurantList, setRestaurantList] = useState([]);
    const [plans, setPlans] = useState([]);
  
    const updateReqRes = newData => {
      setRequestRes(newData);
    };
  
    const updateResList = newData => {
      console.log("update reslist called");
        setRestaurantList(newData);
      };

      const updatePlan = newData => {
        setPlans(newData);
      };

    return (
      <MyContext.Provider value={{ requestRes,restaurantList,plans, updateReqRes ,updateResList ,updatePlan}}>
        {props.children}
      </MyContext.Provider>
    );
  }
  