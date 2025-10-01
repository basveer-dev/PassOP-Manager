import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passref = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  const getPassword = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    console.log(passwords);
    setpasswordArray(passwords);
  };

  useEffect(() => {
    getPassword();
  }, []);

  const copyText = (text) => {
    return () => {
      toast("Copied to clipboard!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigator.clipboard.writeText(text);
    };
  };

  const showPassword = () => {
    passref.current.type = "text";
    if (ref.current.src.includes("src/assets/ceye.svg")) {
      ref.current.src = "src/assets/eye.svg";
      passref.current.type = "password";
    } else {
      ref.current.src = "src/assets/ceye.svg";
      passref.current.type = "text";
    }
  };

  const savePassword = async () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...form, id: uuidv4() }),
      });
      setform({ site: "", username: "", password: "" });
    }
  };

  const deletePassword = async (id) => {
    let c = confirm("Are you sure you want to delete this password?");
    if (c) {
      setpasswordArray(passwordArray.filter((item) => item.id !== id));
      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
    }
  };

  const editPassword = async (id) => {
    console.log("edit", id);
    // if any such id exists in the db , delete it

    await fetch("http://localhost:3000/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: form.id }),
    });
    setform({ ...passwordArray.filter((item) => item.id === id)[0], id: id });
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />

      <div className="div px-2 lg:px-40">
        <div className="lg:px-40 px-2 py-16 mx-auto min-h-[85vh]">
          <h1 className="text-4xl font-bold text-center ">
            <span className="text-black">&lt;</span>
            <span className="text-white">Pass</span>
            <span className="text-black">OP/&gt;</span>
          </h1>
          <p className="text-black text-lg text-center">
            Your own Password Manager
          </p>
          <div className=" text-black flex flex-col p-4 gap-8 items-center">
            <input
              value={form.site}
              onChange={handleChange}
              placeholder="Enter Website URL"
              className=" rounded-full border border-[rgb(3,3,3)]  bg-black/30 backdrop-blur-sm text-white w-full px-4 py-1 outline-none"
              type="text"
              name="site"
              id="site"
            />
            <div className="flex md:flex-row flex-col w-full gap-8 justify-between">
              <input
                value={form.username}
                onChange={handleChange}
                placeholder="Enter Username"
                className=" rounded-full border border-[rgb(3,3,3)] w-full px-4 py-1 bg-black/30 backdrop-blur-sm text-white outline-none"
                type="text"
                name="username"
                id="username"
              />
              <div className="relative">
                <input
                  ref={passref}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  className=" rounded-full border border-[rgb(3,3,3)] w-full pl-4 pr-7 py-1 bg-black/30 backdrop-blur-sm text-white outline-none"
                  type="password"
                  name="password"
                  id="password"
                />
                <span
                  className="absolute top-[9px] right-2 cursor-pointer"
                  onClick={showPassword}
                >
                  <img
                    ref={ref}
                    className="w-4 invert"
                    src="src/assets/eye.svg"
                    alt="eye"
                  />
                </span>
              </div>
            </div>

            <button
              onClick={savePassword}
              className="flex justify-center items-center backdrop-blur-[5000px] rounded-full w-fit hover:bg-black/10 backdrop-blur-sm px-7 py-2 cursor-pointer gap-2 shadow-black shadow-md"
            >
              <lord-icon
                src="https://cdn.lordicon.com/jgnvfzqg.json"
                trigger="hover"
              ></lord-icon>
              Save Password
            </button>
          </div>
          <div className="passwords">
            <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
            {passwordArray.length === 0 && <div>No Passwords to Show</div>}
            {passwordArray.length != 0 && (
              <table className="table-auto w-full rounded-md overflow-hidden shadow-black shadow-sm mb-2">
                <thead className="bg-black/30 backdrop-blur-sm text-white">
                  <tr>
                    <th className="py-2">Site</th>
                    <th className="py-2">Username</th>
                    <th className="py-2">Password</th>
                    <th className="py-2">Action</th>
                  </tr>
                </thead>
                <tbody className=" backdrop-blur-[5000px] ">
                  {passwordArray.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td className="text-center py-2 border-white">
                          <div className="flex justify-center items-center">
                            <a href={item.site} target="_blank">
                              {item.site}
                            </a>

                            <div
                              className="loadiconcopy flex cursor-pointer justify-center items-center ml-2"
                              onClick={copyText(item.site)}
                            >
                              <lord-icon
                                style={{ width: "25px", height: "25px" }}
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="text-center py-2 border-white">
                          <div className="flex justify-center items-center">
                            {item.username}

                            <div
                              className="loadiconcopy flex cursor-pointer justify-center items-center ml-2"
                              onClick={copyText(item.username)}
                            >
                              <lord-icon
                                style={{ width: "25px", height: "25px" }}
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="text-center py-2 border-white">
                          <div className="flex justify-center items-center">
                            {item.password}

                            <div
                              className="loadiconcopy flex cursor-pointer justify-center items-center ml-2"
                              onClick={copyText(item.password)}
                            >
                              <lord-icon
                                style={{ width: "25px", height: "25px" }}
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="text-center py-2 border-white">
                          <div className="flex justify-center items-center">
                            <span
                              className="cursor-pointer m-1"
                              onClick={() => editPassword(item.id)}
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                trigger="hover"
                                style={{ width: "25px", height: "25px" }}
                              ></lord-icon>
                            </span>
                            <span
                              className="cursor-pointer m-1"
                              onClick={() => deletePassword(item.id)}
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/skkahier.json"
                                trigger="hover"
                                style={{ width: "25px", height: "25px" }}
                              ></lord-icon>
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Manager;
