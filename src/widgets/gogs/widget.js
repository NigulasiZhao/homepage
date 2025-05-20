import genericProxyHandler from "utils/proxy/handlers/generic"; 


const widget =  {
  api: "{url}/api/Gogs/{endpoint}?apikey=111" ,
  proxyHandler: genericProxyHandler ,

  mappings:  {
    info:  {
      endpoint: "latest" ,
    },
    calendar: {
      endpoint: "calendar",
      params: ["start", "end", "unmonitored"],
    },
  },
};

export default widget;