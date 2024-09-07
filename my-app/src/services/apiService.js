import axios from "axios";


export const getTopologias = async (query,tecnologia ) => {

  try {
    const response = await axios.get("http://172.31.33.33:5000/topologias", {
      params: { query: query, tecnologia: tecnologia },
    });
    console.log("servicio vis", response.data);
    return response.data; 
  } catch (error) {
    console.error("Hubo un error al obtener los nodos!", error);
    throw error; 
  }
};

