import { ButtonPrimary, ButtonSecondary } from "@/components/button/button";
import React from "react";
import { useState } from "react";

function Add() {
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState();
  function removeItemByIndex(arr, indexToRemove) {
    if (arr.length === 1 && indexToRemove === 0) {
      setItems([]); // Return an empty array if there is only one item in the array and it is being removed
    }

    var updatedArray = [];
    for (var i = 0; i < arr.length; i++) {
      if (i === indexToRemove) {
        continue; // Skip the item at indexToRemove
      }
      updatedArray.push(arr[i]);
      setItems(updatedArray);
    }
    return updatedArray;
  }
  const trendingItems = [
    "Chicken Biryani",
    "Bhurji Pav",
    "Misal Pav",
    "Pav Bhaji",
    "Burger King",
  ];

  const [searchItems, setSearchItems] = useState(trendingItems);

  function filterItems(searchTerm) {
    return items.filter(function (item) {
      return item === searchTerm;
    });
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 p-5 text-center ">
      <div className="text-3xl font-semibold capitalize">My Favourite</div>
      <div className="flex items-center justify-center w-full gap-4">
        <select className="max-w-xs select select-bordered w-max">
          <option selected>Lunch</option>
          <option>Dinner</option>
        </select>
        <p>for</p>
        <select className="max-w-xs select select-bordered w-max">
          <option selected>Weekend</option>
          <option>Weekdays</option>
        </select>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Type here"
            value={currentItem}
            onChange={(e) => {
              setCurrentItem(e.target.value);
              setSearchItems(
                trendingItems.filter((word) =>
                  word.toLowerCase().includes(e.target.value.toLowerCase())
                )
              );
            }}
            className="w-full max-w-xs input input-bordered"
          />
          {searchItems?.length > 0 && currentItem?.length > 0 && (
            <div className="flex flex-col p-2 mt-2 rounded-md bg-base-300">
              {searchItems?.map((item, index) => {
                return (
                  <div
                    onClick={() => {
                      setCurrentItem(item);
                      setSearchItems([]);
                    }}
                    className="flex items-center p-2 text-left rounded-md cursor-pointer hover:bg-secondary hover:text-white"
                    key={index}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div
          className="btn btn-secondary"
          onClick={() =>
            currentItem?.length > 0
              ? setItems([...items, currentItem]) && setCurrentItem("")
              : null
          }
        >
          Add
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="flex ">
          <div className="tabs ">
            <a className="tab tab-lifted ">Lunch</a>
            <a className="tab bg-base-300 tab-lifted ">Dinner</a>
          </div>
        </div>
        <div className="flex items-center justify-center ">
          {" "}
          <div className="transform -rotate-90 translate-x-[58px] tabs ">
            <a className="tab tab-lifted">Lunch</a>
            <a className="tab tab-lifted bg-base-300">Dinner</a>
          </div>
          <div className="flex w-3/5 gap-4">
            {items?.length > 0 ? (
              <div className="flex flex-wrap w-full p-5 overflow-scroll bg-base-300 ">
                {items?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {}}
                      className="relative px-4 py-2 m-1 border rounded-full cursor-pointer group border-secondary w-max h-max hover:bg-secondary hover:text-white"
                    >
                      <div
                        onClick={() => removeItemByIndex(items, index)}
                        className="absolute items-center justify-center hidden w-6 h-6 text-white bg-black border rounded-full border-white/30 -top-2 -right-2 group-hover:flex"
                      >
                        x
                      </div>
                      {item}
                    </div>
                  );
                })}
              </div>
            ) : (
              "Start Adding Items"
            )}
          </div>
        </div>
      </div>
      <div className="absolute btn btn-primary right-10 bottom-10 ">Next</div>
    </div>
  );
}

export default Add;
