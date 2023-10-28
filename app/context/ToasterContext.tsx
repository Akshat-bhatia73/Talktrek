"use client";

import { Toaster } from "react-hot-toast";

const ToasterContext = () => {
  return (<Toaster toastOptions={{duration: 2000}} />);
};

export default ToasterContext