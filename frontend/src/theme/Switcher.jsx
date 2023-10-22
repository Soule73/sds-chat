import { useState } from "react";
import useDarkSide from "./useDarkSide";
import { Switch, Typography } from "@material-tailwind/react";

export default function Switcher() {
  const [colorTheme, setTheme] = useDarkSide();

  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );


  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <div className=" py-1 flex justify-between w-full">
      <Typography className=" text-slate-900 dark:text-slate-300">
        Théme
      </Typography>
      <div className=" flex gap-3">
        <Typography className=" text-slate-900 dark:text-slate-300">Clair</Typography>
        <Switch
          onChange={(e) => toggleDarkMode(e.target.checked)}
          id="custom-switch-component"
          ripple={false}
          checked={darkSide}
          className="h-full w-full checked:bg-orange-600"
          containerProps={{
            className: "w-11 h-6",
          }}
          circleProps={{
            className: "before:hidden left-0.5 border-none",
          }}
        />
        <Typography className=" text-slate-900 dark:text-slate-300">Sombre</Typography>
      </div>
    </div>
  );
}
