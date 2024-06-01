/*API to get or feth the data from the difrrent website
*/
async function authenticator()
{
    const responce = await fetch ("https://fakerapi.it/api/v1/persons");//this await for the rsponce of the fetching the data 
    const data =  await responce.json(); //this takes the data after the responce are wrapped in the json is resoved 
    console.log(data);


}
authenticator();
