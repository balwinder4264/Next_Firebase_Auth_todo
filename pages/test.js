import axios from "axios";
const Test = () => {
    const getDataHandler = async () => {
        const response = await axios.get("api/hello")
        console.log("heloo=>", response);
    }
    return <div className="flex justify-center items-center h-screen">
        <button onClick={() => getDataHandler()}>Get data</button>
    </div>
}
export default Test;