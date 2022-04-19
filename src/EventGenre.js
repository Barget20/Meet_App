import React, { useCallback, useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";


const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];

const EventGenre = ({ events }) => {
    const [data, setData] = useState([]); 
    
    useEffect(() => {
            const data = genres.map((genre) => {
                const value = events.filter((event) => event.summary.split(' ').includes(genre)).length;
                return { name: genre, value};
        }).filter(d => d.value > 0);

        console.log(data);

    setData(data); }, [events]);


// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <ResponsiveContainer height={400}>
    <PieChart width={400} height={400}>
      <Pie data={data}
        cx={200}
        cy={200}
        labelLine={false}
        outerRadius={80}
        label>
          {
          data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]}/>
          ))
          }
      </Pie>
    </PieChart> 
    </ResponsiveContainer>
  );
}

export default EventGenre;
