import axios from 'axios';
import { Resource } from './ds';


export const resourcesMock: Resource[] = [
  {
      ID: 1,
      ResourceName: 'Титан',
      IsAvailable: true,
      Image: '../resources-front/titanium.png',
      Density: 14,
      Demand: 5,
      IsToxic: false,
      Desc: 'Это самый крутой титан',
  },
  {
    ID: 2,
    ResourceName: 'Реголит',
    IsAvailable: true,
    Image: '../resources-front/regolith.jpg',
    Density: 8,
    Demand: 10,
    IsToxic: true,
    Desc: 'Это реголит! Очень полезный ресурс',
  },
  {
    ID: 3,
    ResourceName: 'Алюминий',
    IsAvailable: true,
    Image: '../resources-front/aluminium.jpg',
    Density: 1,
    Demand: 3,
    IsToxic: false,
    Desc: 'Алюминий широко используется в инженерии',
  },
  ]

export const getAllResources = async (resName = '', resourcesWithHighDemand = '',): Promise<Resource[]> => {
  try {
    const queryParams = new URLSearchParams({
      resourceName: resName,
      highDemand: resourcesWithHighDemand,
    });
    console.log("111")
    const response = await axios.get(`/api/resources?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    console.error(error);

    if (resName !== '' || resourcesWithHighDemand !== '') {
      let filteredResources = resourcesMock.filter(resource =>
        resName === '' || resource.ResourceName.toLowerCase().includes(resName.toLowerCase()));

      if (resourcesWithHighDemand !== '') {
        filteredResources = filteredResources.filter(resource => resource.Demand > 6);
      }

      return filteredResources;
    } else {
      return resourcesMock;
    }
  }
};


