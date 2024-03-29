/*vARIABLES */
export const ROUTES = {
  HOME: "/",
  SIGN_IN: "signin",
  SIGN_UP: "signup",
  PROFILE: "profile",
  CREATE: "create",
  FOLLOWING: "myfollowingpost",
  RESET: "reset",
  TOKEN: "reset/:token"
};
export const prefix = "https://cors-anywhere.herokuapp.com/";
export const apiEndPoint = "https://replit.com/@ad99526/quick-share-api/api/v1";
//
// "http://localhost:5000";
export const hookupcloudUrl =
  "https://api.cloudinary.com/v1_1/hookupcloudddddddddddd/image/upload";
export const defaultSrc =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs7kc4LWYMTgCvPRNPCDK99Vf0O1vggwWsgA&usqp=CAU";
export const initialState = {
  status: "idle",
  data: null,
  error: null
};

// "https://quick-share-api.herokuapp.com";

/*FUNCTIONS */

export const validateData = values => {
  let valid = true;
  for (let value in values) {
    if (!values[value]) {
      valid = false;
    }
  }
  return valid;
};

export const capitalize = s => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const ipClass = (className = "", value) =>
  `${className} ${value ? "lb-padding" : ""}`;

export const twoDArray = (array, length) => {
  const newArr = [];
  for (let i = 0; i < Math.ceil(array.length / length); i++) {
    const newEl = [];
    for (let j = 0; j < length && array[i * length + j]; j++) {
      newEl.push(array[i * length + j]);
    }
    newArr.push(newEl);
  }
  return newArr;
};
