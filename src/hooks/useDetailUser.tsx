import axios from "axios";
import { useQuery } from "react-query";

const fetchUserDetails = async (id:string) => {
    try {
        const response = await axios.get(`https://randomuser.me/api/?id=${id}`);
        const data = response.data.results[0]
        console.log(data);
        return data
    } catch (error) {
        alert('Erro ao buscar detalhes do usuário')
    }
}
export function useDetailsUser(id: string) {
    return useQuery(['userDetails', id], () => fetchUserDetails(id))
  }