import React from "react";
import Card from "../../components/Card"

const Admin = () => {
    const data = React.useMemo(
        () => [            
            {   id: 1,
                name: "Local A",
                measures: {
                     temperature: 35,
                     humidity: 60
                }                
            },
            {   id: 2,
                name: "Local B",
                measures: {
                     temperature: 38,
                     humidity: 55
                }                
            }                  
        ],
        []
      )

   return(
    <div>
        {data.map((material)=> (
            <Card key={material.id} material={material}  />
        ))}
    </div>     
    )
}

export default Admin;