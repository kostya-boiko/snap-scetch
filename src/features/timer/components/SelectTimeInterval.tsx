import CustomInput from "@/components/ui/CustomInput";
import SimpleSelect from "@/components/ui/Select/SimpleSelect";
import SimpleRadioInput from "@/components/ui/SimpleRadioInput/SimpleRadioInput";
import { useEffect, useState } from "react";
import { useTimerStore } from "../store/timerStore";

const timeIntervals = [
  { id: 0, text: "30 seconds", value: 1000 * 30 }, // 30 seconds
  { id: 1, text: "60 seconds", value: 1000 * 60 }, // 1 minute
  { id: 2, text: "2 minutes", value: 1000 * 60 * 2 }, // 2 minutes
  { id: 3, text: "5 minutes", value: 1000 * 60 * 5 }, // 5 minutes
  { id: 4, text: "10 minutes", value: 1000 * 60 * 10 }, // 10 minutes
  { id: 5, text: "Custom", value: 1000 * 60 * 15 }, // 15 minutes
];

const types: ["minutes", "seconds"] = ["minutes", "seconds"];
let typeExternal = 0;

const SelectTimeInterval = () => {
  const setTimeInterval = useTimerStore((state) => state.setTimeInterval);
  const timerInterval = useTimerStore((state) => state.timerInterval);

  const [selectInterval, setSelectInterval] = useState(() => {
    const startInterval = timeIntervals.find((interval) =>
      interval.value === timerInterval ? true : false
    );
    if (startInterval) {
      return startInterval.id;
    } else {
      return 5;
    }
  });
  const [type, setType] = useState(typeExternal);
  const [time, setTime] = useState(
    selectInterval != 5 ? timeIntervals[5].value / 1000 / 60 : typeExternal === 0 ? timerInterval / 1000 / 60 : timerInterval / 1000
  );
  const [invalidTime, setInvalidTime] = useState(false);

  useEffect(() => {
    if (selectInterval !== 5) {
      setTimeInterval(timeIntervals[selectInterval].value);
      return;
    }
    if (isNaN(time) || (type === 1 && time < 5) || time < 1) {
      setInvalidTime(true);
      return;
    } else {
      setInvalidTime(false);
    }
    if (type === 0) {
      setTimeInterval(time * 1000 * 60);
    } else {
      setTimeInterval(time * 1000);
    }

    return () => {
      typeExternal = type;
    };
  }, [selectInterval, time, type]);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-wrap gap-4">
        {timeIntervals.map((item, index) => (
          <SimpleRadioInput
            key={index}
            text={item.text}
            name={"time"}
            checked={selectInterval === index}
            onChange={() => {
              setSelectInterval(index);
            }}
          />
        ))}
      </div>
      {selectInterval === 5 && (
        <>
          <div className="flex flex-col-reverse sm:flex-row gap-3 items-center mt-4">
            <CustomInput
              autoFocus
              type="number"
              value={time}
              onChange={(e) => {
                setTime(parseInt(e.target.value));
              }}
              className="w-full sm:w-auto"
            />
            <SimpleSelect
              data={types}
              activeElementIndex={type}
              onChoose={setType}
            />
          </div>
          {invalidTime && (
            <p className="text-red-500 text-sm mt-1">
              Please enter a valid time. Time must be at least 5 seconds.
            </p>
          )}
        </>
      )}
    </form>
  );
};

export default SelectTimeInterval;
