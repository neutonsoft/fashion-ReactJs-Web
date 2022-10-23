import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import { createProduct, clearErrors } from "../../actions/productAction";
import ImageIcon from "@mui/icons-material/Image";
import { categories, occasions, sizes, colors } from "../../utils/constants";
import MetaData from "../Layouts/MetaData";
import BackdropLoader from "../Layouts/BackdropLoader";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const NewProduct = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { loading, success, error } = useSelector((state) => state.newProduct);

  const [highlights, setHighlights] = useState([]);
  const [highlightInput, setHighlightInput] = useState("");
  const [specs, setSpecs] = useState([]);
  const [specsInput, setSpecsInput] = useState({
    title: "",
    description: "",
  });

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [cuttedPrice, setCuttedPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [occasion, setOccasion] = useState("");
  const [stock, setStock] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [brand, setBrand] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const [logo, setLogo] = useState("");
  const [logoPreview, setLogoPreview] = useState("");
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);

  const handleSpecsChange = (e) => {
    setSpecsInput({ ...specsInput, [e.target.name]: e.target.value });
  };

  const addSpecs = () => {
    if (!specsInput.title.trim() || !specsInput.title.trim()) return;
    setSpecs([...specs, specsInput]);
    setSpecsInput({ title: "", description: "" });
  };

  const addHighlight = () => {
    if (!highlightInput.trim()) return;
    setHighlights([...highlights, highlightInput]);
    setHighlightInput("");
  };

  const deleteHighlight = (index) => {
    setHighlights(highlights.filter((h, i) => i !== index));
  };

  const deleteSpec = (index) => {
    setSpecs(specs.filter((s, i) => i !== index));
  };

  const handleLogoChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setLogoPreview(reader.result);
        setLogo(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const handleProductImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldImages) => [...oldImages, reader.result]);
          setImages((oldImages) => [...oldImages, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const newProductSubmitHandler = (e) => {
    e.preventDefault();

    // required field checks
    if (highlights.length <= 0) {
      enqueueSnackbar("Add Highlights", { variant: "warning" });
      return;
    }
    if (!logo) {
      enqueueSnackbar("Add Brand Logo", { variant: "warning" });
      return;
    }
    if (specs.length <= 1) {
      enqueueSnackbar("Add Minimum 2 Specifications", { variant: "warning" });
      return;
    }
    if (images.length <= 0) {
      enqueueSnackbar("Add Product Images", { variant: "warning" });
      return;
    }

    const formData = new FormData();

    formData.set("name", name);
    formData.set("description", description);
    formData.set("price", price);
    formData.set("cuttedPrice", cuttedPrice);
    formData.set("category", category);
    formData.set("occasion", occasion);
    formData.set("stock", stock);
    formData.set("brandname", brand);
    formData.set("logo", logo);
    formData.set("quantity", quantity);
    color.forEach((h) => {
      formData.append("color", h);
    });

    size.forEach((h) => {
      formData.append("size", h);
    });

    images.forEach((image) => {
      formData.append("images", image);
    });

    highlights.forEach((h) => {
      formData.append("highlights", h);
    });

    specs.forEach((s) => {
      formData.append("specifications", JSON.stringify(s));
    });

    dispatch(createProduct(formData));
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    if (success) {
      enqueueSnackbar("Product Created", { variant: "success" });
      dispatch({ type: NEW_PRODUCT_RESET });
      navigate("/admin/products");
    }
  }, [dispatch, error, success, navigate, enqueueSnackbar]);

  return (
    <>
      <MetaData title="Admin: New Product | Tito" />

      {loading && <BackdropLoader />}
      <form
        onSubmit={newProductSubmitHandler}
        encType="multipart/form-data"
        className="flex flex-col sm:flex-row bg-white rounded-lg shadow p-4"
        id="mainform"
      >
        <div className="flex flex-col gap-3 m-2 sm:w-1/2">
          <TextField
            label="Name"
            variant="outlined"
            size="small"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Description"
            multiline
            rows={3}
            required
            variant="outlined"
            size="small"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex justify-between">
            <TextField
              label="Price"
              type="number"
              variant="outlined"
              size="small"
              InputProps={{
                inputProps: {
                  min: 0,
                },
              }}
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <TextField
              label="Cutted Price"
              type="number"
              variant="outlined"
              size="small"
              InputProps={{
                inputProps: {
                  min: 0,
                },
              }}
              required
              value={cuttedPrice}
              onChange={(e) => setCuttedPrice(e.target.value)}
            />
          </div>
          <div className="flex justify-between gap-4">
            <TextField
              label="Category"
              select
              fullWidth
              variant="outlined"
              size="small"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((el, i) => (
                <MenuItem value={el} key={i}>
                  {el}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Occasion"
              select
              fullWidth
              variant="outlined"
              size="small"
              required
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
            >
              {occasions.map((el, i) => (
                <MenuItem value={el} key={i}>
                  {el}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="flex justify-between gap-4">
            <TextField
              label="Stock"
              type="number"
              variant="outlined"
              size="small"
              InputProps={{
                inputProps: {
                  min: 0,
                },
              }}
              required
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
            <TextField
              label="Quantity"
              type="number"
              variant="outlined"
              size="small"
              InputProps={{
                inputProps: {
                  min: 0,
                },
              }}
              required
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="flex justify-between gap-4">
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-name-label1">Color *</InputLabel>
              <Select
                labelId="demo-multiple-name-label1"
                id="demo-multiple-name1"
                multiple
                required
                value={color}
                onChange={(e) =>
                  setColor(
                    typeof e.target.value === "string"
                      ? e.target.value.split(",")
                      : e.target.value
                  )
                }
                input={<OutlinedInput label="Name" />}
              >
                {colors.map((el, i) => (
                  <MenuItem value={el} key={el}>
                    {el}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-name-label">Size *</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                required
                value={size}
                onChange={(e) =>
                  setSize(
                    typeof e.target.value === "string"
                      ? e.target.value.split(",")
                      : e.target.value
                  )
                }
                input={<OutlinedInput label="Name" />}
              >
                {sizes.map((el, i) => (
                  <MenuItem value={el} key={el}>
                    {el}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center border rounded">
              <input
                value={highlightInput}
                onChange={(e) => setHighlightInput(e.target.value)}
                type="text"
                placeholder="Highlight"
                className="px-2 flex-1 outline-none border-none"
              />
              <span
                onClick={() => addHighlight()}
                className="py-2 px-6 bg-primary-blue text-white rounded-r hover:shadow-lg cursor-pointer"
              >
                Add
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              {highlights.map((h, i) => (
                <div className="flex justify-between rounded items-center py-1 px-2 bg-green-50">
                  <p className="text-green-800 text-sm font-medium">{h}</p>
                  <span
                    onClick={() => deleteHighlight(i)}
                    className="text-red-600 hover:bg-red-100 p-1 rounded-full cursor-pointer"
                  >
                    <DeleteIcon />
                  </span>
                </div>
              ))}
            </div>
          </div>

          <h2 className="text-lg">Brand Details</h2>
          <div className="flex justify-between gap-4 items-start">
            <TextField
              label="Brand"
              type="text"
              variant="outlined"
              size="small"
              required
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
            <div className="w-24 h-10 flex items-center justify-center border rounded-lg">
              {!logoPreview ? (
                <ImageIcon />
              ) : (
                <img
                  draggable="false"
                  src={logoPreview}
                  alt="Brand Logo"
                  className="w-full h-full object-contain"
                />
              )}
            </div>
            <label className="rounded bg-gray-400 text-center cursor-pointer text-white py-2 px-2.5 shadow hover:shadow-lg">
              <input
                type="file"
                name="logo"
                accept="image/*"
                onChange={handleLogoChange}
                className="hidden"
              />
              Choose Logo
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-2 m-2 sm:w-1/2">
          <h2 className="text-lg">Specifications</h2>

          <div className="flex justify-evenly gap-2 items-center">
            <TextField
              value={specsInput.title}
              onChange={handleSpecsChange}
              name="title"
              label="Name"
              placeholder="Model No"
              variant="outlined"
              size="small"
            />
            <TextField
              value={specsInput.description}
              onChange={handleSpecsChange}
              name="description"
              label="Description"
              placeholder="WJDK42DF5"
              variant="outlined"
              size="small"
            />
            <span
              onClick={() => addSpecs()}
              className="py-2 px-6 bg-primary-blue text-white rounded hover:shadow-lg cursor-pointer"
            >
              Add
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            {specs.map((spec, i) => (
              <div className="flex justify-between items-center text-sm rounded bg-blue-50 py-1 px-2">
                <p className="text-gray-500 text-lg	">{spec.title}</p>
                <p>{spec.description}</p>
                <span
                  onClick={() => deleteSpec(i)}
                  className="text-red-600 hover:bg-red-200 bg-red-100 p-1 rounded-full cursor-pointer"
                >
                  <DeleteIcon />
                </span>
              </div>
            ))}
          </div>

          <h2 className="text-lg">Product Images</h2>
          <div className="flex gap-2 overflow-x-auto h-32 border rounded">
            {imagesPreview.map((image, i) => (
              <img
                draggable="false"
                src={image}
                alt="Product"
                key={i}
                className="w-full h-full object-contain"
              />
            ))}
          </div>
          <label className="rounded font-medium bg-gray-400 text-center cursor-pointer text-white p-2 shadow hover:shadow-lg my-2">
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleProductImageChange}
              className="hidden"
            />
            Choose Files
          </label>

          <div className="flex justify-end">
            <input
              form="mainform"
              type="submit"
              className="bg-primary-orange uppercase w-1/3 p-3 text-white font-medium rounded shadow hover:shadow-lg cursor-pointer"
              value="Submit"
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default NewProduct;
