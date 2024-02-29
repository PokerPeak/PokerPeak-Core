import React,{ useState, useEffect } from "react";
import Field from "./Field";

import { 
    topTypeOptions, 
    accessoriesTypeOptions, 
    facialHairTypeOptions, 
    clotheTypeOptions, 
    eyeTypeOptions, 
    eyebrowTypeOptions, 
    mouthTypeOptions, 
    skinColorOptions, 
    hairColorTypes, 
    }    from "../utils/index";

export default function Avatar({ avatar, setAvatar}){
    const defaultURL = "https://avataaars.io/";
    const [ editor,setEditor ] = useState(false);
    const [ local, setLocal ] = useState(avatar);

    const [ top, setTop ] = useState(""); 
    const [ accessories, setAccessories ] = useState(""); 
    const [ hair, setHair ] = useState("");
    const [ facialHair, setFacialHair ] = useState("");
    const [ clothes, setClothes ] = useState("");   
    const [ eyes, setEyes ] = useState(""); 
    const [ eyebrow, setEyebrow ] = useState(""); 
    const [ mouth, setMouth ] = useState(""); 
    const [ skin, setSkin ] = useState(""); 

    useEffect(()=>{
        setLocal(`https://avataaars.io/?accessoriesType=${accessories}&clotheType=${clothes}&eyeType=${eyes}&eyebrowType=${eyebrow}&hairColor=${hair}&facialHairType=${facialHair}&mouthType=${mouth}&skinColor=${skin}&topType=${top}`);
    },[ top, accessories, hair, facialHair, clothes, eyes, eyebrow, mouth, skin ]);
    const reset = () => {
        setLocal(defaultURL);
        setTop("");
        setAccessories("");
        setHair("");
        setFacialHair("");
        setClothes("");
        setEyes("");
        setEyebrow("");
        setMouth("");
        setSkin("");
    }

    return (
        <>
            { editor?
            <>
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 pt-3 rounded-md">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold">Avatar Editor</h2>
                            <div className="flex gap-1">
                                <p className="cursor-pointer" onClick={()=>{reset()}}>⭕</p>
                                <p className="cursor-pointer" onClick={()=>{setAvatar(local);setEditor((val)=>!val)}}>✔️</p>
                                <p className="cursor-pointer" onClick={()=>{setEditor((val)=>!val)}}>❌</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="">
                                <img src={local} className="grayscale" alt="" />
                            </div>
                            <div className="h-[50%] w-[50%] pl-[20px]">
                                <Field text={"Tops"} setFunction={setTop} values={top} dataSet={topTypeOptions} />
                                <Field text={"Accessories"} setFunction={setAccessories} values={accessories} dataSet={accessoriesTypeOptions} />
                                <Field text={"Hair"} setFunction={setHair} values={hair} dataSet={hairColorTypes} />
                                <Field text={"Facial Hair"} setFunction={setFacialHair} values={facialHair} dataSet={facialHairTypeOptions} />
                                <Field text={"Clothes"} setFunction={setClothes} values={clothes} dataSet={clotheTypeOptions} />
                                <Field text={"Eyes"} setFunction={setEyes} values={eyes} dataSet={eyeTypeOptions} />
                                <Field text={"Eyebrow"} setFunction={setEyebrow} values={eyebrow} dataSet={eyebrowTypeOptions} />
                                <Field text={"Mouth"} setFunction={setMouth} values={mouth} dataSet={mouthTypeOptions} />
                                <Field text={"Skin Tone"} setFunction={setSkin} values={skin} dataSet={skinColorOptions} />
                            </div>
                        </div>
                    </div>
                </div>
            </>:<>
                <div className=" ">
                    <img src={avatar} className="grayscale" alt="" />
                    <div className="bg-[#000] w-full rounded-[20px] h-[3px]"></div>
                    <div className="flex justify-end">
                        <button className="hover:border-primary hover:text-white text-gray-400  border-b m-1 px-3 py-1 rounde-[20px] font-bold items-center justify-center" onClick={()=>{setEditor((val)=>!val)}}>Edit.</button>
                    </div>
                    
                </div>
            </>
            }
        </>





    )
}