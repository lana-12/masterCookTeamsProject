export function fetchDelete(id){
    console.log("fetchDelete");

    fetch(`https://localhost:4343/recipes/delete/${id}`, {

    method: "DELETE",
    })
   .then(res=>res.json())
}