import React, { useState } from 'react'

const TechnicalFiltersForm = () => {


    const [count,setCount]=useState(0)

    const [formData, setFormData] = useState({
        "Trend": { indicator: "", period: "", priceField: "", quantity: 0 },
        "Momentum": { indicator: "", period: "", priceField: "", quantity: 0 },
        "Volatility": { indicator: "", period: "", priceField: "", quantity: 0 },
        "Volume": { indicator: "", period: "", priceField: "", quantity: 0 },
        "Breadth": { indicator: "", period: "", priceField: "", quantity: 0 }
      });


      const handleChange = (filterName, inputName, value) => {
        if(inputName=="quantity" && value<0){
            return
        }
        setFormData((prevFormData) => ({
          ...prevFormData,
          [filterName]: {
            ...prevFormData[filterName],
            [inputName]: value
          }
        }));
      };
    const inputDataTypes = {
        "Technical Filters": [
          {
            name: "Trend",
            icon: "./icons/trending up.png",
            inputs: [
              { name: "indicator", type: "select", options: ["Simple MA", "some MA"] },
              { name: "period", type: "select", options: ["Yearly","Quaterly","Monthly","Weekly","Daily"] },
              { name: "priceField", type: "select", options: ["Price A", "Price B"] },
              { name: "quantity", type: "number" }
            ]
          },
          {
            name: "Momentum",
            icon: "./icons/momentum.svg",
            inputs: [
              { name: "indicator", type: "select", options: ["Simple MA", "some MA"] },
              { name: "period", type: "select", options: ["Yearly","Quaterly","Monthly","Weekly","Daily"] },
              { name: "priceField", type: "select", options: ["Price A", "Price B"] },
              { name: "quantity", type: "number" }
            ]
          },
          {
            name: "Volatility",
            icon: "./icons/volatility.svg",
            inputs: [
              { name: "indicator", type: "select", options: ["Simple MA", "some MA"] },
              { name: "period", type: "select", options: ["Yearly","Quaterly","Monthly","Weekly","Daily"] },
              { name: "priceField", type: "select", options: ["Price A", "Price B"] },
              { name: "quantity", type: "number" }
            ]
          },
          {
            name: "Volume",
            icon: "./icons/volume.svg",
            inputs: [
              { name: "indicator", type: "select", options: ["Simple MA", "some MA"] },
              { name: "period", type: "select", options: ["Yearly","Quaterly","Monthly","Weekly","Daily"] },
              { name: "priceField", type: "select", options: ["Price A", "Price B"] },
              { name: "quantity", type: "number" }
            ]
          },
          {
            name: "Breadth",
            icon: "./icons/breath.svg",
            inputs: [
              { name: "indicator", type: "select", options: ["Simple MA", "some MA"] },
              { name: "period", type: "select", options: ["Yearly","Quaterly","Monthly","Weekly","Daily"] },
              { name: "priceField", type: "select", options: ["Price A", "Price B"] },
              { name: "quantity", type: "number" }
            ]
          }
        ]
      };

  return (
    <div className=' text-white'>
        
        {inputDataTypes["Technical Filters"].map((item, index) => (
                <div className="px-4 p-2 ">
                  <h2 className="flex border-b-[1px] h-[40px] items-center text-[20px] px-4">
                    <img
                      className="h-[25px] relative top-[0px] mx-2"
                      src={item.icon}
                    />
                    {item["name"]}
                  </h2>
                  <p className="text-center pt-1 pb-4 text-[12px]">
                    Some info about trends and what is trends
                  </p>
                  <form className="inputs px-2">
                    <div className="flex justify-between items-center">
                      <label>Indicator</label>
                      <select
                        id="states"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg border-s-gray-100 dark:border-s-gray-700 border-s-2 focus:ring-[#111F29] focus:border-[#111F29] block  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#111F29] dark:focus:border-[#111F29]"
                      >
                        {item.inputs[0].options.map((option)=><option value="SA">{option}</option>)}
                      </select>
                    </div>
                    <div className="flex justify-between items-center ">
                      <label>Period</label>
                      <select
                        id="states"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg border-s-gray-100 dark:border-s-gray-700 border-s-2 focus:ring-[#111F29] focus:border-[#111F29] block  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#111F29] dark:focus:border-[#111F29]"
                      >
                        {item.inputs[1].options.map((option)=><option value="SA">{option}</option>)}
                      </select>
                      <div class="relative flex items-center max-w-[8rem] mt-2">
                        <button
                        // onClick={()=>count>0?setCount(count-1):""}
                        onClick={()=>handleChange(item.name,"quantity",formData[item.name].quantity-1)}
                          type="button"
                          id="decrement-button"
                          data-input-counter-decrement="quantity-input"
                          class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                        >
                          <svg
                            class="w-3 h-3 text-gray-900 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <input
                          type="text"
                          id="quantity-input"
                          data-input-counter
                          aria-describedby="helper-text-explanation"
                          class="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="999"
                          // value={item["name"]=="Trend"?{count}:""}
                        //   value={item.name === "Trend" ? count : ""}
                          value={formData[item.name].quantity}

                          required
                        />
                        <button
                          type="button"
                          id="increment-button"
                          onClick={()=>handleChange(item.name,"quantity",formData[item.name].quantity+1)}

                          data-input-counter-increment="quantity-input"
                          class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                        >
                          <svg
                            class="w-3 h-3 text-gray-900 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <label>Price Field</label>
                      <select
                        id="states"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg border-s-gray-100 dark:border-s-gray-700 border-s-2 focus:ring-[#111F29] focus:border-[#111F29] block  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#111F29] dark:focus:border-[#111F29]"
                      >
                        {item.inputs[2].options.map((option)=><option value="SA">{option}</option>)}
                      </select>
                    </div>
                  </form>
                </div>
              ))}
    </div>
  )
}

export default TechnicalFiltersForm