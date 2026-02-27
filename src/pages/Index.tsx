import { useEffect } from "react";
import SplitLanding from "@/components/SplitLanding";

const Index = () => {
  useEffect(() => {
    document.title = "Владимир Башмаков / Artbox";
  }, []);

  return <SplitLanding />;
};

export default Index;
