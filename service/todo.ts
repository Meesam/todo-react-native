import { TODO } from "@/types/todoType";


export const API_BASE_URL = "http://10.0.2.2:5185/api/Todo";

export const fetchTodos = async (): Promise<TODO[]> => {
  const url = `${API_BASE_URL}/getAllTodos`;
  try{
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: 'Application/json',
      },
    })
    return response.json();
  }catch(e){
    console.log(e); 
    return [];
  }
  
  
};
