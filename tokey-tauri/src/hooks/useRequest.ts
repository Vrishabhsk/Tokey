/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useRequest = (options: any) => {
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const setAuthToken = () => {
    if (cookie.token) return `Bearer ${cookie.token}`;
    return null;
  };

  const request = (config: any) => {
    setLoading(true);
    axios({
      ...config,
      url: `${process.env.REACT_APP_SERVER_URL}${config.url}`,
      headers: {
        Authorization: setAuthToken(),
      },
    })
      .then((res) => {
        setResponse(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          removeCookie("token", { path: "/" });
          setLoading(false);
          toast.error("Your session has expired. Please login again.");
          return navigate("/");
        }
        setLoading(false);
        toast.error(err?.response?.data?.message || "Something went wrong");
      });
  };

  useEffect(() => {
    if (options) request(options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { response, loading, request };
};

export default useRequest;
