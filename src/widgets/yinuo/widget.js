import genericProxyHandler from "utils/proxy/handlers/generic"; 


const widget =  {
  api: "{url}/{endpoint}" ,
  proxyHandler: genericProxyHandler ,

  mappings:  {
    info:  {
      endpoint: "api/AttendanceRecord/latest" ,
    },
  },
};

export default widget;