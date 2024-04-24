import { useEffect, useState } from "react";
import { storage } from "../fireBase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { v4 as uuid } from "uuid";
import { useAddproductMutation } from "../service/productsApi";
import data from "../products.json";

function InputProducts() {
  const [product, setProduct] = useState({});
  const [index, setIndex] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const imgName = uuid();
  const [addProduct] = useAddproductMutation();

  const upload = (object) => {
    delete object.id;
    const storageRef = ref(storage, imgName + ".png");

    fetch(object.img)
      .then((response) => response.blob())
      .then((blob) => {
        const uploadTask = uploadBytesResumable(storageRef, blob);

        return new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");

              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
                default:
                  break;
              }
            },
            (error) => {
              reject(error);
            },
            () => {
              resolve(uploadTask.snapshot.ref);
            }
          );
        });
      })
      .then((ref) => {
        return getDownloadURL(ref);
      })
      .then((downloadURL) => {
        const updatedProduct = { ...object, img: downloadURL };
        setProduct(updatedProduct);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (isClicked && index < data.length) {
      const currentProduct = data[index];
      if (currentProduct.img) {
        upload(data[index]);
      } else {
        console.log(index, "bị lỗi link img");
        setIndex((prev) => prev + 1);
      }
    }
  }, [isClicked, index, data]);

  useEffect(() => {
    if (Object.keys(product).length !== 0) {
      new Promise((resolve, reject) => {
        addProduct(product)
          .then(() => {
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      })
        .then(() => {
          console.log(product);
          setTimeout(() => {
            setIndex((prevIndex) => prevIndex + 1);
          }, 5000);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [product]);

  const handleConvert = (e) => {
    e.preventDefault();
    setIsClicked(true);
  };

  const handleStop = (e) => {
    e.preventDefault();
    setIsClicked(false);
  };

  return (
    <div>
      <button type="submit" onClick={handleConvert} className="btn btn-primary">
        Submit Products
      </button>
      <button
        type="submit"
        onClick={handleStop}
        className="btn btn-primary mx-4"
      >
        Stop submit Products
      </button>
    </div>
  );
}

export default InputProducts;
