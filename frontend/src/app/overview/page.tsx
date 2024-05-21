'use client'
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import useMedewerkers from "../api/useMedewerkers";
import { Medewerker } from "@/lib/types";
import config from '@/lib/ip_config.json';

export default function Overview() {
  const { medewerkers, loading, updateMedewerker } = useMedewerkers();
  const ipAddress = config.ipAddress;

  const [cardColors, setCardColors] = useState<{ [key: string]: string }>({});

  const handleClick = async (medewerker: Medewerker) => {
    let newStatus: 'aanwezig' | 'afwezig' | 'extern';
    if (medewerker.attributes.aanwezigheid === 'extern') {
      newStatus = 'aanwezig';
    } else {
      newStatus = medewerker.attributes.aanwezigheid === 'aanwezig' ? 'afwezig' : 'aanwezig';
    }
  
    const updatedMedewerker = {
      ...medewerker,
      attributes: {
        ...medewerker.attributes,
        aanwezigheid: newStatus,
        id : medewerker.id
      },
    }; 

    updateMedewerker(updatedMedewerker);
    
  };
  
  useEffect(() => {
    const updatedCardColors: { [key: string]: string } = {};
    medewerkers.forEach((medewerker) => {
      let color: string;
      if (medewerker.attributes.aanwezigheid === 'aanwezig') {
        color = '#E0045C';
      } else if (medewerker.attributes.aanwezigheid === 'extern') {
        color = '#04B4E0';
      } else {
        color = '#ffffff';
      }
      updatedCardColors[medewerker.id] = color;
    });
    setCardColors(updatedCardColors);
  }, [medewerkers]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="font-bold h-screen flex flex-col items-center">
      <div className="w-full flex justify-between items-center px-4 py-2">
        <div className="flex items-center">
          <img src={`http://${ipAddress}:1337/uploads/kega_logo_d6bd07ca33.png`} className="h-20 w-auto" />
          <img src={`http://${ipAddress}:1337/uploads/keephub_logo_60a59f7201.png`} className="h-20 w-auto" />
        </div>
        <div className="flex items-center">
          <h1 className="text-6xl">Aanwezigheid</h1>
        </div>
        <div className="flex items-center"> 
          <h1 className="mr-4 text-2xl">Aantal <br/> aanwezigen</h1>
          <div className="text-4xl text-custom-pink rounded-full h-20 w-20 flex items-center justify-center border-4 border-custom-pink">
            {medewerkers.filter(medewerker => medewerker.attributes.aanwezigheid === 'aanwezig').length}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-1 h-full">
        {medewerkers
          .map((medewerker) => {
            const color = cardColors[medewerker.id] || '#ffffff'; // Get color from state or default to white
            const textColor = medewerker.attributes.aanwezigheid === 'afwezig' ? '#000000' : '#ffffff'; // Adjust text color based on aanwezigheid

          return (
            <Card key={medewerker.id} className="flex-auto m-2" style={{ backgroundColor: color }} onClick={() => handleClick(medewerker)}>
              <CardHeader className="flex items-center justify-center h-full">
                <CardTitle style={{ color: textColor, fontSize: '1vw', whiteSpace: 'nowrap' }}>
                  {`${medewerker.attributes.voornaam} ${medewerker.attributes.tussenvoegsels || ''} ${medewerker.attributes.achternaam}`}
                </CardTitle>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
