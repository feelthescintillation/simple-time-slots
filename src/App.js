import "./App.css";

function App() {
  const urlSP = new URLSearchParams(window.location.search);
  const paramValue = urlSP.get("qqq");

  const parseParamStr = (str) => {
    const res = JSON.parse(decodeURIComponent(escape(atob(str))));

    return res;
  };
  let displayObj;
  try {
    displayObj = parseParamStr(paramValue);
  } catch (e) {
    console.error(e);
  }

  return (
    <div className=" pb-1 container  mx-auto w-full h-full font-mono">
      <div className="w-full container mx-auto p-6">
        <div className="w-full flex items-center justify-between">
          <div className="flex w-1/2 justify-start content-center ">
            Simple Time slot
          </div>
        </div>
      </div>
      <div className="w-full container mx-auto p-6 bg-gray-200">
        <h1 className="text-7xl w-1/2 xl:w-full xl:text-7xl font-black f-f-l">
          {displayObj?.name}
        </h1>
        <div className="text-2xl xl:w-full xl:text-2xl mt-2">
          is available on
        </div>
      </div>
      <>
        {displayObj?.dates
          .map((date) => {
            const dateO = new Date(date.split("T"));
            const tzOffset = dateO.getTimezoneOffset();
            console.log(date);

            dateO.setTime(
              dateO.getTime() + (displayObj.urlOffset - 0 - tzOffset) * 60_000
            );
            return dateO;
          })
          .map((date) => (
            <>
              <div className="w-full container mx-auto p-6 bg-red-200">
                <div className="text-5xl w-1/2 xl:w-full xl:text-5xl font-black f-f-l">
                  {date.toLocaleDateString()}
                </div>
                <div className="text-3xl  xl:w-full xl:text-3xl font-light f-f-l">
                  {date.toLocaleTimeString()}
                </div>
              </div>
              <div className="w-full container mx-auto p-1 bg-green-200">
                <div className="text-4xl w-1/2 xl:w-full xl:text-4xl font-black f-f-l"></div>
              </div>
            </>
          ))}
        <div className="w-full container mx-auto p-6 bg-grey-200">
          <div className="text-4xl w-1/2 xl:w-full xl:text-4xl font-black f-f-l">
            <p className="text-xs mt-2 text-gray-500">*your local timezone</p>
          </div>
        </div>
      </>
    </div>
  );
}

export default App;
