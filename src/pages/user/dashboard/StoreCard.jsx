import { Rating, RoundedStar } from "@smastrom/react-rating";
const myStyles = {
  itemShapes: RoundedStar,
  activeFillColor: "#ffb700",
  inactiveFillColor: "#fbf1a9",
};
const StoreCard = ({
  name,
  store_name,
  email,
  address,
  overall_rating,
  setPopupInfo,
}) => {
  return (
    <div
      key={name}
      className="bg-white shadow-md border w-fit h-fit p-7 rounded-xl flex flex-col gap-3 max-w-[300px] max-h-[500px]"
    >
      <div className="image">
        <img
          className="rounded-xl"
          src={"/store3d.jpg"}
          alt="store image"
          height={200}
          width={300}
        />
      </div>
      <div>
        <p className="text-2xl font-bold line-clamp-1">{store_name}</p>
        <p className="text-sm text-gray-400 line-clamp-1">{name}</p>
      </div>
      <div>
        <p className=" text-lg">Address</p>
        <p className="text-gray-400 line-clamp-1">{address}</p>
      </div>
      <div>
        <p className=" text-lg">Rating</p>
        <Rating
          style={{ maxWidth: 150 }}
          value={overall_rating}
          itemStyles={myStyles}
          radius="small"
          readOnly
        />
      </div>
      <button
        onClick={() => {
          setPopupInfo({
            name,
            store_name,
            email,
            address,
            overall_rating,
            setPopupInfo,
          });
        }}
        className="p-3 text-center w-full bg-black text-white rounded-xl"
      >
        Rate this store
      </button>
    </div>
  );
};

export default StoreCard;
