import { useEffect, useRef, useState } from "react";

export function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

export function useTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

export const useForm = (initialState = {}, callback = () => {}) => {
  const [values, setValues] = useState(initialState);
  const initialValues = () => initialState;

  const handleChange = ({ target: { id, value } }) =>
    setValues({ ...values, [id]: value });

  const clearValues = () => setValues(initialValues);

  const handleSubmit = () => !clearValues() && callback();

  return { handleChange, handleSubmit, values };
};

function getOnlineStatus() {
  return typeof navigator !== "undefined" &&
    typeof navigator.onLine === "boolean"
    ? navigator.onLine
    : true;
}

export function useOnlineStatus() {
  const [onlineStatus, setOnlineStatus] = useState(getOnlineStatus());

  const goOnline = () => setOnlineStatus(true);

  const goOffline = () => setOnlineStatus(false);

  useEffect(() => {
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  return onlineStatus;
}

export function useImage() {
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const ipRef = useRef(null);
  useEffect(() => {
    if (!image) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setImage(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setImage(e.target.files[0]);
  };
  const clearImage = () => {
    ipRef.current.value = "";
    setImage(undefined);
    setPreview(undefined);
  };
  return { clearImage, ipRef, onSelectFile, image, preview };
}

export function useMount() {
  const isMounted = useRef(null);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  return isMounted.current;
}
// const initialState = {
//   status: "idle",
//   data: null,
//   error: null,
// };
// export function useAppState(initial) {
//   const [{ data, error, status }, setAppState] = useState(
//     ...initialState,
//     ...initial
//   );
// }
