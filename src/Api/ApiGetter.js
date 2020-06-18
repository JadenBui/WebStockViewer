import { useState, useEffect } from "react";
import axios from "axios";

const DELAY_TIME = 700;
const ApiGetter = (tag) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://stocknodeserver.azurewebsites.net/stocks/${tag}`)
      .then((res) => res.data)
      .then((res) => {
        //Delay the process of returning data for loading stimulation
        setTimeout(() => {
          setLoading(false);
        }, DELAY_TIME);
        return res;
      })
      .then((res) => setData(res))
      .catch((e) => {
        setLoading(false);
        setError(e);
      });
  }, [tag]);
  return [data, loading, error];
};

export default ApiGetter;
