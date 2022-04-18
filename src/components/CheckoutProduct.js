import React from "react";
import Image from "next/image";
import {
  StarIcon,
  TrashIcon,
  MinusCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/solid";
import CurrencyFormat from "react-currency-format";
import { useDispatch } from "react-redux";
import {
  increaseProduct,
  decrementProduct,
  removeFromBasket,
} from "../slices/basketSlice";

function CheckoutProduct({
  id,
  title,
  price,
  rating,
  description,
  category,
  image,
  hasPrime,
  quantity,
}) {
  const dispatch = useDispatch();
  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      rating,
      description,
      category,
      image,
      hasPrime,
    };
    //push item into basket
    dispatch(increaseProduct(product));
  };

  const removeItemFromBasketOne = () => {
    const product = {
      id,
      title,
      price,
      rating,
      description,
      category,
      image,
      hasPrime,
    };
    dispatch(decrementProduct(product));
  };
  const deleteItemFromBasketOne = () => {
    const product = {
      id,
      title,
      price,
      rating,
      description,
      category,
      image,
      hasPrime,
    };
    dispatch(removeFromBasket(product));
  };
  return (
    <div className="grid grid-cols-5">
      <Image src={image} height={200} width={200} objectFit="contain" />
      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex ">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className="text-xs my-2 line-clamp-3">{description}</p>
        <CurrencyFormat value={price} prefix={"€"} />
        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              loading="lazy"
              className="w-12"
              src="https://links.papareact.com/fdw"
              alt=""
            />
            <p className="text-xs text-gray-500">FREE NEXT DAY Delivery</p>
          </div>
        )}
      </div>
      {/**add remove functionality */}
<<<<<<< Updated upstream
      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <div>
          <h2>Item count: </h2>
        </div>
        <button className="button" onClick={addItemToBasket}>
          Add to Basket
        </button>
        <button className="button" onClick={removeItemFromBasket}>
          Remove from Basket
        </button>
=======
      <div className="flex items-center ml-6 justify-self-end">
        <div className="flex pl-4 justify-between">
          <button
            className="button_checkout rounded-full"
            onClick={addItemToBasket}
          >
            <PlusCircleIcon />
          </button>
          <div className="quantity border border-yellow-400 rounded-full text-center ml-4">
            <h2>{quantity}</h2>
          </div>
          <button
            className="button_checkout rounded-full ml-4"
            onClick={removeItemFromBasketOne}
          >
            <MinusCircleIcon />
          </button>
        </div>
        <div
          className="flex ml-4 justify-between"
          onClick={deleteItemFromBasketOne}
        >
          <TrashIcon className="button_delete rounded-full" />
        </div>
>>>>>>> Stashed changes
      </div>
    </div>
  );
}

export default CheckoutProduct;
