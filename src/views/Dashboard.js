import { useState, useEffect } from "react";
import useAxios from "../utils/useAxios";
import Wrapper from "./Wrapper";

function Dashboard() {
  const api = useAxios();
  const [res, setRes] = useState("");

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await api.post("/test/");
        setRes(response.data.response);
      } catch (error) {
        console.log(error);
        setRes("Something went wrong");
      }
    };
    fetchPostData();
  }, []);

  return (
    <Wrapper>
      <h1>This is the dashboard. Full-Stack Dev. ~ Python || PHP || JavaScript (React) && Software Engineer</h1>
    </Wrapper>
  );
}

export default Dashboard;
